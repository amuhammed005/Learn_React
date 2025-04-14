export default function Item({ item, onTogglePacked, onDelete }) {
  return (
    <li>
      <input
        type="checkbox"
        checked={item.packed}
        onChange={() => onTogglePacked(item.id)}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDelete(item.id)}>❌</button>
    </li>
  );
}