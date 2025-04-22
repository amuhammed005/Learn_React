import React, { useState } from 'react'
import { MdDeleteOutline } from "react-icons/md";

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
    <div className="w-3/4 md:w-2/6 flex flex-col mx-auto my-10">
      <Logo />
      <Balance data={data} formatCurrency={formatCurrency} />
      <History data={data} onDelete={handleDelete} />
      <Transaction onAddTransaction={handleAddTransaction}/>
    </div>
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
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between  pb-2 border-b-2 border-b-gray-400">
        <h3 className="font-medium uppercase">History</h3>
        <div className=''>
          <label htmlFor="select" className='text-xs'>Filter by:</label>
          <select name="select" className="bg-inherit focus:outline-none">
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>
      </div>
      {data.length === 0 ? (
        <p className="mt-2">
          No transaction history! <em>Start a new transaction.</em>
        </p>
      ) : (
        <div className="mt-6 flex flex-col gap-3">
          {data.map((item) => (
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


  function handleSumbit(e){
    e.preventDefault()
    if(!transaction || !amount ) return;

    const newTransaction = {
      id: crypto.randomUUID(),
      transaction,
      amount: Number(amount),
    }

    onAddTransaction(newTransaction)

    setTransaction("")
    setAmount("")
  }

  return (
    <div>
      <h3 className="mb-3 font-medium uppercase pb-2 border-b-2 border-b-gray-400">
        Add new transaction
      </h3>
      <form className="" onSubmit={handleSumbit}>
        <label htmlFor="transaction">Transaction</label>
        <input
          type="text"
          value={transaction}
          onChange={e=>setTransaction(e.target.value)}
          className="w-full mb-3 p-2 focus:outline-none border"
          placeholder="Enter transaction name..."
        />

        <label htmlFor="amount" className="flex flex-col">
          Amount
          <span className="text-sm">(negative-expense, positive-income)</span>
        </label>
        <input
          type="number"
          value={amount}
          onChange={e=>setAmount(Number(e.target.value))}
          className="w-full mb-3 p-2 focus:outline-none border"
          placeholder="Enter amount..."
        />
        <button className="w-full font-semibold text-center text-gray-200 p-2 bg-violet-500 hover:bg-violet-600">
          Add transaction
        </button>
      </form>
    </div>
  );
}