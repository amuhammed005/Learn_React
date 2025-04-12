import React, { useState } from 'react'

function App() {
  return (
    <div className='app'>
      <Flashcards />
    </div>
  )
}

export default App

const questions = [
  {
    id: 3457,
    question: "What language is React based on?",
    answer: "JavaScript",
  },
  {
    id: 7336,
    question: "What are the building blocks of React apps?",
    answer: "Components",
  },
  {
    id: 8832,
    question: "What's the name of the syntax we use to describe a UI in React?",
    answer: "JSX",
  },
  {
    id: 1297,
    question: "How to pass data from parent to child components?",
    answer: "Props",
  },
  {
    id: 9103,
    question: "How to give components memory?",
    answer: "useState hook",
  },
  {
    id: 2002,
    question:
      "What do we call an input element that is completely synchronised with state?",
    answer: "Controlled element",
  },
];

function Flashcards(){
  const [selectedId, setSelectedId] = useState(null);
  
  function handleSelection(id){
    setSelectedId(id !== selectedId ? id : null)
  }

  return (
    <div className='flashcards'>
      {questions.map((question) => (
        <Card question={question} selectedId={selectedId} onSelect={handleSelection} key={question.id} />
      ))}
    </div>
  );
}

function Card({ question, selectedId, onSelect }) {
  const isSeleted = question.id === selectedId

  return (
      <div
        className={`card ${isSeleted ? "selected" : ""}`}
        onClick={() => onSelect(question.id)}
      >
        {isSeleted ? question.answer : question.question}
      </div>
  );
}