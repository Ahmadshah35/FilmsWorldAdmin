import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home"; // Import Home Page
import CardForm from "./components/Movies/cardForm";
import MoviesList from "./components/Movies/MovieList";
import MovieDetail from "./components/Movies/MovieDetail";
import WatchMovie from "./components/Movies/WatchMovie";
import SeriesForm from "./components/Series/SeriesForm";
import SeriesList from "./components/Series/SeriesList";
import SeriesDetails from "./components/Series/SeriesDetail"; // Import SeriesDetails
import SeasonPage from "./components/Series/SeasonPage";
import EpisodePage from "./components/Series/EpisodePage";
import Users from "./components/users";  // Import your Users Page
import TrendingMovies from "./components/TrendingMovies"; 
import TrendingSeries from "./components/TrendingSeries";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} /> {/* Set Home Page as Main */}
        <Route path="/card-form" element={<CardForm />} />
        <Route path="/movies" element={<MoviesList />} />
        <Route path="/movie/:imdbID" element={<MovieDetail />} />{" "}
        <Route path="/users" element={<Users />} />
        <Route path="/trending-movies" element={<TrendingMovies />} />
        <Route path="/trending-series" element={<TrendingSeries />} />

        {/* Admin Page */}
        <Route path="/watch/:imdbID" element={<WatchMovie />} />{" "}
        {/* User Page */}
        <Route path="/SeriesForm" element={<SeriesForm />} />
        <Route path="/series-list" element={<SeriesList />} />
        <Route
          path="/series-details/:imdbID"
          element={<SeriesDetails />}
        />{" "}
        {/* New Route */}
        <Route path="/season/:imdbID" element={<SeasonPage />} />
        <Route
          path="/season/:imdbID/:season/episodes"
          element={<EpisodePage />}
        />
      </Routes>
      
    </Router>
  );
}

export default App;

// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import SeriesForm from "./components/Series/SeriesForm";
// import SeriesList from "./components/Series/SeriesList";
// import SeriesDetails from "./components/Series/SeriesDetail"; // Import SeriesDetails
// import SeasonPage from "./components/Series/SeasonPage";
// import EpisodePage from "./components/Series/EpisodePage";

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<SeriesForm />} />
//         <Route path="/series-list" element={<SeriesList />} />
//         <Route path="/series-details/:imdbID" element={<SeriesDetails />} /> {/* New Route */}
//         <Route path="/season/:imdbID" element={<SeasonPage />} />
//         <Route path="/season/:imdbID/:season/episodes" element={<EpisodePage />} />

//       </Routes>
//     </Router>
//   );
// }

// export default App;
