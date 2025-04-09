import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../style/home.css";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [hollywoodMovies, setHollywoodMovies] = useState([]);
  const [series, setSeries] = useState([]);
  const [showBannerPopup, setShowBannerPopup] = useState(false);
  const [bannerImage, setBannerImage] = useState(null);
  const navigate = useNavigate();
  const [showTrendingPopup, setShowTrendingPopup] = useState(false);


  useEffect(() => {
    fetch("https://appsdemo.pro/FilmsWorld-backend/api/user/getAllMovies")
      .then((response) => response.json())
      .then((data) => {
        if (data?.data) {
          const filteredMovies = data.data.filter((movie) =>
            movie.genre.some((g) => g.toLowerCase().includes("action"))
          );
          setHollywoodMovies(filteredMovies.slice(0, 8));
        }
      })
      .catch((error) => console.error("Error fetching movies:", error));
  }, []);

  useEffect(() => {
    fetch("https://appsdemo.pro/FilmsWorld-backend/api/user/getAllSeries")
      .then((response) => response.json())
      .then((data) => {
        if (data?.data) {
          setSeries(data.data.slice(0, 8));
        }
      })
      .catch((error) => console.error("Error fetching series:", error));
  }, []);

  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate("/movies", { state: { query: searchTerm } });
    }
  };

  const handleAddBanner = () => {
    if (!bannerImage) {
      alert("Please select an image first!");
      return;
    }

    const formData = new FormData();
    formData.append("Banner", bannerImage);

    fetch("https://appsdemo.pro/FilmsWorld-backend/api/user/addBannerImage", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert("Banner added successfully!");
          setShowBannerPopup(false);
          setBannerImage(null);
        } else {
          alert("Failed to add banner: " + data.message);
        }
      })
      .catch((error) => console.error("Error adding banner:", error));
  };

  const handleDeleteMovie = (movieId) => {
    fetch(`https://appsdemo.pro/FilmsWorld-backend/api/user/DeleteMovie?movieId=${movieId}`, {
      method: "POST",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert("Movie deleted successfully!");
          setHollywoodMovies((prevMovies) =>
            prevMovies.filter((movie) => movie._id !== movieId)
          );
        } else {
          alert("Failed to delete movie: " + data.message);
        }
      })
      .catch((error) => console.error("Error deleting movie:", error));
  };

  const handleDeleteSeries = (seriesId) => {
    fetch(`https://appsdemo.pro/FilmsWorld-backend/api/user/deletSeries?SeriesId=${seriesId}`, {
      method: "POST",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert("Series deleted successfully!");
          setSeries((prevSeries) =>
            prevSeries.filter((serie) => serie._id !== seriesId)
          );
        } else {
          alert("Failed to delete series: " + data.message);
        }
      })
      .catch((error) => console.error("Error deleting series:", error));
  };



  return (
    <div className="home-page">
      <header className="home-header">
        <div className="header-content">
          <h1>🎬 Movie Explorer</h1>
        </div>

        <div className="search-and-buttons">
          <div className="category-buttons">
            <button onClick={() => navigate("/card-form")}>Add Movies</button>
            <button onClick={() => navigate("/SeriesForm")}>Add Series</button>
            <button onClick={() => setShowBannerPopup(true)}>Add Banner</button>
            <button onClick={() => navigate("/users")}>Users</button>
            <button onClick={() => setShowTrendingPopup(true)}>Trending</button>
          </div>

          <div className="search-bar">
            <input
              type="text"
              placeholder="Search for a movie..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button onClick={handleSearch}>🔍</button>
          </div>
        </div>
      </header>

      <section className="Heading1">
        <h2>All Movies</h2>
      </section>
      <section className="home-grid">
        {hollywoodMovies.map((movie) => (
          <div key={movie._id} className="home-card">
            <img src={movie.poster} alt={movie.title} />
            <h3>{movie.movieTitle}</h3>
            <button className="del-btn" onClick={() => handleDeleteMovie(movie._id)}>Delete</button>
          </div>
        ))}
      </section>


      <br />

      <section>
        <h2>All Series</h2>
      </section>
      <section className="home-grid2">
        {series.map((serie) => (
          <div key={serie._id} className="home-card">
            <img src={serie.poster} alt={serie.title} />
            <h3>{serie.seriesTitle}</h3>
            <button className="del-btn" onClick={() => handleDeleteSeries(serie._id)}>Delete</button>
          </div>
        ))}
      </section>

      {/* Trending Popup */}
      {showTrendingPopup && (
        <div className="popup">
          <div className="popup-content">
            <h2>Trending Options</h2>
            <div className="trending-popup-buttons">
            <button onClick={() => navigate("/trending-movies")}>Trending Movies</button>
            <button onClick={() => navigate("/trending-series")}>Trending Series</button>
            </div>
            <div className="category-buttons">
            <button onClick={() => setShowTrendingPopup(false)}>Close</button>
            </div>
          </div>
        </div>
      )}

      {/* Banner Upload Popup */}
      {showBannerPopup && (
        <div className="popup">
          <div className="popup-content">
            <h2>Upload Banner</h2>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setBannerImage(e.target.files[0])}
            />
            <div className="popup-buttons">
              <button onClick={handleAddBanner}>Upload</button>
              <button onClick={() => setShowBannerPopup(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
