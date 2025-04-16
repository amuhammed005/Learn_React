import React from 'react'

export default function App() {
  return (
    <div>
      <Calculator />
    </div>
  )
}

function Calculator(){
  return (
    <div>
      <div>
        <label htmlFor="">How much was the bill? </label>
        <input type="text" placeholder="Ghc" value={"user"} />
      </div>
      <div>
        <label htmlFor="">How did you like the service? </label>
        <select name="user" value="user">
          <option value="">Disatisfied 0%</option>
          <option value="">Satisfied 5%</option>
          <option value="">Very satisfied 10%</option>
        </select>
      </div>
      <div>
        <label htmlFor="">How did your friend like the service? </label>
        <select name="friend" value="friend">
          <option value="">Disatisfied 0%</option>
          <option value="">Satisfied 5%</option>
          <option value="">Very satisfied 10%</option>
        </select>
      </div>
      <p>Your total bill is Ghc50(Ghc bill + Ghc tip) </p>
      <button>Reset</button>
    </div>
  );
}
