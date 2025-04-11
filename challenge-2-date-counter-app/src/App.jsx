import React, { useState } from 'react'

function App() {
  const [step, setStep] = useState(0)
  const [count, setCount] = useState(step)

  function handlePrevStep(){
    setStep(s=>s-1)
  }
  function handleNextStep(){
    setStep(s=>s+1)
  }
  function handlePrevCount(){
    setCount((c) => c - step);
  }
  function handleNextCount(){
    setCount((c) => c + step);
  }
  
  const date = new Date();
  date.setDate(date.getDate() + count);
  const displayDate = date.toDateString();


  return (
    <div className='app'>
      <div className='step'>
        <button onClick={handlePrevStep}>-</button>
        <span>Step: {step}</span>
        <button onClick={handleNextStep}>+</button>
      </div>
      <div className='step'>
        <button onClick={handlePrevCount}>-</button>
        <span>Count: {count}</span>
        <button onClick={handleNextCount}>+</button>
      </div>
      <div className='message'>
        <p>{count == 0 && `Today is ${displayDate}`}</p>
        <p>
          {count < 0 &&
            `${count * -1} ${
              count == -1 ? "day" : "days"
            } ago was ${displayDate}`}
        </p>
        <p>
          {count > 0 &&
            `${count} ${count == 1 ? "day" : "days"} from today is ${displayDate}`}
        </p>
      </div>
    </div>
  );
}

export default App