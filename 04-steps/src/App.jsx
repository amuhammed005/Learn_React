import React, { useState } from "react";
import "./index.css";

const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];

function App() {
  const [step, setStep] = useState(1)
  const [reset, setReset] = useState(false)

  function previousStep(){
    setStep(step => step - 1)
  }
  function nextStep(){
    setStep(step => step + 1)
  }

  function resetState(){
    setReset(!reset);
    setStep(1)
  }

  return (
    <div className="steps">
      <>
        {!reset ? (
          <>
            <div className="numbers">
              <div className={step == 1 ? "active" : ""}>1</div>
              <div className={step == 2 ? "active" : ""}>2</div>
              <div className={step == 3 ? "active" : ""}>3</div>
            </div>

            <div className="message">
              <span>Step {step}: </span> {messages[step - 1]}
            </div>

            <div className="buttons">
              <button className="btn" onClick={previousStep}>
                Previous
              </button>
              <button className="btn" onClick={nextStep}>
                Next
              </button>
            </div>
          </>
        ) : (
          <Reset />
        )}
        <div className="buttons">
          <button
            className="btn"
            style={{
              backgroundColor: !reset ? "red" : "blueviolet",
              marginTop: "3rem",
            }}
            onClick={resetState}
          >
            {!reset ? "Reset" : "Home"}
          </button>
        </div>
      </>
    </div>
  );
}

export default App


function Reset() {
  return (
    <div className="reset">
      <p>I am a reset component 😂, I destroy states.</p>
    </div>
  )
}