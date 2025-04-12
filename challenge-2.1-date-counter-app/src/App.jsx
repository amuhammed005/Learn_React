import React, { useState } from "react";
import "./index.css";

export default function App() {
  return (
    <div>
      <Counter />
    </div>
  );
}

function Counter() {
  const [step, setStep] = useState(1);
  const [count, setCount] = useState(0);

  const date = new Date();
  date.setDate(date.getDate() + count);
  const newdate = date.toDateString();

  function handlePrev() {
    setCount((c) => c - step);
  }
  function handleNext() {
    setCount((c) => c + step);
  }

  function handleReset() {
    setStep(1);
    setCount(0);
  }

  return (
    <div className="count-container">
      <div className="range">
        <input
          type="range"
          min="1"
          max="10"
          value={step}
          onChange={(e) => setStep(Number(e.target.value))}
        />
        <span>{step}</span>
      </div>

      <div className="count-group">
        <button onClick={handlePrev}>-</button>
        <input
          type="text"
          value={count}
          onChange={(e) => setCount(Number(e.target.value))}
        />
        <button onClick={handleNext}>+</button>
      </div>
      <div className="message">
        <p>{count === 0 && `Today is ${newdate}`}</p>
        <p>
          {count < 0 &&
            `${count * -1} ${count == -1 ? "day" : "days"} ago was ${newdate}`}
        </p>
        <p>
          {count > 0 &&
            `${count} ${count == 1 ? "day" : "days"} from today is ${newdate}`}
        </p>
      </div>
      <div>
        {(count !== 0 || step !== 1) && (
          <button onClick={handleReset}>Reset</button>
        )}
      </div>
    </div>
  );
}