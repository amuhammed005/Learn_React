import React, { useEffect, useState } from 'react'
import Logo from './Logo';
import Form from './Form';
import PackingList from './PackingList';
import Stats from './Stats';

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
