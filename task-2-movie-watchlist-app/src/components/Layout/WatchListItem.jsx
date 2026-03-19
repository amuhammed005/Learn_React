import { MdBookmarkRemove } from "react-icons/md";
import StarRating from "../common/StarRating";
import { useNavigate } from "react-router-dom";

function WatchListItem({ movie, onRemove }) {
  const navigate = useNavigate();

  return (
    <div className="overflow-hidden flex gap-4 border border-amber-500 rounded-lg hover:scale-105 transition-transform duration-300">
      <img
        onClick={() => navigate(`movie/${movie.imdbID}`)}
        src={movie.Poster}
        alt={`${movie.Title} Poster`}
        className="w-full h-72 md:h-64 object-cover cursor-pointer"
      />
      <div className="mt-4">
        <p className="text-md mb-2 cursor-pointer">{movie.Title}</p>
        <p className="mb-2">{movie.Year}</p>
        <div className="flex items-center justify-between">
          <StarRating />
          <button
            onClick={() => onRemove(movie.imdbID)}
            title="Remove from Watchlist"
            className="py-1 px-2 text-5xl font-bold rounded-lg text-amber-300 hover:text-amber-500 hover:scale-110"
          >
            <MdBookmarkRemove />
          </button>
        </div>
      </div>
    </div>
  );
}

export default WatchListItem;
