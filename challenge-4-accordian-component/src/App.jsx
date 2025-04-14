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
      <Accordian data={faqs} />
    </div>
  )
}

function Accordian({data}){
  const [selectItem, setSelectedItem] = useState(null)

  function handleToggleItem(id){
    setSelectedItem(currentId=>currentId !== id ? id : null)
  }

  return (
    <ul>
      {data.map((el) => (
        <Item el={el} selectItem={selectItem} onToggleItem={handleToggleItem} />
      ))}
    </ul>
  );
}

function Item({el, onToggleItem, selectItem }) {
  return (
    <div
      className={`item ${selectItem === el.id ? "active" : ""}`}
      onClick={() => onToggleItem(el.id)}
    >
      <p className={`number ${selectItem === el.id ? "active-id" : ""}`}>
        {el.id <= 9 ? "0" + el.id : el.id}
      </p>
      <p className="title">{el.title}</p>
      <button className="icon">{selectItem === el.id ? "-" : "+"}</button>
      {selectItem === el.id && <p className="item-text">{el.text}</p>}
    </div>
  );
}