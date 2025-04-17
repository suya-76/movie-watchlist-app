import React, { useState, useRef, useEffect } from 'react';
import MovieCard from '../components/MovieCard';
import { searchMovies } from '../services/movieService';
import './SearchPage.css';
import { useNavigate } from 'react-router-dom';
import logo from '../images/logo.png';


const SearchPage = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [watchlist, setWatchlist] = useState(JSON.parse(localStorage.getItem('watchlist')) || []);

  const navigate = useNavigate();

//to search movies

  const handleSearch = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const result = await searchMovies(query);
      setMovies(result.Search || []);
    } catch (error) {
      setError(error.message);
    }
  };

//to add and remove watchlists
  const handleAddToWatchlist = (movie) => {
    const updatedWatchlist = [...watchlist, movie];
    setWatchlist(updatedWatchlist);
    localStorage.setItem('watchlist', JSON.stringify(updatedWatchlist));
  };

  const handleRemoveFromWatchlist = (id) => {
    const updatedWatchlist = watchlist.filter((movie) => movie.imdbID !== id);
    setWatchlist(updatedWatchlist);
    localStorage.setItem('watchlist', JSON.stringify(updatedWatchlist));
  };

  const isInWatchlist = (id) => {
    return watchlist.some((movie) => movie.imdbID === id);
  };

 
  const userEmail = localStorage.getItem('userEmail');

//handle open sideabar
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  //handle closing side bar
  const sidebarRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setSidebarOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [sidebarRef]);
//

//Logout tab

const handleLogout = () => {
  localStorage.removeItem('userEmail'); // Clear user email from local storage
  navigate('/'); 
};

//

  return (
    <div className="search-page">
      <div className="container">
      <header className="header">
        <div class='items-inside-header'>
        <i className="fa-solid fa-bars fa-2x" onClick={toggleSidebar} style={{ cursor: 'pointer', marginRight: '20px' }}></i>
        <img 
            src={logo} 
            alt="Logo" 
            className="logo" 
            onClick={toggleSidebar} 
          /><h3 id="head">Welcome to the official MW website</h3>
          
          <form onSubmit={handleSearch} className="search-form">
            <input
              type="text"
              placeholder="Search for a movie"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="form-control"
            />
            <button type="submit" className="btn btn-primary" class='search-btn'>Search</button>
          </form>
          {error && <p style={{ color: 'red' }}>Error: {error}</p>}
          </div>
      </header>
      <div ref={sidebarRef} className={`sidebar ${sidebarOpen ? 'active' : ''}`}>
        <div className="sidebar-content">
          <h5 className="user-email">{userEmail}</h5>
          <div className="btn-cont">
            <button
              className="btn btn-secondary"
              onClick={() => navigate('/home')}
              style={
                {marginTop:'155px', backgroundColor:'GrayText'}}
            >
              Home
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => navigate('/search')}
              style={{marginTop:'30px', backgroundColor:'GrayText'}}
            >
              Go to Search
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => navigate('/watchlist')}
              style={{marginTop:'30px', backgroundColor:'GrayText'}}
            >
              Go to Watchlist
            </button>
            <button
              className="btn btn-danger mt-3"
              onClick={handleLogout}
              style={{marginTop:'30px'}}
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="container mt-4">
        <div className="movie-grid row">
          {movies.map((movie) => (
            <div key={movie.imdbID} className="col-md-4">
              <MovieCard
                movie={movie}
                onAddToWatchlist={handleAddToWatchlist}
                onRemoveFromWatchlist={handleRemoveFromWatchlist}
                isInWatchlist={isInWatchlist(movie.imdbID)}
              />
              
            </div>
          ))}
        </div>
        <br/>
        <div className="text-center mt-4">
          <div className="footer-buttons">
          <button onClick={() => navigate('/watchlist')} className="btn-1">Go to Watchlist</button>
          <button onClick={() => navigate('/home')} className="btn-2">Back to Home</button>
        </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default SearchPage;
