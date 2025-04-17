// src/services/movieService.js
import axios from 'axios';

const API_KEY = 'c2062f5b';
const BASE_URL = `https://www.omdbapi.com/?apikey=${API_KEY}`;

export const searchMovies = async (query) => {
  try {
    const response = await axios.get(`${BASE_URL}&s=${query}`);
    if (response.data.Error) {
      throw new Error(response.data.Error);
    }
    return response.data;
  } catch (error) {
    console.error("Error fetching movies:", error.message);
    throw error;
  }
};

export const getMovieDetails = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}&i=${id}`);
    if (response.data.Error) {
      throw new Error(response.data.Error);
    }
    return response.data;
  } catch (error) {
    console.error("Error fetching movie details:", error.message);
    throw error;
  }
};
