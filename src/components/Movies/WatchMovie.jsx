import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../../style/movieDetail.css";

const WatchMovie = () => {
  const { imdbID } = useParams();
  const [movie, setMovie] = useState(null);
  const [movieUrl, setMovieUrl] = useState(null);

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

    const fetchMovieUrl = async () => {
      try {
        const urlAPI = `https://vidsrc.xyz/embed/movie/${imdbID}`; // Replace with actual API returning HTML
        const response = await fetch(urlAPI);
        const htmlText = await response.text(); // Get HTML response

        // Parse HTML in the frontend using DOMParser
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlText, "text/html");

        // Extract movie URL (adjust selector based on actual HTML structure)
        const iframe = doc.querySelector("iframe");
        const video = doc.querySelector("video");

        const extractedUrl = iframe?.src || video?.src; // Get iframe/video src if available

        if (extractedUrl) {
            console.log("URL : ", extractedUrl);
          setMovieUrl(extractedUrl);
        } else {
          console.warn("Movie URL not found in HTML response");
        }
      } catch (error) {
        console.error("Error fetching movie URL:", error);
      }
    };

    fetchMovieDetails();
    fetchMovieUrl(); // Fetch and extract the movie URL
  }, [imdbID]);

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

          {/* Watch Movie Button */}
          {movieUrl ? (
            <a href={movieUrl} target="_blank" rel="noopener noreferrer">
              <button className="watch-movie-btn">Watch Movie</button>
            </a>
          ) : (
            <button className="watch-movie-btn" disabled>Loading...</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default WatchMovie;
