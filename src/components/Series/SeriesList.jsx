import { useLocation, useNavigate } from "react-router-dom";
import "../../style/movieList.css";

const SeriesList = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const series = location.state?.series || [];

  const handleClick = (imdbID) => {
    navigate(`/series-details/${imdbID}`); // Navigate to details page
  };

  return (
    <div className="movies-wrapper">
      <div className="movies-container">
        {series.length > 0 ? (
          series.map((item) => (
            <div key={item.imdbID} className="movie-card" onClick={() => handleClick(item.imdbID)}>
              <img src={item.Poster} alt={item.Title} />
              <h3>{item.Title}</h3>
              <p>{item.Year}</p>
            </div>
          ))
        ) : (
          <p style={{ color: "white" }}>No series found.</p>
        )}
      </div>
    </div>
  );
};

export default SeriesList;
