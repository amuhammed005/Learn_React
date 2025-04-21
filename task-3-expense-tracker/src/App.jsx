import React from 'react'

const data = [
  {
    id: 1,
    transaction: "Cash",
    amount: 200,
  },
  {
    id: 2,
    transaction: "Book",
    amount: 300,
  },
  {
    id: 3,
    transaction: "Food",
    amount: 750,
  },
];

export default function App() {
  return <div className='w-3/4 md:w-2/6 flex flex-col mx-auto my-10'>
    <Logo />
    <Balance />
    <History data={data} />
    <Transaction />
  </div>;
}


function Logo(){
  return (
    <div>
      <h1 className='text-xl font-semibold text-center mb-8'>Expense Tracker</h1>
    </div>
  )
}

function Balance(){
  return (
    <div className="mb-8">
      <h3 className="font-medium uppercase">Your Balance</h3>
      <p className="font-bold text-3xl mb-6">$260.00</p>
      <div className="bg-white md:px-5 lg:px-10 py-10 uppercase shadow-lg text-center flex flex-col gap-5 md:flex-row items-center justify-between">
        <span>
          <h4>Income</h4>
          $500.00
        </span>
        <span className="">
          <h4>Expense</h4>
          $500.00
        </span>
      </div>
    </div>
  );
}

function History({data}){
  return (
    <div className='mb-8'>
      <h3 className="font-medium uppercase pb-2 border-b-2 border-b-gray-400">History</h3>
      <div className='mt-6 flex flex-col gap-3'>
        {
          data.map(item=><Item item={item} key={item.id} />)
        }
      </div>
    </div>
  );
}

function Item({item}){
  return (
    <div className='flex items-center justify-between border-r-4 border-green-600 p-3 shadow-md rounded-sm'>
      <p>{item.transaction}</p>
      <span>{item.amount}</span>
    </div>
  )
}

function Transaction(){
  return (
    <div>
      <h3 className="mb-3 font-medium uppercase pb-2 border-b-2 border-b-gray-400">
        Add new transaction
      </h3>
      <form className="">
        <label htmlFor="transaction">Transaction</label>
        <input
          type="text"
          className="w-full mb-3 p-2 focus:outline-none border"
          placeholder="Enter transaction name..."
        />

        <label htmlFor="amount" className="flex flex-col">
          Amount{" "}
          <span className="text-sm">(negative-expense, positive-income)</span>
        </label>
        <input
          type="number"
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