// src/pages/WatchlistPage.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import MovieCard from '../components/MovieCard';
import './WatchlistPage.css';


const WatchlistPage = () => {
  const [watchlist, setWatchlist] = useState([]);
  const navigate = useNavigate();  

//to get watchlist from the local storage(browser memory)
  useEffect(() => {
    const storedWatchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
    setWatchlist(storedWatchlist);
  }, []);

//to nandle removing items from watchlists data
  const handleRemoveFromWatchlist = (id) => {
    const updatedWatchlist = watchlist.filter((movie) => movie.imdbID !== id);
    setWatchlist(updatedWatchlist);
    localStorage.setItem('watchlist', JSON.stringify(updatedWatchlist));
  };

  //clear watchlist
  const handleClearWatchlist = () => {
    setWatchlist([]);
    localStorage.removeItem('watchlist'); // Clears watchlist data
  };
//

  return (
    <div className='container' >
      <h1 className='watchlist-title'>Your Watchlist</h1>
      <div className="body-for-watchlist">
        <div className="movie-grid">
          {watchlist.map((movie) => (
            <MovieCard
              key={movie.imdbID}
              movie={movie}
              onRemoveFromWatchlist={handleRemoveFromWatchlist}
              isInWatchlist={true}
            />
          ))}
        </div>
        <div className="watchlist-back-btn">
          <button onClick={() => navigate('/search')} className="btn btn-info" id='btn-1'>Back to Search</button>
          <button onClick={() => navigate('/home')} className="btn btn-info" id='btn-2'>Back to Home</button> 
          <button onClick={handleClearWatchlist} className="btn btn-warning" id='btn-3'>Clear Watchlist</button>
        </div>
      </div>
    </div>
  );
};

export default WatchlistPage;