import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import "../../style/SeasonPage.css"; // Import the CSS file

const SeasonPage = () => {
  const { imdbID } = useParams();
  const [seasons, setSeasons] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { state } = useLocation();

  // Get the seriesId from the state (if available)
  const seriesId = state?.seriesId;

  // Store the added season IDs
  const [seasonIds, setSeasonIds] = useState({});

  useEffect(() => {
    const fetchSeasons = async () => {
      try {
        const proxyUrl = "https://api.allorigins.win/raw?url=";
        const targetUrl = `https://vidsrc.xyz/embed/tv?imdb=${imdbID}`;

        const response = await fetch(proxyUrl + encodeURIComponent(targetUrl));
        const html = await response.text();

        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");

        // Extract episodes
        const episodeElements = doc.querySelectorAll(".ep");

        // Group episodes by season
        const seasonData = {};
        episodeElements.forEach((ep) => {
          const season = ep.getAttribute("data-s");
          if (!seasonData[season]) {
            seasonData[season] = [];
          }
          seasonData[season].push({
            episodeNumber: ep.getAttribute("data-e"),
            title: ep.textContent.trim(),
            iframeUrl: ep.getAttribute("data-iframe"),
          });
        });

        setSeasons(Object.entries(seasonData).map(([season, episodes]) => ({
          season,
          episodes,
        })));
      } catch (error) {
        console.error("Error fetching seasons:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSeasons();
  }, [imdbID]);

  // Function to add a season via API
  const addSeason = async (seasonNumber) => {
    if (!seriesId) {
      alert("Series ID not available. Please add the series first.");
      return;
    }

    const payload = {
      seriesId,
      seasonName: `Season ${seasonNumber}`,
      seasonNumber,
    };

    try {
      const response = await fetch("https://appsdemo.pro/FilmsWorld-backend/api/user/addSeason", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      console.log("Payload sent to API:", payload);

      const result = await response.json();
      console.log("first", result)
      
      // console.log("first :", result);
      const seasonId = result.data._id; // Get the SeasonId from response
      console.log("SeasonId received:", seasonId);

      setSeasonIds((prev) => ({
        ...prev,
        [seasonNumber]: seasonId,
      }));

      alert(result.message, result.data || "Season added successfully!");
      if (!result.success) {
        alert(result.message);
        return;
      }
    } catch (error) {
      alert("Failed to add season.");
    }
  };

  return (
    <div className="season-container">
      <h1 className="season-header">{state?.title}</h1>
      {loading ? <p>Loading seasons...</p> : null}
      <div className="season-grid">
        {seasons.map(({ season, episodes }) => (
          <div key={season} className="season-card">
            <h2>Season {season}</h2>
            <button
              className="season-button"
              onClick={() =>
                navigate(`/season/${imdbID}/${season}/episodes`, {
                  state: { season, episodes, imdbID, seasonId: seasonIds[season] }, // Pass SeasonId
                })
              }
            >
              See Episodes ({episodes.length})
            </button>
            <button
              className="season-button"
              onClick={() => addSeason(season)}
            >
              Add Season
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SeasonPage;
