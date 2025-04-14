import React, { useState } from 'react'

const faqs = [
  {
    id: 1,
    title: "Where are these chairs assembled?",
    text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium, quaerat temporibus quas dolore provident nisi ut aliquid ratione beatae sequi aspernatur veniam repellendus.",
  },
  {
    id: 2,
    title: "How long do I have to return my chair?",
    text: "Pariatur recusandae dignissimos fuga voluptas unde optio nesciunt commodi beatae, explicabo natus.",
  },
  {
    id: 3,
    title: "Do you ship to countries outside the EU?",
    text: "Excepturi velit laborum, perspiciatis nemo perferendis reiciendis aliquam possimus dolor sed! Dolore laborum ducimus veritatis facere molestias!",
  },
];

export default function App() {
  return (
    <div className='app'>
      <Accordian />
    </div>
  )
}

function Accordian(){
  const [selectItem, setSelectedItem] = useState(null)

  function handleClickItem(id){
    setSelectedItem(currentId=>currentId !== id ? id : null)
  }

  return (
    <ul>
      {faqs.map((faq) => (
        <li
          className={`faq ${selectItem === faq.id ? "active" : ""}`}
          onClick={() => handleClickItem(faq.id)}
        >
          <div className="faq-header">
            <span className={selectItem === faq.id ? "active-id" : ""}>
              {faq.id <= 9 ? "0" + faq.id : faq.id}
            </span>
            <h4 className="title">{faq.title}</h4>
            <button>{selectItem === faq.id ? "-" : "+"}</button>
          </div>
          {selectItem === faq.id && <p className="faq-text">{faq.text}</p>}
        </li>
      ))}
    </ul>
  );
}