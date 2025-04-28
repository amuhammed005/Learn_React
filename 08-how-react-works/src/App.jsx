import React from "react";

export default function App() {
  return <div className="container">
    <Tab />
    <TabContent />
  </div>;
}

function Tab() {
  return (
    <div className="tabs">
      <div className="tab active">Tab 1</div>
      <div className="tab">Tab 2</div>
      <div className="tab">Tab 3</div>
      <div className="tab">Tab 4</div>
    </div>
  );
}

function TabContent() {
  return (
    <div className="content">
      <h2>React is a library for building UIs</h2>
      <p>
        Dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
        nulla pariatur. Occaecat cupidatat non proident, sunt in culpa qui
        officia deserunt mollit anim id est laborum.
      </p>

      <div className="controls">
        <button>Hide details</button>

        <div className="controls-btns">
          <span>0</span>
          <span>❤</span>
          <button>+</button>
          <button>+++</button>
        </div>
      </div>

      <div className="undo-buttons">
        <button>Undo</button>
        <button>Undo in 2s</button>
      </div>
    </div>
  );
}
