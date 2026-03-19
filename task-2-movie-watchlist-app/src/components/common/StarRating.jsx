import { useState } from "react";
import { FaStar } from "react-icons/fa";

function StarRating({ maxRating = 5, size = 18, onSetRating }) {
  const [hovered, setHovered] = useState(0);
  const [selected, setSelected] = useState(0);

  function handleRate(rating) {
    setSelected(rating);
    onSetRating?.(rating);
  }

  return (
    <div className="flex space-x-1">
      {Array.from({ length: maxRating }, (_, i) => (
        <FaStar
          key={i}
          size={size}
          title={`Rate ${i + 1} star${i > 0 ? "s" : ""}`}
          className={`cursor-pointer transition-colors duration-200 ${
            (hovered || selected) > i ? "text-yellow-400" : "text-gray-400"
          }`}
          onClick={() => handleRate(i + 1)}
          onMouseEnter={() => setHovered(i + 1)}
          onMouseLeave={() => setHovered(0)}
        />
      ))}
    </div>
  );
}

export default StarRating;