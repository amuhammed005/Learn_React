import './index.css'

// const skillData = ["Java", "C++", "JavaScript", "Scripting", "Python"]

function App(){
  return <div className='card'>
    <Avatar />
    <div className='data'>
      <Intro />
      <SkillList />
    </div>
  </div>;
}
export default App

import React from 'react'

function Avatar() {
  return (
    <div>
      <img className='avatar' src="image.png" alt="Profile image" />
    </div>
  );
}
function Intro() {
  return (
    <div>
      <h1>Adam Milingu Dev</h1>
      <p>
        Full-stack web developer and teacher at Udemy. When not coding or
        preparing a course, I like to play board games, to cook (and eat), or to
        just enjoy the Portuguese sun at the beach.
      </p>
    </div>
  );
}
function SkillList() {
  return (
    <div className="skill-list">
      <Skill skill={"React"} emoji={"💪"} color={"blue"} />
      <Skill skill={"Python"} emoji={"👊"} color={"yellow"} />
      <Skill skill={"Html + CSS"} emoji={"💪"} color={"red"} />
      <Skill skill={"Node.js"} emoji={"👋"} color={"green"} />
    </div>
  );
}

function Skill(props){
  return (
    <div className='skill' style={{backgroundColor: props.color}}>
      <span>{props.skill}</span>
      <span>{props.emoji}</span>
    </div>
  );
}