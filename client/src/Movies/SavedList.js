import React from 'react';
import {Link, NavLink} from 'react-router-dom';

export default function SavedList(props) {
  return (
    <div className="saved-list">
      <h3>Saved Movies:</h3>
      {props.list.map( (movie) => (
        <NavLink to={`/movies/${movie.id}`} key={movie.id} className="saved-movie">{movie.title}</NavLink>
      ))}
      <Link to={`/`}>
        <div className="home-button">Home</div>
      </Link>
    </div>
  );
}
