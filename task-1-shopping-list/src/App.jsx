import React from 'react'
import { MdDelete } from "react-icons/md";


const initialItems = [
  { id: 1, name: "Milk", quantity: 2, purchased: false },
  { id: 2, name: "Eggs", quantity: 12, purchased: true },
  { id: 3, name: "Bread", quantity: 1, purchased: false },
  { id: 4, name: "Tomatoes", quantity: 6, purchased: false },
];


export default function App() {
  return (
    <>
      <Navbar />
      <div className="app-body">
        <Items />
      </div>
    </>
  );
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
    <div className="items">
      <div className="content">
        <Button>Add Item</Button>
        <FilterItems />
      </div>
      <FormAddItem/>
      <h2>List of Items</h2>
      <ul>
        {initialItems.map((item) => (
          <Item key={item.id} item={item} />
        ))}
      </ul>
    </div>
  );
}

function Button({children, onClick}){
  return (
    <button className='btn' onClick={onClick}>{children}</button>
  )
}

function FilterItems(){
  // const [filteredItems, setFilteredItems] = useState("all")
  return (
    <div className="filter">
      <label>Filter by choice</label>
      <select name="">
        <option value="all">All</option>
        <option value="purchased">Purchased</option>
        <option value="not-purchased">Not purchased</option>
      </select>
    </div>
  );
}

function Item({item}){
  return (
    <li>
      <h4>{item.name}</h4>
      <p>{item.quantity}</p>
      <div className="controls">
        <input type="checkbox" />
        <button className="button">
          <MdDelete />
        </button>
      </div>
    </li>
  );
}

function FormAddItem(){
  return (
    <form>
      <div className='form-data'>
        <label>Name</label>
        <input type="text" />
      </div>
      <div className='form-data'>
        <label>Quantity</label>
        <input type="number" />
      </div>
      <Button>Add</Button>
    </form>
  );
}