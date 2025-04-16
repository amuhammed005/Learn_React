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
  const [bill, setBill] = useState("")
  const [userTip, setUserTip] = useState(0);
  const [friendTip, setFriendTip] = useState(0);

  let newBill = Number(bill)
  const totalTip = ((userTip + friendTip) / 2 / 100) * newBill;
  const totalBill = newBill + totalTip;

  console.log(totalTip)

  function handleReset(){
    setBill(0)
    setUserTip(0)
    setFriendTip(0)
  }

  const formatter = new Intl.NumberFormat("en-GH", {
    style: "currency",
    currency: "GHS",
    minimumFractionDigits: 2,
  });

    return (
      <div className="app">
        <Bill
          bill={bill}
          setBill={setBill}
          type="number"
          onChange={(e) => 
          setBill(e.target.value)
        }
          placeholder="Bill value"
        >
          How much was the bill?
        </Bill>

        <TipSelector
          value={userTip}
          onChange={(e) => setUserTip(Number(e.target.value))}
        >
          How did you like the service?
        </TipSelector>

        <TipSelector
          value={friendTip}
          onChange={(e) => setFriendTip(Number(e.target.value))}
        >
          How did your friend like the service?
        </TipSelector>

        {totalBill > 0 && (
          <div>
            <p>
              {/* Your total bill is Gh₵{totalBill} (Gh₵{bill} + Gh₵{totalTip}){" "} */}
              Your total bill is {formatter.format(totalBill)} (
              {formatter.format(bill)} + {formatter.format(totalTip)})
            </p>
            <Button onClick={handleReset}>Reset</Button>
          </div>
        )}
      </div>
    );
}

function Bill({ children, bill, type, onChange, placeholder }) {
  return (
    <div>
      <label htmlFor="input">{children}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={bill}
        onChange={onChange}
      />
    </div>
  );
}

function TipSelector({children, value, onChange}){
  return (
    <div>
      <label htmlFor="select">{children}</label>
      <select
        value={value}
        onChange={onChange}
      >
        <option value="0">Disatisfied (0%)</option>
        <option value="5">Satisfied (5%)</option>
        <option value="10">Very satisfied (10%)</option>
        <option value="20">Very satisfied (20%)</option>
      </select>
    </div>
  );
}

function Button({onClick, children}){
  return (
    <button className="btn" onClick={onClick}>
      {children}
    </button>
  );
}