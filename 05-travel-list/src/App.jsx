import React from 'react'
import './index.css'

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: false },
  { id: 3, description: "Soap", quantity: 8, packed: true },
];

export default function App() {
  return (
    <div className='app'>
      <Logo />
      <Form />
      <PackingList />
      <Stats />
    </div>
  )
}

function Logo(){
  return <h1 className="logo">🛍 Far Away 🌴</h1>;
}

function Form(){
  return (
    <form className='add-form'>
      <h3>What do you need for your 😍 trip?</h3>
      <select name="" id="">
        {Array.from({length: 20}, (_, i)=>i+1).map(num=>(<option value={num} key={num}>{num}</option>))}
      </select>
      <input type="text" placeholder='Item...' />
      <button>Add</button>
    </form>
  )
}
function PackingList(){
  return (
    <div className="list">
      <ul>{initialItems.map(item=><Item item={item} key={item.id} />)}</ul>
    </div>
  );
}
function Item({item}){
  return (
    <li className=''>
      <input type="checkbox" />
      {item.description} {item.quantity}
      <button>❌</button>
    </li>
  )
}
function Stats(){
  return (
    <footer className="stats">
      <em>You have X items on your list and you already parked X(X%) </em>
    </footer>
  );
}
