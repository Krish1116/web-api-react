import React, { useState, useEffect } from "react";

import MoviesList from "./component/MovieList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [retryTimeoutId, setRetryTimeoutId] = useState(null);

  // function fetchMovieHandler() {
  // setIsLoading(true);
  // fetch("https://swapi.dev/api/films")
  //   .then((res) => {
  //     return res.json();
  //   })
  //   .then((data) => {
  //     const transformedMovie = data.results.map((movieData) => {
  //       return {
  //         id: movieData.episode_id,
  //         title: movieData.title,
  //         openingText: movieData.opening_crawl,
  //         releaseDate: movieData.release_date,
  //       };
  //     });
  //     setMovies(transformedMovie);
  //     setIsLoading(false);
  //   });
  // }

  useEffect(() => {
    // Clear the retry timeout when the component unmounts
    return () => {
      clearTimeout(retryTimeoutId);
    };
  }, [retryTimeoutId]);

  async function fetchMovies() {
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch("https://swapi.dev/api/films");

      if (!res.ok) {
        throw new Error("Something went wrong....Retrying");
      }

      const data = await res.json();

      const transformedMovie = data.results.map((movieData) => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseDate: movieData.release_date,
        };
      });

      setMovies(transformedMovie);
      setIsLoading(false);
    } catch (error) {
      setError(error.message);
      setIsLoading(false);

      // Retry the fetch after a 5-second interval
      const timeoutId = setTimeout(() => {
        fetchMovies();
      }, 5000);

      setRetryTimeoutId(timeoutId);
    }
  }

  function cancelRetry() {
    clearTimeout(retryTimeoutId);
  }

  let content = <p className="loading">Found no movies</p>;

  if (movies.length > 0) {
    content = <MoviesList movies={movies} />;
  }

  if (error) {
    content = (
      <React.Fragment>
        <p>{error}</p>
        <button onClick={fetchMovies}>Retry</button>
        <button onClick={cancelRetry}>Cancel</button>
      </React.Fragment>
    );
  }

  if (isLoading) {
    content = <p className="loading">Loading...</p>;
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMovies}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;
