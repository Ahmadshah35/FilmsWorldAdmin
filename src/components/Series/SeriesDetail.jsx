import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../../style/movieDetail.css";

const SeriesDetails = () => {
  const { imdbID } = useParams();
  const navigate = useNavigate();
  const [series, setSeries] = useState(null);
  const [seriesId, setSeriesId] = useState(null); // Store seriesId (if added)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const goToSeasonPage = () => {
    navigate(`/season/${imdbID}`, { state: { title: series.Title, seriesId } });
  };

  const sendSeriesData = async () => {
    const payload = {
      seriesTitle: series.Title,
      year: series.Year,
      genre: series.Genre,
      releaseDate: series.Released,
      duration: series.Runtime,
      directors: series.Writer,
      actors: series.Actors,
      plot: series.Plot,
      rating: series.imdbRating,
      imdbId: imdbID,
      type: series.Type,
      country: series.Country,
      poster: series.Poster,
    };

    console.log("Payload:", payload);

    try {
      const response = await fetch("https://appsdemo.pro/FilmsWorld-backend/api/user/addSeries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      const fetchedSeriesId = result.data._id; // Extract `seriesId`
      setSeriesId(fetchedSeriesId); // Store `seriesId`
      console.log("Series ID stored:", fetchedSeriesId);
      alert(result.message || "Series added successfully!");

      // if (!result.success) {
      //   alert(result.message); // Example: "Series Already Exist"
      //   return;
      // }

    } catch (error) {
      alert("Failed to submit data.");
    }
  };

  useEffect(() => {
    fetch(`https://www.omdbapi.com/?apikey=503e00e3&i=${imdbID}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.Response === "True") {
          setSeries(data);
        } else {
          setError(data.Error);
        }
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch series details.");
        setLoading(false);
      });
  }, [imdbID]);

  if (loading) return <p className="loading-text">Loading...</p>;
  if (error) return <p className="error-text">{error}</p>;

  return (
    <div className="movie-detail-page">
      <div className="movie-detail-container">
        <div className="movie-poster">
          <img src={series.Poster} alt={series.Title} />
        </div>
        <div className="movie-info">
          <h2>{series.Title}</h2>
          <p><strong>Year:</strong> {series.Year}</p>
          <p><strong>Released:</strong> {series.Released}</p>
          <p><strong>Genre:</strong> {series.Genre}</p>
          <p><strong>Writer:</strong> {series.Writer}</p>
          <p><strong>Actors:</strong> {series.Actors}</p>
          <p><strong>ImdbId:</strong> {imdbID}</p>
          <p><strong>Type:</strong> {series.Type}</p>
          <p><strong>Country:</strong> {series.Country}</p>
          <p><strong>IMDB Rating:</strong> {series.imdbRating}</p>

          <div className="button-container">
            <button 
              className="watch-movie-btn" 
              onClick={sendSeriesData}>
              Add Series 
            </button>
            <button 
              className="watch-movie-btn" 
              onClick={goToSeasonPage}>
              Explore Seasons
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeriesDetails;
