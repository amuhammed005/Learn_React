import React, {useEffect, useState } from 'react'

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

export default function App() {
  const [showAddForm, setShowAddForm] = useState(false)
  const [friends, setFriends] = useState(initialFriends)
  const [selectedFriend, setSelectedFriend] = useState(null)

  function handleSelection(friend){
    setSelectedFriend((cur) => cur?.id === friend.id ? null : friend)
    console.log(selectedFriend)
  }

  function handleAddFriend(friend){
    setFriends(friends=>[...friends, friend])
    setShowAddForm(false)
  }

  function handleShowAddForm(){
    setShowAddForm(open=>!open)
  }

  function handleSplitBill(value){
    console.log(value);
    setFriends((friends) =>
      friends.map((friend) =>
        friend.id === selectedFriend?.id
          ? { ...friend, balance: friend.balance + value }
          : friend
      )
    );

    selectedFriend(null)
  }

  return (
    <>
    <Navbar />
    <div className="app">
      <div className="sidebar">
        <FriendList friends={friends} onAddFriend={handleAddFriend} selectedFriend={selectedFriend} onSelection={handleSelection} />

        {showAddForm && <FormAddFrined onAddFriend={handleAddFriend} />}
        <Button onClick={handleShowAddForm}>
          {showAddForm ? "Close" : "Add Friend"}
        </Button>
      </div>
      {
        selectedFriend && 
      <FormSplitBill selectedFriend={selectedFriend} onSplitBill={handleSplitBill} key={selectedFriend.id}/>
      }
    </div>
    </>
  );
}


function Navbar() {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const threshold = 100;

    const handleScroll = () => {
      const currentScroll = window.scrollY;
      setIsSticky(currentScroll > threshold);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`navbar ${isSticky ? "sticky" : ""}`}>
      <div className="navbar-container">
        <h1 className="logo">MyApp</h1>
        <ul className="nav-links">
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#">Friends</a>
          </li>
          <li>
            <a href="#">Split Bill</a>
          </li>
        </ul>
      </div>
    </nav>
  );
}


function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}


function FriendList({friends, selectedFriend, onSelection}){
  return <ul>{friends.map(friend=><Friend friend={friend} key={friend.id} selectedFriend={selectedFriend} onSelection={onSelection} />)}</ul>;
}  

function Friend({friend, selectedFriend, onSelection}){
  return (
    <li>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>
      {friend.balance < 0 && (
        <p className="red">
          You owe {friend.name} {Math.abs(friend.balance)}₵
        </p>  
      )}
      {friend.balance > 0 && (
        <p className='green'>
          {friend.name} owe you {friend.balance}₵
        </p>    
      )}
      {friend.balance === 0 && <p>You and {friend.name} are even</p>}
      <Button onClick={() => onSelection(friend)}>{selectedFriend?.id === friend.id ? "Close" : "Select"}</Button>
    </li>
  );
}  


function FormAddFrined({onAddFriend}){
  const [name, setName] = useState("")
  const [image, setImage] = useState("https://i.pravatar.cc/48");

  function handleSubmit(e){
    e.preventDefault()

    if(!name || !image) return;

    const id = crypto.randomUUID()
    const newFriend = {
      id,
      name,
      image: `${image}?=${id}`,
      balance: 0,
    }

    console.log(newFriend)
    onAddFriend(newFriend)
    setName("")
    setImage(image)
  }

  return (
    <form className="form-add-friend">
      <label>🧑‍🦱 Name</label>
      <input type="text" value={name} onChange={e=>setName(e.target.value)} />

      <label>🌄 Image</label>
      <input type="text" value={image} onChange={e=>setImage(e.target.value)} />

      <Button onClick={handleSubmit}>Add</Button>
    </form>
  );
}


function FormSplitBill({selectedFriend, onSplitBill}){
  const [bill, setBill] = useState("")
  const [userToPay, setUserToPay] = useState("")
  const friendToPay = bill ? bill - userToPay : "";
  const [whoWillPay, setWhoWillPay] = useState("user")

  function handleSubmitSplitBill(e){
    e.preventDefault()

    if(!bill || !userToPay) return;

    onSplitBill(whoWillPay === "user" ? friendToPay : -userToPay);
    setBill("")
    setUserToPay("")
    setWhoWillPay("user")
  }

  return (
    <form className="form-split-bill">
      <h2>You and {selectedFriend?.name} is going to split the bill</h2>

      <label>💰 Bill</label>
      <input
        type="text"
        value={bill}
        onChange={(e) => setBill(Number(e.target.value))}
      />

      <label>🧑‍🦱 Your expense</label>
      <input
        type="text"
        value={userToPay}
        onChange={(e) =>
          setUserToPay(
            Number(e.target.value) > bill ? userToPay : Number(e.target.value)
          )
        }
      />

      <label>👭 {selectedFriend?.name} expense</label>
      <input type="text" value={friendToPay} disabled />

      <label>💳 Who is paying the bill?</label>
      <select
        value={whoWillPay}
        onChange={(e) => setWhoWillPay(e.target.value)}
      >
        <option value="user">You</option>
        <option value="friend">{selectedFriend?.name}</option>
      </select>

      <Button onClick={handleSubmitSplitBill}>Split bill</Button>
    </form>
  );
}