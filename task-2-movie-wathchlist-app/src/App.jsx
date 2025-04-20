import React, { useEffect, useState } from 'react'

const dummyMovies = [
  {
    imdbID: "tt0111161",
    title: "The Shawshank Redemption",
    year: "1994",
    poster: "https://via.placeholder.com/150x220?text=Shawshank",
  },
  {
    imdbID: "tt0068646",
    title: "The Godfather",
    year: "1972",
    poster: "https://via.placeholder.com/150x220?text=Godfather",
  },
  {
    imdbID: "tt0468569",
    title: "The Dark Knight",
    year: "2008",
    poster: "https://via.placeholder.com/150x220?text=Dark+Knight",
  },
  {
    imdbID: "tt1375666",
    title: "Inception",
    year: "2010",
    poster: "https://via.placeholder.com/150x220?text=Inception",
  },
  {
    imdbID: "tt0133093",
    title: "The Matrix",
    year: "1999",
    poster: "https://via.placeholder.com/150x220?text=Matrix",
  },
];


export default function App() {
    const [movies, setMovies] = useState([]);
    const [query, setQuery] = useState("batman");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
      async function fetchMovies() {
        setLoading(true);
        setError("");

        try {
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=6cc480a0&s=${query}`
          );
          const data = await res.json();

          if (!data.Response) throw new Error(data.Error);
          setMovies(data.Search || []);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      }

      fetchMovies();
    }, [query]);



  return (
    <div className="min-h-screen bg-bg-dark">
      <Navbar query={query} setQuery={setQuery} />
      <div className="pt-40">
        <MovieList movies={movies} loading={loading} setLoading={setLoading} error={error} />
      </div>
    </div>
  );
}

function Navbar({query, setQuery}){
  return (
    <div className="w-full fixed z-10 bg-black ">
      <div className="md:w-3/4 mx-auto flex flex-col md:flex-row align-center justify-center md:justify-between p-4">
        <h1 className="text-4xl text-amber-500 mb-5 md:mb-0">
          🎬 Movie Library
        </h1>
        <SearchBar query={query} setQuery={setQuery} />
      </div>
    </div>
  );
}

function SearchBar({query, setQuery}){
  return (
    <form>
      <input type="text" value={query} onChange={(e)=>setQuery(e.target.value)} className='focus:outline-none border border-amber-500 rounded-full px-4 py-1.5 text-black text-center' placeholder='Search movie...' />
    </form>
  )
}

function MovieList({ movies, error, loading, }) {

  return (
    <>
      {loading && <p className="text-center text-white text-2xl">Loading...</p>}
      {error && <p className="text-center text-red-500 text-2xl">{error}</p>}

      {!loading && !error && movies.length === 0 && (
        <p className="text-center text-white text-4xl">
          No movies found for this search. Try something else!
        </p>
      )}

      <div className="md:w-3/4 mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </>
  );
}


function MovieCard({movie}) {
  return (
    <div className="bg-gray-700 shadow-md rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300">
      <img
        src={movie.Poster}
        alt={movie.Title}
        className="w-full h-72 md:h-64 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-1">{movie.Title}</h3>
        <p className="text-grey-900 text-sm">
          {movie.Year}
        </p>
        <div className="mt-2 text-yellow-500 font-semibold">
          ⭐ {movie.Rating}
        </div>
      </div>
    </div>
  );
}

function Watchlist() {
  return <div>Search</div>;
}

function WatchlistItem() {
  return <div>Search</div>;
}

function RatingStars() {
  return <div>Rating</div>;
}