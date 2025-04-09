import { useLocation } from "react-router-dom";
import "../../style/EpisodePage.css"; // Import the CSS file

const EpisodePage = () => {
  const { state } = useLocation();
  const { season, episodes, imdbID, seasonId } = state || {}; // ✅ Extracting SeasonId

  if (!season || !episodes || !imdbID) {
    return <h1 className="error">Episode data not found.</h1>;
  }

  // Function to add an episode
  const addEpisode = async (episode) => {
    if (!seasonId) {
      alert("Season ID not available. Please add the season first.");
      return;
    }

    const payload = {
      SeasonId: seasonId,
      episodeName: episode.title,
      episodeNumber: episode.episodeNumber,
      episodeURL: `https://vidsrc.xyz/embed/tv?imdb=${imdbID}&season=${season}&episode=${episode.episodeNumber}`,
    };

    try {
      const response = await fetch("https://appsdemo.pro/FilmsWorld-backend/api/user/addEpisode", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      console.log("Add Episode Response:", result);

      if (!result.success) {
        alert(result.message || "Failed to add episode.");
        return;
      }

      alert(result.message || "Episode added successfully!");
    } catch (error) {
      console.error("Error adding episode:", error);
      alert("An error occurred while adding the episode.");
    }
  };

  return (
    <div className="episode-container">
      <h1 className="title">Season {season} - Episodes</h1>
      <div className="episode-grid">
        {episodes.map((ep, index) => (
          <div key={index} className="episode-card">
            <h2>{ep.title}</h2>
            <p>Episode {ep.episodeNumber}</p>
            <a
              href={`https://vidsrc.xyz/embed/tv?imdb=${imdbID}&season=${season}&episode=${ep.episodeNumber}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="watch-btn">Watch Now</button>
            </a>
            <button className="watch-btn" onClick={() => addEpisode(ep)}>
              Add Episode
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EpisodePage;
