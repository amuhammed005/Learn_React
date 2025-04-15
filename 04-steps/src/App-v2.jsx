import React, { useState } from 'react'
import "./app.css";

const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];


export default function App() {

  return (
    <div >
      <Steps />
      <Steps />
    </div>
  );
}

function Steps(){
  const [step, setStep] = useState(1)
  const [open, setOpen] = useState(false);

  function handleToggleApp() {
    setOpen((f) => !f);
  }

  function handlePrevious(){
    if (step > 1 ) setStep((s) => s - 1);
  }
  function handleNext(){
    if (step < 3 ) setStep((s) => s + 1);
  }

  return (
    <>
      <div className="open-close">
        <Button
          cursorPointer="pointer"
          noBorder="none"
          fontSize="large"
          fontWeight="bolder"
          handleClick={handleToggleApp}
        >
          ❌
        </Button>
      </div>
      {open && (
        <div className="app-container">
          <div className="steps">
            <div className={step >= 1 ? "active" : ""}>1</div>
            <div className={step >= 2 ? "active" : ""}>2</div>
            <div className={step >= 3 ? "active" : ""}>3</div>
          </div>

          <StepMessage step={step}>{messages[step - 1]}</StepMessage>
          <div className="buttons">
            <Button
              roundedMd="15px"
              padding="8px 15px"
              noBorder="none"
              bgColor="#7950f2"
              textColor="#fff"
              cursorPointer="pointer"
              handleClick={handlePrevious}
            >
              <span>👈 </span>Previous
            </Button>
            <Button
              roundedMd="15px"
              padding="8px 15px"
              noBorder="none"
              bgColor="#7950f2"
              textColor="#fff"
              cursorPointer="pointer"
              handleClick={handleNext}
            >
              Next<span> 👉</span>
            </Button>
          </div>
        </div>
      )}
    </>
  );
}

function StepMessage({step, children}){
  return (
    <div className="message">
      <h3>Step {step}:</h3>
      {children}
    </div>
  );
}

function Button({
  handleClick,
  roundedMd,
  noBorder,
  bgColor,
  textColor,
  children,
  padding,
  cursorPointer,
  fontSize,
  fontWeight,
}) {
  return (
    <div>
      <button
        style={{
          border: noBorder,
          backgroundColor: bgColor,
          color: textColor,
          padding: padding,
          borderRadius: roundedMd,
          cursor: cursorPointer,
          fontSize: fontSize,
          fontWeight: fontWeight,
        }}
        onClick={handleClick}
      >
        {children}
      </button>
    </div>
  );
}
