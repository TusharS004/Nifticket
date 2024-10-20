import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const tmdbApiKey = process.env.REACT_APP_TMDB_API_KEY; // TMDB API Key
const tmdbApiUrl = "https://api.themoviedb.org/3";

const MovieDetails = () => {
  const { imdbID } = useParams(); // Get imdbID from URL params
  const [movieDetails, setMovieDetails] = useState(null);
  const [tmdbID, setTmdbID] = useState(null); // State for TMDB ID

  useEffect(() => {
    // Fetch the TMDB ID using the IMDb ID
    const fetchTmdbID = async () => {
      try {
        const response = await axios.get(
          `${tmdbApiUrl}/find/${imdbID}?api_key=${tmdbApiKey}&external_source=imdb_id`
        );
        if (response.data.movie_results && response.data.movie_results.length > 0) {
          const fetchedTmdbID = response.data.movie_results[0].id; // Get TMDB ID
          setTmdbID(fetchedTmdbID); // Store TMDB ID in state
        } else {
          console.error("No TMDB ID found for this movie.");
        }
      } catch (error) {
        console.error("Error fetching TMDB ID:", error);
      }
    };

    fetchTmdbID();
  }, [imdbID]);

  useEffect(() => {
    if (tmdbID) {
      // Fetch movie details by TMDB ID
      const fetchMovieDetails = async () => {
        try {
          const response = await axios.get(
            `${tmdbApiUrl}/movie/${tmdbID}?api_key=${tmdbApiKey}`
          );
          setMovieDetails(response.data); // Store movie details in state
        } catch (error) {
          console.error("Error fetching movie details:", error);
        }
      };

      fetchMovieDetails();
    }
  }, [tmdbID]); // Fetch movie details after getting TMDB ID

  if (!movieDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">{movieDetails.title}</h1>
      <img
        src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
        alt={movieDetails.title}
        className="my-4"
      />
      <p>{movieDetails.overview}</p>
      <p>Release Date: {movieDetails.release_date}</p>
      <p>Rating: {movieDetails.vote_average}/10</p>
    </div>
  );
};

export default MovieDetails;
