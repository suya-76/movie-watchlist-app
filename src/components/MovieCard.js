// src/components/MovieCard.js
import React from 'react';
import './MovieCard.css';


const MovieCard = ({ movie, onAddToWatchlist, onRemoveFromWatchlist, isInWatchlist }) => {
  const handleClick = () => {
    if (isInWatchlist) {
      onRemoveFromWatchlist(movie.imdbID);
    } else {
      onAddToWatchlist(movie);
    }
  };

  return (
    <div className="movie-card">
      <img src={movie.Poster} alt={`${movie.Title} poster`} className="movie-poster" />
      <h3 >{movie.Title}</h3>
      <p>{movie.Year}</p> 
      <button onClick={handleClick}>
        {isInWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
      </button>
    </div>
  );
};

export default MovieCard;
