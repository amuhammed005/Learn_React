import React from 'react'
import { useState } from 'react';

export default function App() {
  return (
    <div>
      <Calculator />
    </div>
  )
}

function Calculator(){
  const [bill, setBill] = useState(0)
  const [userService, setUserService] = useState("Disatisfied");
  const [friendService, setFriendService] = useState("Satisfied");

  let userTip = 0;
  let friendTip = 0;
  if (userService === "disatisfied") {
     userTip += 0;
  } else if (userService === "satisfied") {
    userTip += 5
  } else if (userService === "very-satisfied") {
    userTip += 10;
  }

  if (friendService === "disatisfied") {
    friendTip += 0;
  } else if (friendService === "satisfied") {
    friendTip += 5;
  } else if (friendService === "very-satisfied") {
    friendTip += 10;
  }

  const totalTip = (userTip + friendTip) / 2
  const totalBill = bill + totalTip

  console.log("bill: " + typeof(bill))
  console.log( "user tip: " + typeof(userTip))
  console.log("friend tip: " + typeof(friendTip))
  console.log( "total tip: " + typeof(totalTip))
  console.log( "total bill: " + typeof(totalBill))

  function handleReset(){
    setBill(0)
    setUserService("Disatisfied")
    setFriendService("Disatisfied")
  }

    return (
      <div className="app">
        <div>
          <label htmlFor="">How much was the bill? </label>
          <input
            type="number"
            placeholder="0.00"
            value={bill}
            onChange={(e) => setBill(Number(e.target.value))}
          />
        </div>
        <div>
          <label htmlFor="">How did you like the service? </label>
          <select
            name="user"
            value={userService}
            onChange={(e) => setUserService(e.target.value)}
          >
            <option value="disatisfied">Disatisfied 0%</option>
            <option value="satisfied">Satisfied 5%</option>
            <option value="very-satisfied">Very satisfied 10%</option>
          </select>
        </div>
        <div>
          <label htmlFor="">How did your friend like the service? </label>
          <select
            name="friend"
            value={friendService}
            onChange={(e) => setFriendService(e.target.value)}
          >
            <option value="disatisfied">Disatisfied 0%</option>
            <option value="satisfied">Satisfied 5%</option>
            <option value="very-satisfied">Very satisfied 10%</option>
          </select>
        </div>

        {totalBill > 0 && (
          <div>
            <p>
              Your total bill is Gh₵{totalBill} (Gh₵{bill} + Gh₵{totalTip}){" "}
            </p>
            <button className='btn' onClick={handleReset}>Reset</button>
          </div>
        )}
      </div>
    );
}
