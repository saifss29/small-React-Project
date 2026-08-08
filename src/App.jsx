import React, { useState } from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [movieTitle, setMovieTitle] = useState("");
  const [genre, setGenre] = useState("");
  const navigate = useNavigate();

  const handleAddMovie = () => {
    if (movieTitle === "") return;
    const newMovie = {
      title: movieTitle,
      genre: genre || "Unknown", // Default if empty
    };
    setMovies([...movies, newMovie]);
    setMovieTitle("");
    setGenre("");

    navigate("/");
  };
  const handleDeleteMovie = (indexToDelete) => {
    const updateMovies = movies.filter(
      (movie, index) => index !== indexToDelete,
    );
    setMovies(updateMovies);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-6">
      <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl shadow-2xl max-w-md w-full text-center">
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <h1 className="text-3xl font-extrabold tracking-tight text-white mb-6">
                  My Watchlist!
                </h1>
                {movies.length === 0 ? (
                  <p>Your watchlist is empty. Add a movie to get started!</p>
                ) : (
                  <ul className="space-y-3 mb-6 text-left">
                    {/* FIXED: Changed { } to ( ) for automatic return, and movie.Title to movie.title */}
                    {movies.map((movie, index) => (
                      <li
                        key={index}
                        className="flex items-center justify-between bg-slate-800 p-4 rounded-xl border border-slate-700/50"
                      >
                        {movie.title} - {movie.genre}
                        {""}
                        <button
                          onClick={() => handleDeleteMovie(index)}
                          className="bg-red-500/10 hover:bg-red-600 text-red-400 hover:text-white font-medium text-sm py-1.5 px-3 rounded-lg transition"
                        >
                          Delete
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
                <Link
                  to={"/add"}
                  className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-xl transition shadow-md w-full text-center"
                >
                  Add Movie!
                </Link>
              </div>
            }
          />
          <Route
            path="/add"
            element={
              /* FIXED: Moved props safely inside the opening tag attribute section */
              <AddMoviePage
                genre={genre}
                setGenre={setGenre}
                movieTitle={movieTitle}
                setMovieTitle={setMovieTitle}
                handleAddMovie={handleAddMovie}
              />
            }
          />
        </Routes>
      </div>
    </div>
  );
};

export default App;

const AddMoviePage = ({
  movieTitle,
  setMovieTitle,
  genre,
  setGenre,
  handleAddMovie,
}) => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6 text-center">
        Add new Movie!
      </h2>
      <input
        className="w-full bg-slate-800 border border-slate-700 text-white p-3 rounded-xl mb-4 placeholder-slate-500 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
        type="text"
        placeholder="Enter Movie Title"
        value={movieTitle}
        onChange={(e) => setMovieTitle(e.target.value)}
      />
      <input
        className="w-full bg-slate-800 border border-slate-700 text-white p-3 rounded-xl mb-4 placeholder-slate-500 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
        type="text"
        placeholder="Enter genre"
        value={genre}
        onChange={(e) => setGenre(e.target.value)}
      />
      {/* FIXED: Connected the trigger to the onClick action listener */}
      <button
        onClick={handleAddMovie}
        className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-xl transition shadow-md mt-2"
      >
        Save Movie
      </button>
      <br />
      <Link
        to={"/"}
        className="text-sm text-slate-400 hover:text-white transition underline"
      >
        Cancel and Go Back
      </Link>
    </div>
  );
};
