import React, { useEffect, useState } from 'react'
import { MdDeleteOutline } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getLocalStorage, setLocalStorage } from './utils/storage';



export default function App() {
  const [openForm, setOpenForm] = useState(false)
  const [data, setData] = useState(() => getLocalStorage("data", []))

  useEffect(()=>{
    setLocalStorage("data", data)
  }, [data]);

  function handleAddTransaction(newItem){
    setData(prevData=>[...prevData, newItem]);  
  }

  function handleDelete(id){
    const confirmDelete = window.confirm("Are you sure you want to delete this transaction?");
    if (!confirmDelete) return;

    const deletedItem = data.find(item=>item.id === id); // Save the deleted item

    setData(data=>data.filter(item=>item.id !== id))

    toast(
      ({ closeToast }) => (
        <div className="flex text-start items-center justify-between gap-4">
          <span>Transaction deleted!</span>
          <button
            onClick={() => {
              setData((prev) => [...prev, deletedItem]);
              toast.success("Transaction restored!");
              closeToast();
            }}
            className="text-sm font-semibold text-white bg-green-600 px-2 py-1 rounded hover:bg-green-700"
          >
            Undo
          </button>
        </div>
      ),
      {
        type: "error",
        autoClose: 5000,
      }
    );
  }

  function formatCurrency(amount){
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  }

  return (
    <>
      <ToastContainer position="top-center" autoClose={3000} />
      <div className="w-3/4 md:w-2/6 flex flex-col mx-auto my-10">
        <Logo />
        <Balance data={data} formatCurrency={formatCurrency} />
        <History data={data} onDelete={handleDelete} />

        {openForm && (
          <Transaction
            onAddTransaction={handleAddTransaction}
            setOpenForm={setOpenForm}
          />
        )}
        <button
          onClick={() => setOpenForm((open) => !open)}
          className="w-40 my-4 px-3 py-1 rounded bg-green-500 hover:bg-green-600 text-white font-semibold"
        >
          {openForm ? "Close" : "Add Transaction"}
        </button>
      </div>
    </>
  );
}


function Logo(){
  return (
    <div>
      <h1 className='text-xl font-semibold text-center mb-8'>Expense Tracker</h1>
    </div>
  )
}

function Balance({data, formatCurrency}){
  const income = data.filter(item=>item.amount > 0).reduce((acc, cur) => acc + cur.amount, 0);
  const expense = data.filter(item=>item.amount < 0).reduce((acc, cur)=>acc + Math.abs(cur.amount), 0)
  const balance = income - expense

  return (
    <div className="mb-8">
      <h3 className="font-medium uppercase">Your Balance</h3>
      <p className="font-bold text-3xl mb-6">{formatCurrency(balance)}</p>
      <div className="bg-white md:px-5 lg:px-10 py-10 uppercase shadow-lg text-center flex flex-col gap-5 md:flex-row items-center justify-between">
        <span>
          <h4>Income</h4>
          <p className="text-green-600 font-medium text-lg">{formatCurrency(income)}</p>
        </span>
        <span className="">
          <h4>Expense</h4>
          <p className="text-red-600 font-medium text-lg">{formatCurrency(expense)}</p>
        </span>
      </div>
    </div>
  );
}

function History({data, onDelete}){
  const [select, setSelect] = useState("all");

  let filteredData;
  if (select === "all") filteredData = data;
  if (select === "income") filteredData = data.filter(item=>item.amount > 0);
  if (select === "expense") filteredData = data.filter(item=>item.amount < 0);
  
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between  pb-2 border-b-2 border-b-gray-400">
        <h3 className="font-medium uppercase">History</h3>
        {data.length !== 0 && (
          <div className="">
            <label htmlFor="select" className="text-xs">
              Filter by:
            </label>
            <select
              name="select"
              onChange={(e) => setSelect(e.target.value)}
              className="bg-inherit focus:outline-none text-md p-1 rounded-md"
            >
              <option value="all">All</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>
        )}
      </div>
      {data.length === 0 ? (
        <p className="mt-2">
          No transaction history! <em>Start a new transaction.</em>
        </p>
      ) : (
        <div className="mt-6 flex flex-col gap-3">
          {filteredData.map((item) => (
            <Item item={item} key={item.id} onDelete={onDelete} />
          ))}
        </div>
      )}
    </div>
  );
}

