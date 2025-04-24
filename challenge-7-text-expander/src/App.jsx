import React, { useState } from 'react'

export default function App() {
  return (
    <div className="app">
      <TextExpander
        text="Lorem Ipsum is simply dummy text of the printing and typesetting industry.
              Lorem Ipsum has been the industry's standard dummy text ever since the
              1500s, when an unknown printer took a galley of type and scrambled it to
              make a type specimen book. It has survived not only five centuries, but
              also the leap into electronic typesetting, remaining essentially
              unchanged. It was popularised in the 1960s with the release of Letraset
              sheets containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of Lorem
              Ipsum."
        minLength={80}
        collapsedByDefault={true}
      />
      <TextExpander
        text="Lorem Ipsum is simply dummy text of the printing and typesetting industry.
              Lorem Ipsum has been the industry's standard dummy text ever since the
              1500s, when an unknown printer took a galley of type and scrambled it to
              make a type specimen book. It has survived not only five centuries, but
              also the leap into electronic typesetting, remaining essentially
              unchanged. It was popularised in the 1960s with the release of Letraset
              sheets containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of Lorem
              Ipsum."
        minLength={180}
        collapsedByDefault={false}
        expandLabel='Less'
        collapseLabel='More'
      />
      <TextExpander
        text="Lorem Ipsum is simply dummy text of the printing and typesetting industry.
              Lorem Ipsum has been the industry's standard dummy text ever since the
              1500s, when an unknown printer took a galley of type and scrambled it to
              make a type specimen book. It has survived not only five centuries, but
              also the leap into electronic typesetting, remaining essentially
              unchanged. It was popularised in the 1960s with the release of Letraset
              sheets containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of Lorem
              Ipsum."
        minLength={300}
        collapsedByDefault={true}
      />
    </div>
  );
}

function TextExpander({text=`It was popularised in the 1960s with the release of Letraset
      sheets containing Lorem Ipsum passages, and more recently with desktop
      publishing software like Aldus PageMaker including versions of Lorem
      Ipsum.`, minLength=40, collapsedByDefault=true, expandLabel="Show less", collapseLabel="Show more" }){
  const [isCollapsed, setIsCollapsed] = useState(collapsedByDefault)
  const isLong = text.length > minLength
  const displayText = !isLong ? text : isCollapsed ? text.slice(0, minLength).trim() + "..." : text;
  
  const toggle = () => setIsCollapsed(prev=>!prev)

  const showToggle = isLong

  return (
    <p>
      {displayText}

      <button
        className="toggle-button"
        style={{ color: isCollapsed ? "blue" : "red" }}
        onClick={toggle}
      >
        {showToggle && isCollapsed ? collapseLabel : expandLabel}
      </button>
    </p>
  );
}
