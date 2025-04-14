export default function Stats({ items }) {
  if (!items.length)
    return (
      <p className="stats">
        <em>Start adding some items to your packing list 🚀</em>
      </p>
    );

  const totalItems = items.length;
  const packedItems = items.filter((item) => item.packed).length;
  const percentage = Math.round((packedItems / totalItems) * 100);
  return (
    <footer className="stats">
      <em>
        {percentage === 100
          ? "You got everything packed. Ready to go ✈"
          : `You have ${totalItems} item${
              totalItems > 1 ? "s" : ""
            } on your list, ${
              packedItems > 0
                ? `and you already parked ${packedItems}(${percentage}%)`
                : " you have not packed any yet!"
            }`}
      </em>
    </footer>
  );
}