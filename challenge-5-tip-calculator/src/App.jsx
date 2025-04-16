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
    <div className="app">
      <div>
        <label htmlFor="">How much was the bill? </label>
        <input type="text" placeholder="Ghc" value={"user"} />
      </div>
      <div>
        <label htmlFor="">How did you like the service? </label>
        <select name="user" value="user">
          <option value="disatisfied">Disatisfied 0%</option>
          <option value="satisfied">Satisfied 5%</option>
          <option value="very">Very satisfied 10%</option>
        </select>
      </div>
      <div>
        <label htmlFor="">How did your friend like the service? </label>
        <select name="friend" value="friend">
          <option value="disatisfied">Disatisfied 0%</option>
          <option value="satisfied">Satisfied 5%</option>
          <option value="very">Very satisfied 10%</option>
        </select>
      </div>
      <p>Your total bill is Ghc50(Ghc bill + Ghc tip) </p>
      <button>Reset</button>
    </div>
  );
}
