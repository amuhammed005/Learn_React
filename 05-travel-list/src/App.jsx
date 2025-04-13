import React, { useState } from 'react'
import './index.css'

/* const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: false },
  { id: 3, description: "Soap", quantity: 8, packed: true },
]; */

export default function App() {
  const [items, setItems] = useState([]);

  function handleAddItem(item) {
    setItems((items) => [...items, item]);
  }

  function handleTogglePacked(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  function handleDeleteItem(id){
    setItems(items=>items.filter(item=>item.id !== id))
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItem={handleAddItem} />
      <PackingList
        items={items}
        setItems={setItems}
        onDelete={handleDeleteItem}
        onTogglePacked={handleTogglePacked}
      />
      <Stats items={items} />
    </div>
  );
}

function Logo(){
  return <h1 className="logo">🛍 Far Away 🌴</h1>;
}

function Form({onAddItem}){
  const [description, setDescription] = useState("")
  const [quantity, setQuantity] = useState(1)

  function handleSubmit(e){
    e.preventDefault()
    // console.log(e)
    if (!description) return; 
    
    const newItem = {
      description: description,
      quantity: quantity,
      packed: false,
      id: Date.now()
    }

    console.log(newItem)
    onAddItem(newItem)

    setDescription("")
    setQuantity(1)
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your 😍 trip?</h3>
      <select value={quantity} onChange={(e) => setQuantity(Number(e.target.value))}>
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}
function PackingList({ items, onTogglePacked, onDelete, setItems }) {
  const [sortBy, setSortBy] = useState("input");

  let sortedItems;
  if (sortBy === "input") sortedItems = items;
  if (sortBy === "description") {
    sortedItems = [...items].sort((a, b)=>a.description.localeCompare(b.description))
  }
  if (sortBy === "packed") {
    sortedItems = [...items].sort((a, b)=>Number(b.packed) - Number(a.packed))
  }

  function handleClearList() {
    const confirmClear = window.confirm("Are you sure you want to clear all list?") 
    if (confirmClear) setItems([]);
  }

  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <Item
            item={item}
            key={item.id}
            onDelete={onDelete}
            onTogglePacked={onTogglePacked}
          />
        ))}
      </ul>
      <div>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by packed status</option>
        </select>
        {items.length > 0 && (
          <button onClick={handleClearList}>Clear List</button>
        )}
      </div>
    </div>
  );
}
function Item({ item, onTogglePacked, onDelete }) {
  return (
    <li>
      <input
        type="checkbox"
        checked={item.packed}
        onChange={() => onTogglePacked(item.id)}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDelete(item.id)}>❌</button>
    </li>
  );
}
function Stats({items}){
  const totalItems = items.length
  const packedItems = items.filter(item=>item.packed).length
  const percentage = totalItems === 0 ? 0 : Math.round((packedItems / totalItems) * 100)
  return (
    <footer className="stats">
      <em>
        {totalItems > 0 ? (
          <span>
            You have {totalItems} item{totalItems > 1 ? "s" : ""} on your list,
            {packedItems > 0
              ? `and you already parked ${packedItems}(${percentage}%)`
              : " you have not packed any yet!"}
          </span>
        ) : (
          <span> You have no items in your packing list </span>
        )}
      </em>
    </footer>
  );
}