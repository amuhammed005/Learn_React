import React, { useState } from "react";

// const data = [
//   { name: "Sarah Mapuko", image: "https://picsum.photos/100/200" },
//   { name: "Benard Nyarko", image: "https://picsum.photos/100/200" },
//   { name: "James Awuah", image: "https://picsum.photos/100/200" },
// ];

export default function App() {
  const [selectedFriend, setSelectedFriend] = useState(null)
  return (
    <div className="eat-split">
      <FriendList
        selectedFriend={selectedFriend}
        setSelectedFriend={setSelectedFriend}
      />
      <BillSplit
        selectedFriend={selectedFriend}
      />
    </div>
  );
}

function FriendList({selectedFriend, setSelectedFriend}) {
  const randomNum = Math.floor(Math.random() * 100);
  const gender = Math.random() < 0.5 ? "men" : "women";
  const image = `https://randomuser.me/api/portraits/${gender}/${randomNum}.jpg`;

  const [openForm, setOpenForm] = useState(false);
  const [friendName, setFriendName] = useState("");
  const [friendImage, setFriendImage] = useState(
    `https://randomuser.me/api/portraits/${gender}/${randomNum}.jpg`
  );
  const [newData, setNewdata] = useState([
    {
      name: "Sarah Mapuko",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      name: "Benard Nyarko",
      image: "https://randomuser.me/api/portraits/men/46.jpg",
    },
    {
      name: "James Awuah",
      image: "https://randomuser.me/api/portraits/men/58.jpg",
    },
  ]);

  function handleSubmit(e) {
    e.preventDefault();

    if (!friendName) return;

    const newFriend = {
      name: friendName,
      image: friendImage,
    };
    // console.log(newFriend);
    setNewdata((prev) => [...prev, newFriend]);
    setFriendName("")
    setFriendImage(image);
    setOpenForm(false);
  }

  function handleToggleOpen(){
    setOpenForm((open) => !open);
  }

  return (
    <div className="friends">
      {newData.map((friend, i) => (
        <Friend
          friend={friend}
          key={friend.name + i}
          selectedFriend={selectedFriend}
          setSelectedFriend={setSelectedFriend}
        />
      ))}
      {openForm ? (
        <>
        <div className="add-btn">
          <Button onClick={handleToggleOpen}>Cancel</Button>
        </div>
        <div className="form-friend">
          <AddFriendForm
            onSubmit={handleSubmit}
            friendName={friendName}
            friendImage={friendImage}
            setFriendName={setFriendName}
            setFriendImage={setFriendImage}
          />
        </div>
        </>
      ) : (
        <div className="add-btn">
          <Button onClick={handleToggleOpen}>Add Friend</Button>
        </div>
      )}
    </div>
  );
}

function Friend({friend, selectedFriend, setSelectedFriend }) {

  const isSelected = selectedFriend?.name === friend.name;
  function handleSelection(){
    setSelectedFriend(isSelected ? null : friend) 
  }
  return (
    <div className="friend">
      <div className="info">
        <img src={friend.image} alt={friend.name} />
        <div>
          <h3>{friend.name}</h3>
          <p>description</p>
        </div>
      </div>
      <Button onClick={handleSelection}>{isSelected ? "Close" : "Select"}</Button>
    </div>
  );
}

function AddFriendForm({
  onSubmit,
  setFriendName,
  friendName,
  friendImage,
  setFriendImage,
}) {
  return (
    <form onSubmit={onSubmit}>
      <FormInput
        type={"text"}
        value={friendName}
        onChange={(e) => setFriendName(e.target.value)}
        placeholder="Freind's name"
      >
        Name: 
      </FormInput>
      <FormInput
        type={"text"}
        value={friendImage}
        onChange={(e) => setFriendImage(e.target.value)}
        placeholder="Freind's image"
      >Image: 
      </FormInput>
      <div className="form-btn">
      <Button>Submit</Button>
      </div>
    </form>
  );
}

function FormInput({type, children, value, onChange, placeholder}){
  return (
    <div className="input-component">
      <label htmlFor="input">{children}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
}

function Button({ children, onClick }) {
  return (
    <div>
      <button className="btn" onClick={onClick}>
        {children}
      </button>
    </div>
  );
}

function BillSplit({selectedFriend}) {
  const [bill, setBill] = useState("")
  const [userExpense, setUserExpense] = useState("")
  const [friendExpense, setFriendExpense] = useState("")
  const [split, setSplit] = useState("user")


  // if (selectedFriend === null) return <div>No friend selected</div>
  const noSelection = selectedFriend === null

  return (
    <div className="bill-split">
      <h4>
        {noSelection
          ? "No friend selected"
          : `You and ${
              selectedFriend.name?.split(" ")[0]
            } is going to split the bill`}
      </h4>
      <FormInput
        type={"text"}
        value={bill}
        onChange={(e) => setBill(e.target.value)}
        placeholder="Bill value"
      >
        Bill value
      </FormInput>
      <FormInput
        type={"text"}
        value={userExpense}
        onChange={(e) => setUserExpense(e.target.value)}
        placeholder="Your expense"
      >
        Your expense
      </FormInput>
      <FormInput
        type={"text"}
        value={friendExpense}
        onChange={(e) => setFriendExpense(e.target.value)}
        placeholder={`${
          noSelection
            ? "Friend's expense"
            : selectedFriend.name?.split(" ")[0] + "'s expense"
        }`}
      >
        {noSelection
          ? "Friend's"
          : selectedFriend.name?.split(" ")[0] + "'s expense"}
      </FormInput>
      <div>
        <label htmlFor="select">Who is paying for the bill:</label>
        <select value={split} onChange={(e) => setSplit(e.target.value)}>
          <option value="user">You</option>
          <option value="friend">
            {noSelection
              ? "Friend"
              : selectedFriend.name?.split(" ")[0]}
          </option>
        </select>
      </div>
      <div className="add-btn">
        <Button>Split bill</Button>
      </div>
    </div>
  );
}
