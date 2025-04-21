import React, { useEffect, useState } from 'react'
import { IoSearch } from "react-icons/io5";
import { MdBookmarkAdd, MdBookmarkRemove } from "react-icons/md";
import { FaStar } from "react-icons/fa";
import { Toaster, toast } from "react-hot-toast";

export default function App() {
    const [movies, setMovies] = useState([]);
    const [query, setQuery] = useState("batman");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    // const [watchList, setWatchedList] = useState([]);
    const [watchList, setWatchedList] = useState(() => {
      try {
        const bookMarkedLocalStorage = localStorage.getItem("watchList");
        return bookMarkedLocalStorage ? JSON.parse(bookMarkedLocalStorage) : [];
      } catch (error) {
        console.error("Failed to parse watchList from localStorage", error);
        return [];
      }
    });


    function handleBookmarkAdd(movie) {
      if (!watchList.some((savedmovie) => savedmovie.imdbID === movie.imdbID)){
        setWatchedList([...watchList, movie])
        toast.success(`Added "${movie.Title}" to watchlist!`)
      } else {
        toast("Movie already in watchlist.", { icon: "⚠️" });
      }
    }
     function handleRemoveBookmarked(id) {
      const movie = watchList.find((m) => m.imdbID === id);
      setWatchedList((watchList)=>watchList.filter((curMovie) => curMovie.imdbID !== id))
      toast.error(`Removed "${movie?.Title || "movie"}" from Watchlist.`);
     }

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

    useEffect(()=>{
      localStorage.setItem("watchList", JSON.stringify(watchList))
    }, [watchList])

    // useEffect(() => {
    //   console.log("Updated Watchlist:", watchList);
    // }, [watchList]);

  return (
    <div className="min-h-screen bg-bg-dark">
      <Toaster position="top-center" toastOptions={{ duration: 2000 }} />
      <Navbar query={query} setQuery={setQuery} />
      <div className="py-40 md:w-3/4 mx-auto px-4">
        <MovieList
          movies={movies}
          loading={loading}
          setLoading={setLoading}
          error={error}
          onBookmarkAdd={handleBookmarkAdd}
        />
        <Watchlist watchList={watchList} onRemove={handleRemoveBookmarked} />
      </div>
    </div>
  );
}

function Navbar({query, setQuery}){
  return (
    <div className="w-full fixed z-10 bg-black ">
      <div className="items-center md:w-3/4 mx-auto flex flex-col md:flex-row align-center justify-center md:justify-between p-4">
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
      <div className="relative w-full">
        {/* Search Icon */}
        <span className="absolute inset-y-5 left-3 flex items-center text-amber-500 text-3xl">
          <IoSearch />
        </span>

        {/* Input Field */}
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full bg-transparent border border-amber-500 rounded-full pl-14 pr-4 py-2 text-gray-200 focus:outline-none text-md md:text-xl placeholder:text-gray-400"
          placeholder="Search movie..."
        />
      </div>
    </form>
  );
}

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

      {movies.length !== 0 && (
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


function MovieCard({movie, onBookmarkAdd}) {

  return (
    <div className="bg-gray-700 border border-amber-500 shadow-md rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300">
      <img
        src={movie.Poster}
        alt={movie.Title}
        className="w-full h-72 md:h-64 object-cover"
      />
      <div className="p-4">
        <h3 className="text-2xl font-semibold mb-1">{movie.Title}</h3>
        <p className="text-grey-900 text-base">{movie.Year}</p>
        <div className="flex align-center justify-between">
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

function Watchlist({watchList, onRemove}) {

  return (
    <div>
      
        <h2 className="py-10 text-4xl text-amber-400">Watch List</h2>
      {watchList.length === 0 &&
        <p>No movie in watch list</p>}
      
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {watchList.map((movie) => (
          <WatchlistItem key={movie.imdbID} movie={movie} onRemove={onRemove} />
        ))}
      </div>
    </div>
  );
}

function WatchlistItem({movie, onRemove}) {
 
  
  return (
    <div className="overflow-hidden flex gap-3 border border-amber-500 rounded-lg hover:scale-105 transition-transform duration-300">
      <img
        src={movie.Poster}
        alt={`${movie.title} Poster`}
        className="w-full h-72 md:h-64 object-cover "
      />
      <div>
        <p className="text-md mb-2">{movie.Title}</p>
        <p className="mb-2">{movie.Year}</p>
        <div className="flex items-center justify-between">
          <StarRating />
          <button
            onClick={() => onRemove(movie.imdbID)}
            title='Remove from Watchlist'
            className="py-1 px-2 text-5xl font-bold rounded-lg text-amber-300 hover:text-amber-500 hover:scale-110"
          >
            <MdBookmarkRemove />
          </button>
        </div>
      </div>
    </div>
  );
}


function StarRating({maxRating = 5, size= 18, onSetRating}){
  const [hovered, setHovered] = useState(0)
  const [selected, setSelected] = useState(0)
  
  function handleRate(rating){
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


