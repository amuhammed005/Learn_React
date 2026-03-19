// import MovieCard from "../components/Layout/MovieCard";

// function MovieList({ movies, error, loading, onBookmarkAdd }) {

//   return (
//     <>
//       {loading && <p className="text-center text-white text-3xl">Loading...</p>}
//       {error && <p className="text-center text-red-500 text-3xl">{error}</p>}

//       {!loading && !error && movies.length === 0 && (
//         <p className="text-center text-white text-3xl">
//           No movies found for this search. Try something else!
//         </p>
//       )}

//       {movies.length !== 0 && (
//         <h2 className="py-10 text-4xl text-amber-400">Search Results</h2>
//       )}

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-16">
//         {movies.map((movie) => (
//           <MovieCard
//             key={movie.imdbID}
//             movie={movie}
//             onBookmarkAdd={onBookmarkAdd}
//           />
//         ))}
//       </div>
//     </>
//   );
// }

// export default MovieList;

import MovieCard from "../components/Layout/MovieCard";

function MovieList({ movies, error, loading, onBookmarkAdd }) {
  return (
    <>
      {loading && <p className="text-center text-white text-3xl">Loading...</p>}

      {error && <p className="text-center text-red-500 text-3xl">{error}</p>}

      {!loading && !error && movies.length === 0 && (
        <p className="text-center text-white text-3xl">
          No movies found for this search. Try something else!
        </p>
      )}

      {!loading && !error && movies.length > 0 && (
        <h2 className="py-10 text-4xl text-amber-400">Search Results</h2>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-16">
        {movies.map((movie) => (
          <MovieCard
            key={movie.imdbID}
            movie={movie}
            onBookmarkAdd={onBookmarkAdd}
          />
        ))}
      </div>
    </>
  );
}

export default MovieList;