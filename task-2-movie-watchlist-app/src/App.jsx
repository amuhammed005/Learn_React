import React, { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import Navbar from "./components/Layout/Navbar";
import WatchList from "./components/Layout/WatchList";
import MovieList from "./pages/MovieList";

export default function App() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("batman");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [watchList, setWatchList] = useState(() => {
    try {
      const saved = localStorage.getItem("watchList");
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error("Failed to parse watchList from localStorage:", error);
      return [];
    }
  });

  function handleBookmarkAdd(movie) {
    const alreadyExists = watchList.some(
      (savedMovie) => savedMovie.imdbID === movie.imdbID,
    );

    if (alreadyExists) {
      toast("Movie already in watchlist.", { icon: "⚠️" });
      return;
    }

    setWatchList((prev) => [...prev, movie]);
    toast.success(`Added "${movie.Title}" to watchlist!`);
  }

  function handleRemoveBookmarked(id) {
    const movie = watchList.find((m) => m.imdbID === id);

    setWatchList((prev) => prev.filter((curMovie) => curMovie.imdbID !== id));
    toast.error(`Removed "${movie?.Title || "movie"}" from watchlist.`);
  }

  useEffect(() => {
    async function fetchMovies() {
      if (!query.trim()) {
        setMovies([]);
        setError("");
        return;
      }

      setLoading(true);
      setError("");

      try {
        const res = await fetch(
          `https://www.omdbapi.com/?apikey=6cc480a0&s=${encodeURIComponent(
            query,
          )}`,
        );

        const data = await res.json();

        if (data.Response === "False") {
          throw new Error(data.Error);
        }

        const uniqueMovies = (data.Search || []).filter(
          (movie, index, self) =>
            index === self.findIndex((m) => m.imdbID === movie.imdbID),
        );

        setMovies(uniqueMovies);
      } catch (err) {
        setError(err.message || "Something went wrong");
        setMovies([]);
      } finally {
        setLoading(false);
      }
    }

    fetchMovies();
  }, [query]);

  useEffect(() => {
    localStorage.setItem("watchList", JSON.stringify(watchList));
  }, [watchList]);

  return (
    <div className="min-h-screen bg-bg-dark">
      <Toaster position="top-center" toastOptions={{ duration: 2000 }} />

      <Navbar query={query} setQuery={setQuery} />

      <div className="py-40 md:w-3/4 mx-auto px-4">
        <MovieList
          movies={movies}
          loading={loading}
          error={error}
          onBookmarkAdd={handleBookmarkAdd}
        />

        <WatchList watchList={watchList} onRemove={handleRemoveBookmarked} />
      </div>
    </div>
  );
}
