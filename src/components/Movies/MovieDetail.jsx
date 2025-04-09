import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../../style/movieDetail.css";

const MovieDetail = () => {
  const { imdbID } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const apiURL = `https://www.omdbapi.com/?i=${imdbID}&apikey=503e00e3`;
        const response = await fetch(apiURL);
        const data = await response.json();
        setMovie(data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchMovieDetails();
  }, [imdbID]);

  const handleAddMovie = async () => {
    if (!movie) return;

    setLoading(true);
    try {
      const response = await fetch("https://appsdemo.pro/FilmsWorld-backend/api/user/addMovie", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
            movieTitle: movie.Title,
            year: movie.Year,
            genre: movie.Genre,
            releaseDate: movie.Released,
            duration: movie.Runtime,
            directors: movie.Director,
            actors: movie.Actors,
            plot: movie.Plot,
            rating: movie.imdbRating,
            imdbId: movie.imdbID,
            type: movie.Type,
            country: movie.Country,
            poster: movie.Poster,
        }),
      });

      const result = await response.json();
      if (response.ok) {
        alert("Movie added successfully!");
      } else {
        alert(`Failed to add movie: ${result.message}`);
      }
    } catch (error) {
      console.error("Error adding movie:", error);
      alert("Failed to add movie!");
    }
    setLoading(false);
  };

  if (!movie) {
    return <p>Loading...</p>;
  }

  return (
    <div className="movie-detail-page">
      <div className="movie-detail-container">
        {/* Left Side: Movie Poster */}
        <div className="movie-poster">
          <img src={movie.Poster} alt={movie.Title} />
        </div>

        {/* Right Side: Movie Details */}
        <div className="movie-info">
          <h2>{movie.Title} ({movie.Year})</h2>
          <p><strong>Genre:</strong> {movie.Genre}</p>
          <p><strong>Release Date:</strong> {movie.Released}</p>
          <p><strong>Duration:</strong> {movie.Runtime}</p>
          <p><strong>Director:</strong> {movie.Director}</p>
          <p><strong>Actors:</strong> {movie.Actors}</p>
          <p><strong>Plot:</strong> {movie.Plot}</p>
          <p><strong>IMDB Rating:</strong> {movie.imdbRating}</p>
          <p><strong>Type:</strong> {movie.Type}</p>
          <p><strong>Country:</strong> {movie.Country}</p>
          <p><strong>ImdbID:</strong> {imdbID}</p>
          

          {/* Add Movie Button Inside the Card */}
          <div className="button-container">
            <button className="add-movie-btn" onClick={handleAddMovie} disabled={loading}>
              {loading ? "Adding..." : "Add Movie"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
