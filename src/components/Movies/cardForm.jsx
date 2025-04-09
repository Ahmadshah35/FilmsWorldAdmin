import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "../../style/cardForm.css";

const CardForm = () => {
  const [formData, setFormData] = useState({
    s: "", 
    page: "", 
    apikey: "", // Corrected API key
  });

  const navigate = useNavigate(); // Initialize navigation

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }; 

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const apiUrl = `https://www.omdbapi.com/?s=${encodeURIComponent(formData.s)}&page=${encodeURIComponent(formData.page)}&apikey=503e00e3`;
    
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (data.Response === "True") {
        navigate("/movies", { state: { movies: data.Search } }); // Pass data to MoviesList page
      } else {
        alert("No movies found! Try another search.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("Failed to fetch data!");
    }
  };

  return (
    <div className="card-container">
      <div className="card">
        <h2 className="card-header">Enter Movie Details</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="s"
            value={formData.s}
            onChange={handleChange}
            placeholder="Movie Name"
            className="card-input"
            required
          />
          <input
            type="text"
            name="page"
            value={formData.page}
            onChange={handleChange}
            placeholder="Page Number"
            className="card-input"
            required
          />
          <button type="submit" className="card-button">Search</button>
        </form>
      </div>
    </div>
  );
};

export default CardForm;
