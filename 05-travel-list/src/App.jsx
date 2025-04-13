import React, { useEffect, useState } from 'react'
import './index.css'

/* const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: false },
  { id: 3, description: "Soap", quantity: 8, packed: true },
]; */

export default function App() {
  const [items, setItems] = useState(() => {
    const storedItems = localStorage.getItem("items");
    return storedItems ? JSON.parse(storedItems) : [];
  });

  
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

  function handleClearStorage(){
    const confirmClear = window.confirm("Are you sure you want to clear storage? ")
    if (confirmClear){
      localStorage.removeItem("items");
      setItems([])
    }
  }

  useEffect(()=>{
    localStorage.setItem("items", JSON.stringify(items));
  }, [items])
  
  return (
    <div className="app">
      <Logo />
      <Form onAddItem={handleAddItem} />
      <PackingList
        items={items}
        setItems={setItems}
        onDelete={handleDeleteItem}
        onTogglePacked={handleTogglePacked}
        onClearStorage={handleClearStorage}
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
function PackingList({ items, onTogglePacked, onDelete, setItems, onClearStorage }) {
  const [sortBy, setSortBy] = useState(()=>{
    return localStorage.getItem("sortBy") || "input";
  });

  useEffect(()=>{
    localStorage.setItem("sortBy", sortBy)
  }, [sortBy])

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

  function handleExportList() {
    const fileData = JSON.stringify(items, null, 2);
    const blob = new Blob([fileData], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "packing-list.json";
    link.click();
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
          <>
            {/* <button onClick={handleClearList}>Clear List</button> */}
            <button className="btn clear-btn" onClick={handleClearList}>
              🗑️ Clear List
            </button>
            <button className="btn export-btn" onClick={handleExportList}>
              📄 Export List
            </button>
            <button className='btn clear-storage' onClick={onClearStorage}>Clear Storage</button>
          </>
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
  if(!items.length) return <p className='stats'>
    <em>Start adding some items to your packing list 🚀</em>
  </p>

  const totalItems = items.length
  const packedItems = items.filter(item=>item.packed).length
  const percentage = Math.round((packedItems / totalItems) * 100)
  return (
    <footer className="stats">
      <em>
        {percentage === 100
          ? "You got everything packed. Ready to go ✈"
          : `You have ${totalItems} item${
              totalItems > 1 ? "s" : ""
            } on your list, ${
              packedItems > 0
                ? `and you already parked ${packedItems}(${percentage}%)`
                : " you have not packed any yet!"
            }`}
      </em>
    </footer>
  );
}