function Item({item, onDelete}){
  return (
    <div
      className={`flex items-center justify-between border-r-4 ${
        item.amount > 0 ? "border-green-600" : "border-red-600"
      } py-3 pl-2 pr-1 shadow-md rounded-sm hover:bg-white hover:shadow-xl`}
    >
      <p>
        {item.transaction &&
          item.transaction.charAt(0).toUpperCase() +
            item.transaction.slice(1).toLowerCase()}
      </p>
      <div className="flex items-center justify-center gap-1">
        <span>
          {item.amount > 0 ? "+" : ""}
          {item.amount}
        </span>
        <button onClick={()=>onDelete(item.id)} title='Delete transaction' className="text-xl text-red-500 hover:text-red-600">
          <MdDeleteOutline />
        </button>
        <button title='Edit transaction' className="text-xs">
          🖊
        </button>
      </div>
    </div>
  );
}

function Transaction({onAddTransaction, setOpenForm}){
  const [transaction, setTransaction] = useState("")
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("");


  function handleSumbit(e){
    e.preventDefault()
    if(!transaction || !amount || !type ) {
      toast.error("Please fill in all fields!");
      return;
    };

    const newTransaction = {
      id: crypto.randomUUID(),
      transaction,
      amount: type === "expense" ? -Math.abs(amount) : Math.abs(amount),
      date: new Date().toLocaleString()
    };

    console.log(newTransaction)
    onAddTransaction(newTransaction)

    setTransaction("")
    setAmount("")
    setType("")

    // toast.success("Transaction added!");
    setOpenForm(false)
  }

  return (
    <div>
      <h3 className="mb-3 font-medium uppercase pb-2 border-b-2 border-b-gray-400">
        Add new transaction
      </h3>
      <form className="" onSubmit={handleSumbit}>
        <label htmlFor="transaction" className="font-semibold">
          Transaction
        </label>
        <input
          type="text"
          value={transaction}
          onChange={(e) => setTransaction(e.target.value)}
          className="w-full mb-3 p-2 focus:outline-none border"
          placeholder="Enter transaction name..."
        />

        <div>
          <label htmlFor="amount" className="flex flex-col font-semibold">
            Amount
            {/* <span className="text-sm">(negative-expense, positive-income)</span> */}
          </label>
          <div className="flex items-center text-center gap-5 mb-2">
            <div className="flex items-center gap-1">
              <input
                type="radio"
                name="type"
                id="income"
                value="income"
                checked={type === "income"}
                onChange={(e) => setType(e.target.value)}
                className="hidden peer/income"
              />
              <label
                htmlFor="radio"
                onClick={() => setType("income")}
                className={`px-2 py-1 border rounded-md peer-checked/income:bg-green-500 peer-checked/income:text-white cursor-pointer`}
              >
                Income
              </label>
            </div>
            <div className="flex items-center gap-1">
              <input
                type="radio"
                name="type"
                id="expense"
                value="expense"
                checked={type === "expense"}
                onChange={(e) => setType(e.target.value)}
                className="hidden peer/expense"
              />
              <label
                htmlFor="radio"
                onClick={() => setType("expense")}
                className="px-2 py-1 rounded-md border cursor-pointer peer-checked/expense:bg-red-500 peer-checked/expense:text-white"
              >
                Expense
              </label>
            </div>
          </div>
          <input
            type="number"
            value={amount}
            min={1}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-full mb-3 p-2 focus:outline-none border"
            placeholder={
              type === "income"
                ? "Enter income amount..."
                : "Enter expense amount..."
            }
          />
        </div>
        <button className="w-full font-semibold text-center text-gray-200 p-2 bg-violet-500 hover:bg-violet-600">
          Submit
        </button>
      </form>
    </div>
  );
}