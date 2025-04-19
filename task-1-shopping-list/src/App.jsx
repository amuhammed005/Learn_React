import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";

const initialItems = [
  { id: 1, name: "Milk", quantity: 2, purchased: false },
  { id: 2, name: "Eggs", quantity: 12, purchased: false },
  { id: 3, name: "Bread", quantity: 1, purchased: false },
  { id: 4, name: "Tomatoes", quantity: 6, purchased: false },
];

export default function App() {
  const [toggleAddForm, setToggleAddForm] = useState(false);
  const [selectedOption, setSelectedOption] = useState("all");
  const [items, setItems] = useState(() => {
    const storedItems = localStorage.getItem("items");
    return storedItems ? JSON.parse(storedItems) : initialItems;
  });

  function handleAddItem(item) {
    setItems((items) => [...items, item]);
    setToggleAddForm(false);
  }

  function handleOpenForm() {
    setToggleAddForm((open) => !open);
  }

  function handleTogglePurchased(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, purchased: !item.purchased } : item
      )
    );
  }

  function handleDeleteItem(id) {
    setItems(items.filter((item) => item.id !== id));
  }

  function handleMarkAll() {
    const allPurchased = items.every((item) => item.purchased);

    setItems((items) =>
      items.map((item) => ({
        ...item,
        purchased: !allPurchased,
      }))
    );
  }


  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);

  // useEffect(() => {
  //   console.log("Current items:", items);
  // }, [items]);



  // useEffect(() => {
  //   const storedItems = JSON.parse(localStorage.getItem("items"));
  //   if (storedItems) setItems(storedItems);
  // }, []);

  return (
    <>
      <Navbar />
      <div className="app-body">
        <div className="add-filter">
          <Button onClick={handleOpenForm}>{toggleAddForm ? "Close" : "Add item"}</Button>
          <FilterItems
            items={items}
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
          />
        </div>
        {toggleAddForm && (
          <FormAddItem onAddItem={handleAddItem} items={items} />
        )}
        <ItemsList
          items={items}
          selectedOption={selectedOption}
          onDeleteItem={handleDeleteItem}
          onMarkAll={handleMarkAll}
          onTogglePurchased={handleTogglePurchased}
        />
      </div>
    </>
  );
}

function Navbar() {
  return (
    <nav className="nav">
      <h2 className="logo">GroceryStore</h2>

      <div>
        <a href="">Home</a>
        <a href="">About</a>
        <a href="">Cart</a>
      </div>
    </nav>
  );
}

function Button({ children, onClick }) {
  return (
    <button className="btn" onClick={onClick}>
      {children}
    </button>
  );
}

function FilterItems({ selectedOption, setSelectedOption }) {
  return (
    <div className="filter">
      <label>Filter by choice</label>
      <select
        value={selectedOption}
        onChange={(e) => setSelectedOption(e.target.value)}
      >
        <option value="all">All</option>
        <option value="purchased">Purchased</option>
        <option value="not-purchased">Not purchased</option>
      </select>
    </div>
  );
}

function ItemsList({ items, selectedOption, onTogglePurchased, onDeleteItem, onMarkAll }) {

  let filteredItems;
  if (selectedOption === "all") filteredItems = items;
  if (selectedOption === "purchased") {
    filteredItems = items.filter((item) => item.purchased === true);
  }
  if (selectedOption === "not-purchased") {
    filteredItems = items.filter((item) => item.purchased === false);
  }

  const allPurchased =
    items.length > 0 && items.every((item) => item.purchased);

  return (
    <div className="items">
      <div className="add-filter">
        <h2>List of Items</h2>
        <Button onClick={onMarkAll}>
          {allPurchased ? "Unmark All" : "Mark All"}
        </Button>
      </div>
      {filteredItems.length === 0 ? (
        <p style={{margin: "3rem 0", fontSize: "1.6rem", lineHeight: "1.8rem"}}>No items found</p>
      ) : (
        <ul>
          {filteredItems.map((item) => (
            <Item
              key={item.id}
              item={item}
              onTogglePurchased={onTogglePurchased}
              onDeleteItem={onDeleteItem}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

function Item({ item, onTogglePurchased, onDeleteItem }) {
  return (
    <li>
      <h4>{item.name}</h4>
      <p>{item.quantity}</p>
      <div className="controls">
        <input
          type="checkbox"
          checked={item.purchased}
          onChange={() => onTogglePurchased(item.id)}
        />
        <button className="button" onClick={() => onDeleteItem(item.id)}>
          <MdDelete />
        </button>
      </div>
    </li>
  );
}

function FormAddItem({ onAddItem }) {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [errorMessage, setErrorMessage] = useState("") 

  
  function handleFormSubmit(e) {
    e.preventDefault();
    
    
    if (!name.trim() || !quantity.trim()) {
      setErrorMessage("Please enter a valid name and quantity.")
      return;
    }
    
    setErrorMessage("")
    
    const formattedName = name
      .trim()
      .toLowerCase()
      .split(/\s+/)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ").slice(0, 20);

    const newItem = {
      id: crypto.randomUUID(),
      name: formattedName,
      quantity: Number(quantity),
      purchased: false,
    };
    // console.log(newItem);
    onAddItem(newItem);

    setName("");
    setQuantity("");
  }

  return (
    <form onSubmit={handleFormSubmit}>
      {errorMessage && <p className="error">{errorMessage}</p>}
      <div className="form-data">
        <label>Name</label>
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="form-data">
        <label>Quantity</label>
        <input
          type="number"
          min="1"
          required
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
      </div>
      <Button>Add</Button>
    </form>
  );
}
