import React, { useEffect, useState } from "react";
import "../style/TrendingMovies.css"; // Import your custom CSS

const TrendingMovies = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch trending movies data from the API
        fetch("https://appsdemo.pro/FilmsWorld-backend/api/user/getAllMovies") // Ensure this is the correct API
            .then((response) => response.json())
            .then((data) => {
                if (data?.data) {
                    // Sort movies to show trending ones first
                    const sortedMovies = data.data.sort((a, b) => b.trending - a.trending);
                    setMovies(sortedMovies);
                }
            })
            .catch((err) => {
                setError("Error fetching trending movies.");
                console.error(err);
            })
            .finally(() => setLoading(false));
    }, []);

    const handleSetTrending = (movieId) => {
        // Call the setTrending API with the movie ID as the payload
        fetch("https://appsdemo.pro/FilmsWorld-backend/api/user/setTrending", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: movieId }), // Send the movie _id in the payload
        })
            .then((response) => response.json())
            .then((data) => {
                if (data?.success) {
                    alert("Movie marked as trending!");
                } else {
                    alert("Failed to mark movie as trending.");
                }
            })
            .catch((err) => {
                alert("Error marking movie as trending.");
                console.error(err);
            });
    };

    if (loading) {
        return <div>Loading Trending Movies...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="trending-movies-page">
            {/* <h1>Trending Movies</h1> */}
            <div className="trending-header">
                <h1>Trending Movies</h1>
                <span className="movie-count">Total Movies: {movies.length}</span>
            </div>

            <div className="movies-list">
                {movies.length > 0 ? (
                    movies.map((movie) => (
                        <div key={movie._id} className="movie-row">
                            <div className="movie-info">
                                <strong>Title:</strong> {movie.movieTitle}
                            </div>
                            <div className="movie-info">
                                <strong>Year:</strong> {movie.year}
                            </div>
                            <div className="movie-info">
                                <strong>Genre:</strong> {movie.genre.join(", ")}
                            </div>
                            <div className="movie-info">
                                <strong>Duration:</strong> {movie.duration}
                            </div>
                            <div className="movie-info">
                                <strong>Trending:</strong> {movie.trending ? "Yes" : "No"}
                            </div>
                            <div>
                                <button onClick={() => handleSetTrending(movie._id)}>
                                    Set as Trending
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No Trending Movies Found!</p>
                )}
            </div>
        </div>
    );
};

export default TrendingMovies;
