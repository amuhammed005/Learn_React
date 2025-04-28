import React, { useState } from "react";

const content = [
  {
    summary: "React is a library for building UIs",
    details:
      "Dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    summary: "State management is like giving state a home",
    details:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    summary: "We can think of props as the component API",
    details:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  },
];

export default function App() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="container">
      <div className="tabs">
        <Tab num={0} activeTab={activeTab} onClick={setActiveTab} />

        <Tab num={1} activeTab={activeTab} onClick={setActiveTab} />

        <Tab num={2} activeTab={activeTab} onClick={setActiveTab} />

        <Tab num={3} activeTab={activeTab} onClick={setActiveTab} />
      </div>

      {activeTab <= 2 ? (
        <TabbedContent
          content={content.at(activeTab)}
          key={content.at(activeTab).summary}
        />
      ) : (
        <DifferentContent />
      )}
    </div>
  );
}

function Tab({ num, onClick, activeTab }) {
  return (
    <button
      className={activeTab == num ? "tab active" : "tab"}
      onClick={() => onClick(num)}
    >
      Tab {num + 1}
    </button>
  );
}

function TabbedContent({ content }) {
  const [likes, setLikes] = useState(0);
  const [showDetails, setShowDetails] = useState(true);

  function handleSingleCount() {
    setLikes((c) => c + 1);
  }

  function handleTrippleCount() {
    setLikes((c) => c + 3);
  }

  return (
    <div className="content">
      <h2>{content.summary}</h2>
      {showDetails && <p>{content.details}</p>}

      <div className="controls">
        <button onClick={() => setShowDetails((show) => !show)}>
          {showDetails ? "Hide" : "Show"} details
        </button>

        <div className="controls-btns">
          <span>{likes}</span>
          <span>❤</span>
          <button onClick={handleSingleCount}>+</button>
          <button onClick={handleTrippleCount}>+++</button>
        </div>
      </div>

      <div className="undo-buttons">
        <button>Undo</button>
        <button>Undo in 2s</button>
      </div>
    </div>
  );
}

function DifferentContent() {
  return (
    <div className="content">
      <h3>I'm a DIFFERENT tab, so I reset state 💣💥</h3>
    </div>
  );
}
