import React, { useState } from 'react'

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
    <div className='app'>
      <Accordian />
    </div>
  )
}

function Accordian(){
  return (
    <ul>
      {faqs.map(faq=><Faq key={faq.title} faq={faq} />)}
    </ul>
  )
}

function Faq({faq}){
  
  return (
    <div className="faq">
      <span>01</span>
      <p>{faq.title}</p>
      <button>+</button>
    </div>
  );
}