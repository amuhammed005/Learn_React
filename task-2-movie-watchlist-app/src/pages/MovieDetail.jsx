// // import { useParams } from "react-router-dom";
// // import { useEffect, useState } from "react";
// // import Navbar from "../components/Layout/Navbar";

// // function MovieDetail() {
// //   const { id } = useParams();
// //   const [movie, setMovie] = useState(null);
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     async function fetchMovie() {
// //       try {
// //         const res = await fetch(
// //           `https://www.omdbapi.com/?apikey=6cc480a0&i=${id}`,
// //         );
// //         const data = await res.json();
// //         setMovie(data);
// //       } catch (err) {
// //         console.error(err);
// //       } finally {
// //         setLoading(false);
// //       }
// //     }

// //     fetchMovie();
// //   }, [id]);

// //   if (loading) return <p className="text-white text-center">Loading...</p>;

// //   if (!movie) return <p>No movie found</p>;

// //   return (
// //     <>

// //     <Navbar />

// //     <div className="min-h-screen text-white p-10">
// //       <div className="flex flex-col md:flex-row gap-10">
// //         <img src={movie.Poster} alt={movie.Title} className="w-72 rounded-lg" />

// //         <div>
// //           <h1 className="text-4xl font-bold mb-4">{movie.Title}</h1>
// //           <p className="mb-2">Year: {movie.Year}</p>
// //           <p className="mb-2">Genre: {movie.Genre}</p>
// //           <p className="mb-2">Actors: {movie.Actors}</p>
// //           <p className="mb-4">Plot: {movie.Plot}</p>
// //           <p className="text-yellow-400">IMDB Rating: {movie.imdbRating}</p>
// //         </div>
// //       </div>
// //     </div>
// //     </>
// //   );
// // }

// // export default MovieDetail;

// import { useParams, useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { IoArrowBack } from "react-icons/io5";
// import Navbar from "../components/Layout/Navbar";

// function MovieDetail() {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [movie, setMovie] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     async function fetchMovie() {
//       try {
//         const res = await fetch(
//           `https://www.omdbapi.com/?apikey=6cc480a0&i=${id}`,
//         );
//         const data = await res.json();
//         setMovie(data);
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchMovie();
//   }, [id]);

//   return (
//     <>
//       <Navbar query="" setQuery={() => {}} />

//       <div className="min-h-screen bg-bg-dark text-white pt-32 px-4 md:px-8">
//         <div className="max-w-5xl mx-auto">
//           <button
//             onClick={() => navigate(-1)}
//             className="mb-8 flex items-center gap-2 text-amber-400 hover:text-amber-300 text-lg"
//           >
//             <IoArrowBack className="text-2xl" />
//             Back
//           </button>

//           {loading ? (
//             <p className="text-center text-2xl">Loading...</p>
//           ) : !movie || movie.Response === "False" ? (
//             <p className="text-center text-2xl">No movie found</p>
//           ) : (
//             <div className="flex flex-col md:flex-row items-center md:items-start justify-center gap-10 bg-gray-800 rounded-2xl p-6 md:p-10 shadow-lg border border-amber-500">
//               <img
//                 src={movie.Poster}
//                 alt={movie.Title}
//                 className="w-80 md:w-96 rounded-xl object-cover shadow-lg"
//               />

//               <div className="max-w-2xl text-center md:text-left">
//                 <h1 className="text-4xl md:text-5xl font-bold mb-4 text-amber-400">
//                   {movie.Title}
//                 </h1>

//                 <p className="mb-3 text-lg">
//                   <span className="font-semibold">Year:</span> {movie.Year}
//                 </p>
//                 <p className="mb-3 text-lg">
//                   <span className="font-semibold">Genre:</span> {movie.Genre}
//                 </p>
//                 <p className="mb-3 text-lg">
//                   <span className="font-semibold">Actors:</span> {movie.Actors}
//                 </p>
//                 <p className="mb-3 text-lg">
//                   <span className="font-semibold">Director:</span>{" "}
//                   {movie.Director}
//                 </p>
//                 <p className="mb-3 text-lg">
//                   <span className="font-semibold">Runtime:</span>{" "}
//                   {movie.Runtime}
//                 </p>
//                 <p className="mb-5 text-lg leading-8">
//                   <span className="font-semibold">Plot:</span> {movie.Plot}
//                 </p>
//                 <p className="text-yellow-400 text-xl font-bold">
//                   IMDb Rating: {movie.imdbRating}
//                 </p>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// }

// export default MovieDetail;

import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import Navbar from "../components/Layout/Navbar";

function MovieDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMovie() {
      try {
        const res = await fetch(
          `https://www.omdbapi.com/?apikey=6cc480a0&i=${id}`,
        );
        const data = await res.json();
        setMovie(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchMovie();
  }, [id]);

  return (
    <>
      <Navbar query="" setQuery={() => {}} />

      <div className="min-h-screen bg-bg-dark text-white pt-32 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-amber-500 bg-gray-800 px-5 py-3 text-base md:text-lg font-medium text-amber-400 shadow-md transition-all duration-300 hover:bg-amber-500 hover:text-black hover:scale-105"
          >
            <IoArrowBack className="text-xl md:text-2xl" />
            Back
          </button>

          {loading ? (
            <p className="text-center text-2xl md:text-3xl">Loading...</p>
          ) : !movie || movie.Response === "False" ? (
            <p className="text-center text-2xl md:text-3xl">No movie found</p>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center bg-gray-800/90 border border-amber-500 rounded-3xl p-6 sm:p-8 md:p-10 lg:p-14 shadow-xl">
              <div className="flex justify-center">
                <img
                  src={movie.Poster}
                  alt={movie.Title}
                  className="w-full max-w-sm sm:max-w-md md:max-w-lg rounded-2xl object-cover shadow-2xl"
                />
              </div>

              <div className="text-center lg:text-left">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-5 text-amber-400 leading-tight">
                  {movie.Title}
                </h1>

                <div className="space-y-4 text-base sm:text-lg md:text-xl">
                  <p>
                    <span className="font-semibold text-amber-300">Year:</span>{" "}
                    {movie.Year}
                  </p>

                  <p>
                    <span className="font-semibold text-amber-300">Genre:</span>{" "}
                    {movie.Genre}
                  </p>

                  <p>
                    <span className="font-semibold text-amber-300">
                      Director:
                    </span>{" "}
                    {movie.Director}
                  </p>

                  <p>
                    <span className="font-semibold text-amber-300">
                      Actors:
                    </span>{" "}
                    {movie.Actors}
                  </p>

                  <p>
                    <span className="font-semibold text-amber-300">
                      Runtime:
                    </span>{" "}
                    {movie.Runtime}
                  </p>

                  <p>
                    <span className="font-semibold text-amber-300">
                      Language:
                    </span>{" "}
                    {movie.Language}
                  </p>

                  <p>
                    <span className="font-semibold text-amber-300">
                      Released:
                    </span>{" "}
                    {movie.Released}
                  </p>

                  <p className="leading-8 pt-2">
                    <span className="font-semibold text-amber-300">Plot:</span>{" "}
                    {movie.Plot}
                  </p>

                  <div className="pt-4">
                    <p className="text-2xl md:text-3xl font-bold text-yellow-400">
                      IMDb Rating: {movie.imdbRating}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default MovieDetail;