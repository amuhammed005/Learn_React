import React, { useState } from 'react'
import { MdDeleteOutline } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


// const dummyData = [
//   {
//     id: 1,
//     transaction: "Cash",
//     amount: 200,
//   },
//   {
//     id: 2,
//     transaction: "Book",
//     amount: 300,
//   },
//   {
//     id: 3,
//     transaction: "Food",
//     amount: 750,
//   },
// ];

export default function App() {
  const [data, setData] = useState([])

  function handleAddTransaction(newItem){
    setData([...data, newItem])
  }

  function handleDelete(id){
    setData(data=>data.filter(item=>item.id !== id))
    toast.error("Transaction deleted!");
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
        <Transaction onAddTransaction={handleAddTransaction} />
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
      } p-3 shadow-md rounded-sm`}
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
        <button onClick={()=>onDelete(item.id)} className="text-xl text-red-500 hover:text-red-600">
          <MdDeleteOutline />
        </button>
      </div>
    </div>
  );
}

function Transaction({onAddTransaction}){
  const [transaction, setTransaction] = useState("")
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("");


  function handleSumbit(e){
    e.preventDefault()
    if(!transaction || !amount || !type ) return;

    const newTransaction = {
      id: crypto.randomUUID(),
      transaction,
      amount: type === "expense" ? -Math.abs(amount) : Math.abs(amount),
    };

    onAddTransaction(newTransaction)

    setTransaction("")
    setAmount("")
    setType("")

    toast.success("Transaction added!");
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
                value="income"
                checked={type === "income"}
                onChange={(e) => setType(e.target.value)}
                // className="hidden peer"
              />
              <label
                htmlFor="radio"
                // className={`px-2 py-1 border rounded-md peer-checked:bg-green-500 peer-checked:text-white cursor-pointer`}
              >
                Income
              </label>
            </div>
            <div className="flex items-center gap-1">
              <input
                type="radio"
                name="type"
                value="expense"
                checked={type === "expense"}
                onChange={(e) => setType(e.target.value)}
                // className="hidden peer"
              />
              <label
                htmlFor="radio"
                // className="px-2 py-1 rounded-md border cursor-pointer peer-checked:bg-red-500 peer-checked:text-white"
              >
                Expense
              </label>
            </div>
          </div>
          <input
            type="number"
            value={amount}
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
          Add transaction
        </button>
      </form>
    </div>
  );
}