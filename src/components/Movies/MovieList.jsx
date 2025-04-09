import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../../style/movieList.css";

const MoviesList = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const movies = location.state?.movies || [];

  // Function to handle movie click
  const handleMovieClick = async (imdbID) => {
    navigate(`/movie/${imdbID}`); // Navigate to MovieDetail page
  };

  return (
    <div className="movies-wrapper">
      <div className="movies-container">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <div
              className="movie-card"
              key={movie.imdbID}
              onClick={() => handleMovieClick(movie.imdbID)}
              style={{ cursor: "pointer" }} // Indicate clickable
            >
              <img src={movie.Poster} alt={movie.Title} />
              <h3>{movie.Title}</h3>
              <p>{movie.Year}</p>
            </div>
          ))
        ) : (
          <p style={{ color: "white" }}>No movies found.</p>
        )}
      </div>
    </div>
  );
};

export default MoviesList;
