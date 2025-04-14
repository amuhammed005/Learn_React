import { useEffect, useState } from "react";
import Item from "./Item";

export default function PackingList({
  items,
  onTogglePacked,
  onDelete,
  setItems,
  onClearStorage,
}) {
  const [sortBy, setSortBy] = useState(() => {
    return localStorage.getItem("sortBy") || "input";
  });

  useEffect(() => {
    localStorage.setItem("sortBy", sortBy);
  }, [sortBy]);

  let sortedItems;
  if (sortBy === "input") sortedItems = items;
  if (sortBy === "description") {
    sortedItems = [...items].sort((a, b) =>
      a.description.localeCompare(b.description)
    );
  }
  if (sortBy === "packed") {
    sortedItems = [...items].sort(
      (a, b) => Number(a.packed) - Number(b.packed)
    );
  }

  function handleClearList() {
    const confirmClear = window.confirm(
      "Are you sure you want to clear all list?"
    );
    if (confirmClear) setItems([]);
  }

  function handleExportList() {
    const fileData = JSON.stringify(items, null, 2);
    const blob = new Blob([fileData], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "packing-list.json";
    link.click();
  }

  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <Item
            item={item}
            key={item.id}
            onDelete={onDelete}
            onTogglePacked={onTogglePacked}
          />
        ))}
      </ul>
      <div>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by packed status</option>
        </select>
        {items.length > 0 && (
          <>
            {/* <button onClick={handleClearList}>Clear List</button> */}
            <button className="btn clear-btn" onClick={handleClearList}>
              🗑️ Clear List
            </button>
            <button className="btn export-btn" onClick={handleExportList}>
              📄 Export List
            </button>
            <button className="btn clear-storage" onClick={onClearStorage}>
              Clear Storage
            </button>
          </>
        )}
      </div>
    </div>
  );
}
