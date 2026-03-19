// import { MdBookmarkAdd } from "react-icons/md";
// import StarRating from "../common/StarRating";

// function MovieCard({ movie, onBookmarkAdd }) {
//   return (
//     <div className="bg-gray-700 border border-amber-500 shadow-md rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300">
//       <img
//         src={movie.Poster}
//         alt={movie.Title}
//         className="w-full h-72 md:h-64 object-cover"
//       />
//       <div className="p-4">
//         <h3 className="text-2xl font-semibold mb-1">{movie.Title}</h3>
//         <p className="text-grey-900 text-base">{movie.Year}</p>
//         <div className="flex align-center justify-between">
//           <div className="mt-2 text-yellow-500 font-semibold">
//             <StarRating />
//           </div>
//           <button
//             onClick={() => onBookmarkAdd(movie)}
//             title="Add to Watchlist"
//             className="py-1 px-2 text-5xl font-bold rounded-lg text-amber-300 hover:text-amber-500 hover:scale-110"
//           >
//             <MdBookmarkAdd />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default MovieCard;

import { MdBookmarkAdd } from "react-icons/md";
import StarRating from "../common/StarRating";
import { useNavigate } from "react-router-dom";

function MovieCard({ movie, onBookmarkAdd }) {
  const naviagte = useNavigate();

  return (
    <div className="bg-gray-700 border border-amber-500 shadow-md rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300">
      <img
        onClick={() => naviagte(`movie/${movie.imdbID}`)}
        src={movie.Poster}
        alt={movie.Title}
        className="w-full h-72 md:h-64 object-cover cursor-pointer"
      />

      <div className="p-4">
        <h3 className="text-2xl font-semibold mb-1 cursor-pointer" >
          {movie.Title}
        </h3>
        <p className="text-gray-300 text-base ">{movie.Year}</p>

        <div className="flex items-center justify-between">
          <div className="mt-2 text-yellow-500 font-semibold">
            <StarRating />
          </div>

          <button
            onClick={() => onBookmarkAdd(movie)}
            title="Add to Watchlist"
            className="py-1 px-2 text-5xl font-bold rounded-lg text-amber-300 hover:text-amber-500 hover:scale-110"
          >
            <MdBookmarkAdd />
          </button>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
