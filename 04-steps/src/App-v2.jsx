import React from 'react'
import "./app.css";

const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];


export default function App() {
  return (
    <div className='app-container'>
      <Steps />
    </div>
  )
}

function Steps(){
  return (
    <div className="">
      <div className="steps">
        <div>1</div>
        <div>2</div>
        <div>3</div>
      </div>
      <div className="message">
        <span>Step 1: </span>
        <p>
        {messages[0]}
        </p>
      </div>
      <div className='buttons'>
        <Button
          roundedMd="15px"
          padding="8px 15px"
          noBorder="none"
          bgColor="#7950f2"
          textColor="#fff"
        >
          <span>👈</span>Previous
        </Button>
        <Button
          roundedMd="15px"
          padding="8px 15px"
          noBorder="none"
          bgColor="#7950f2"
          textColor="#fff"
        >
          Next<span>👉</span>
        </Button>
      </div>
    </div>
  );
}

function Button({
  roundedMd,
  noBorder,
  bgColor,
  textColor,
  children,
  padding,
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
        }}
      >
        {children}
      </button>
    </div>
  );
}
