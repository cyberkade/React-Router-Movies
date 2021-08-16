import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Route, Switch } from 'react-router-dom';
import SavedList from './Movies/SavedList';
import MovieList from './Movies/MovieList';
import Movie from './Movies/Movie';

export default function App () {
  const [saved, setSaved] = useState([]); // Stretch: the ids of "saved" movies
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    const getMovies = () => {
      axios
        .get('http://localhost:5000/api/movies') // Study this endpoint with Postman
        .then(response => {
          // Study this response with a breakpoint or log statements
          setMovieList(response.data)
          console.log(response.data)
        })
        .catch(error => {
          console.error('Server Error', error);
        });
    }
    getMovies();
  }, []);

  const addToSavedList = movie => {
      if(saved.includes(movie.title)){
        return null;
      } else {
        setSaved([...saved, movie.title]);
        console.log(saved);
      }
    // This is stretch. Prevent the same movie from being "saved" more than once
  };

  return (
    <div>
      <SavedList list={saved} />

      <Switch>
        <Route exact path="/">
          <MovieList movies={movieList}/>
        </Route>
        <Route path="/movies/:id">
          <Movie addToSavedList={addToSavedList} />
        </Route>
      </Switch>
    </div>
  );
}
