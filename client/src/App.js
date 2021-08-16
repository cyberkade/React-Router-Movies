import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Route, Switch } from 'react-router-dom';
import SavedList from './Movies/SavedList';
import MovieList from './Movies/MovieList';
import Movie from './Movies/Movie';

export default function App () {
  const [saved, setSaved] = useState([]);
  const [movieList, setMovieList] = useState([]);
  const [savedId, setSavedId] = useState([]);

  useEffect(() => {
    const getMovies = () => {
      axios
        .get('http://localhost:5000/api/movies')
        .then(response => {
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

    if(savedId.includes(movie.id)){
      return null;
    } else{
      setSavedId([...savedId, movie.id]);
      console.log(savedId);
      const newArr = [...saved, movie];
      setSaved(newArr);
      console.log(saved);
    }
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
