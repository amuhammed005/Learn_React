import React from 'react'

const initialItems = [
  { id: 1, name: "Milk", quantity: 2, purchased: false },
  { id: 2, name: "Eggs", quantity: 12, purchased: true },
  { id: 3, name: "Bread", quantity: 1, purchased: false },
  { id: 4, name: "Tomatoes", quantity: 6, purchased: false },
];


export default function App() {
  return (
    <div className='app'>
      <Navbar />
      <Items />
    </div>
  )
}

function Navbar(){
  return (
    <nav className='nav'>
      <h2 className='logo'>GroceryStore</h2>

      <div>
        <a href="">Home</a>
        <a href="">About</a>
        <a href="">Cart</a>
      </div>
    </nav>
  )
}

function Items(){
  return (
    <div></div>
  )
}
