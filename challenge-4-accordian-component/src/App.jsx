import React, { useState } from "react";

const faqs = [
  {
    title: "Where are these chairs assembled?",
    text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium, quaerat temporibus quas dolore provident nisi ut aliquid ratione beatae sequi aspernatur veniam repellendus.",
  },
  {
    title: "How long do I have to return my chair?",
    text: "Pariatur recusandae dignissimos fuga voluptas unde optio nesciunt commodi beatae, explicabo natus.",
  },
  {
    title: "Do you ship to countries outside the EU?",
    text: "Excepturi velit laborum, perspiciatis nemo perferendis reiciendis aliquam possimus dolor sed! Dolore laborum ducimus veritatis facere molestias!",
  },
];

export default function App() {
  return (
    <div className="app">
      <Accordian data={faqs} />
    </div>
  );
}

function Accordian({ data }) {
  const [curOpen, setCurOpen] = useState(null);

  return (
    <ul>
      {data.map((el, i) => (
        <AccordianItem
          title={el.title}
          num={i}
          curOpen={curOpen}
          setCurOpen={setCurOpen}
        >
          {el.text}
        </AccordianItem>
      ))}
      <AccordianItem
        title={"My first copy book"}
        num={11}
        curOpen={curOpen}
        setCurOpen={setCurOpen}
      >
        <p>Hello! Welocme to Kingdom book shop</p>
        <ul>
          <li>Class one 1</li>
          <li>Class two 2</li>
          <li>Class three 3</li>
          <li>Class four 4</li>
        </ul>
      </AccordianItem>
    </ul>
  );
}

function AccordianItem({ num, title, children, curOpen, setCurOpen }) {
  const isOpen = num === curOpen;

  function handleOpenToggle() {
    setCurOpen(isOpen ? null : num);
  }

  return (
    <div
      className={`item ${isOpen ? "active" : ""}`}
      onClick={handleOpenToggle}
    >
      <p className={`number ${isOpen ? "active-id" : ""}`}>
        {num + 1 < 9 ? "0" + (num + 1) : num + 1}
      </p>
      <p className="title">{title}</p>
      <button className="icon">{isOpen ? "-" : "+"}</button>
      {isOpen && <p className="item-text">{children}</p>}
    </div>
  );
}
