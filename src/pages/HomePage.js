// src/pages/HomePage.js
import React, { useState, useEffect, useRef} from 'react';
import MovieCard from '../components/MovieCard';
import { searchMovies } from '../services/movieService';
import './HomePage.css'; 
import { useNavigate } from 'react-router-dom';
import logo from '../images/logo.png';




const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [watchlist, setWatchlist] = useState(JSON.parse(localStorage.getItem('watchlist')) || []);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigate = useNavigate();

  const userEmail = localStorage.getItem('userEmail');

  //to fetch the spider man movies for my home page contents
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const result = await searchMovies('spider man'); // Change to Marvel movies search
        setMovies(result.Search || []);
      } catch (error) {
        setError(error.message);
      }

      

    };

    fetchMovies();
  }, []);

  //to untoggle the sidebar (used event listener)
  
  const sidebarRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setSidebarOpen(false); // Close sidebar if click outside
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [sidebarRef]);

// Add or Remove Watchlists

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

//return movies
  const isInWatchlist = (id) => {
    return watchlist.some((movie) => movie.imdbID === id);
  };

// Sidebar
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

//Logout tab

const handleLogout = () => {
  localStorage.removeItem('userEmail'); // Clear user email from local storage
  navigate('/'); 
};

//
  return (
    <div className="home-page">
      <div className="container">
      <header className="header">
        <div class='items-inside-header'>
        <i className="fa-solid fa-bars fa-2x" onClick={toggleSidebar} style={{ cursor: 'pointer' }} ></i>
          <img 
            src={logo} 
            alt="Logo" 
            className="logo" 
            onClick={toggleSidebar} 
          />
          <h3 id="head">Welcome to the official MW website</h3>
          <form className="search-form" onClick={() => navigate('/search')}>
            <input
              type="text"
              placeholder="Search for a movie"
              readOnly
              className="form-control"
            />
            <button type="button" className="btn btn-primary" class='search-btn'>Search</button>
          </form>
          </div>
      </header>


      <div ref={sidebarRef} className={`sidebar ${sidebarOpen ? 'active' : ''}`}>
        <div className="sidebar-content" >
          <h5 className="user-email">
          <i className="fas fa-user user-icon" style={{height:'130px', fontSize:'100px'}}></i><br/>
            {userEmail}
          </h5>
          <div class="btn-cont">
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
              style={{marginTop:'50px'}}
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className='navBar'>
        <nav>
        <ul>
            <li><a href="/home"><i class="fa-solid fa-home nav-icon"></i> Home</a></li>
            <li><a href="#about"><i class="fa-solid fa-concierge-bell nav-icon"></i> Services</a></li>
            <li><a href="about"><i class="fa-solid fa-info-circle nav-icon"></i> About</a></li>
            <li><a href="about"><i class="fa-solid fa-envelope nav-icon"></i> Contact</a></li>
        </ul>
    </nav>
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
        {error && <p style={{ color: 'red' }}>Error: {error}</p>}

      </div>
      <div id='about'>
          <div className='content'>
            <div class='row'>
            <div class='col-md-3'>
            <h2 style={{color:'green'}}>About Us</h2>
            <h4>Welcome to the Official MW Website!</h4>
            <p>
            At MW, we’re passionate about movies and dedicated to bringing you an easy-to-use platform to manage your personal movie watchlist.
            <br/> Whether you're a casual viewer or a movie enthusiast, our app is designed to help you discover, organize, and keep track of all the movies you love.
            </p>
            <h4>Our Mission</h4>
            <p>
            Our mission is to provide movie lovers with a seamless experience to explore new movies, save them to their watchlist, and never miss out on the latest releases. <br/> We believe that every movie deserves to be remembered, and every moviegoer deserves a tool that keeps their movie-watching experience organized and enjoyable.
            </p>
            <h4>What We Offer</h4>
            
            <p>Movie Search: Quickly search for any movie by title, and instantly get details like the plot, cast, and more.</p>
            
            </div>
            <div class='col-md-3'>
            <br/>
            <br/>
            <p>Personal Watchlist: Save movies to your watchlist so you can easily keep track of what you want to watch next.</p>
            <p>Recommendations: Discover new movies based on your preferences and viewing history.</p>
            
            <h4>Why Choose MW?</h4>
            <p>User-Friendly Interface: Our app is designed with simplicity in mind, making it easy for anyone to use.
            </p>
            <p>Regular Updates: We’re constantly updating our app with new features and improvements to enhance your movie-watching experience.
            </p>
            <p>Community Driven: We value feedback from our users and are always open to suggestions on how we can improve our service.
            </p>
            <br/><br/>
            <p>
            Thank you for choosing MW as your go-to movie watchlist app. We’re excited to have you on this cinematic journey with us!
            </p>
            </div>
            <div class='col-md-3'>
            <h2 style={{color:'green'}}>Contact Us</h2>
            
            <p>
            We'd love to hear from you! Whether you have a question, feedback, or just want to say hello, feel free to reach out to us. Here's how you can get in touch.
            </p>
            <h4>Email:</h4>
            <p>
            For any inquiries, you can email us at: support@mwwebsite.com.<br/> We aim to respond within 24-48 hours.
            </p>
            <h4>Phone:</h4>
            
            <p>
              Need to speak with us directly? <br/>Call us at: +1 (555) 123-4567. <bt/>Our phone lines are open from 9:00 AM to 6:00 PM (EST), Monday to Friday.

            </p>
            
            <h4>Social Media:</h4>
            <p>
            <ul>
              <li>Facebook: facebook.com/mwwebsite</li>
              <li>Twitter: twitter.com/mwwebsite</li>
              <li>Instagram: instagram.com/mwwebsite</li>
            </ul>
            </p>
            </div>

            <div class='col-md-3'>
              <br/>
              <br/>
              <h4>Office Address:</h4>
              <p>
              If you'd like to visit us or send us mail, you can find us at:
              <br/>
              MW Website<br/>
              1234 Movie Lane, Suite 100<br/>
              Film City, FC 56789<br/>
              USA
              </p>
              <h4>
              We appreciate your interest in our platform and look forward to assisting you!
              </h4>


            </div>

          </div>
          
          </div>
      </div>
    </div>
    </div>
    
  );
};

export default HomePage;
