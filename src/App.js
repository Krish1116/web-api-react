import React, { useState } from "react";

import MoviesList from "./component/MovieList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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

  async function fetchMovieHandler() {
    setIsLoading(true);
    const res = await fetch("https://swapi.dev/api/films");
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
  }
  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMovieHandler}>Fetch Movies</button>
      </section>
      <section>
        {isLoading && <h3 className="loading">Loading...</h3>}
        <MoviesList movies={movies} />
      </section>
    </React.Fragment>
  );
}

export default App;
