import './App.css';
import api from './api/axiosConfig';
import { useState, useEffect } from 'react';
import Layout from './components/Layout';
import {Routes, Route} from 'react-router-dom';
import Home from './components/home/Home';
import Header from './components/header/Header';
import NotFound from './components/notFound/NotFound';
import Login from './components/login/Login';
import Register from './components/register/Register';
import Users from './components/users/Users';
import AdminAddUser from './components/adminAddUser/AdminAddUser';
import AddMovieForm from './components/addMovieForm/AddMovieForm';
import { useLocalState } from './util/LocalStorage';
import PrivateRoute from './components/privateRoute/PrivateRoute';
import "bootstrap/dist/css/bootstrap.min.css";
import MovieDetails from './components/movies/MovieDetails';

function App() {

  //const url = 'http://localhost:8083/api/v1/auth/authenticate';

  const [movies, setMovies] = useState();
  const [movie, setMovie] = useState();

  // const [jwt, setJwt] = useLocalState("", "jwt");

  // console.log(jwt);
  // console.log(JSON.parse(localStorage.getItem('jwt')));

  const getMovies = async () => {

    try{

      const response = await api.get("/api/v1/movies");
      const movieResult = await response.data;

      const tmdbMovies = await Promise.all(
        movieResult.map(async (movie) => {
          const tmdbResponse = await fetch(`https://api.themoviedb.org/3/movie/${movie.tmdbId}?api_key=17d6dd8cf5cfd7d1dbbafac3e5eefcee&language=en-US`);
          const tmdbResult = await tmdbResponse.json();
          return {
            ...movie,
            poster_path: tmdbResult.poster_path,
            overview: tmdbResult.overview
          };
        })
      );

      setMovies(tmdbMovies);

    } catch(err) {
      console.log(err);
    }
  }

  const getMovieData = async (movieId) => {
    try {
      const response = await api.get(`/api/v1/movies/${movieId}`);

      const singleMovie = response.data;

      setMovie(singleMovie);

      //setRating(singleMovie.rating);

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getMovies();
  }, []);

  // useEffect(() => {
  //   if(!jwt) {
      
  //     const reqBody = {
  //       username: "Ali",
  //       password: "ali123",
  //     };

  //     fetch(`http://localhost:8083/api/v1/auth/authenticate`, {
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       method: 'POST',
  //       body: JSON.stringify(reqBody),
  //     })
  //     .then(response => response.json())
  //     .then(data => setJwt(data.token));
  //   }
  // }, []);

  // useEffect(() => {
  //   console.log(`JWT issss: ${jwt}`);
  // }, [jwt]);

  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path = "/api/v1/auth/login" element = {<Login />}></Route>
        <Route path = "/api/v1/auth/register" element = {<Register />}></Route>
        <Route path="/" element = {<PrivateRoute><Layout/></PrivateRoute>}>
          <Route path = "/api/v1/movies" element = {<Home movies = {movies} />}></Route>
          <Route path = "/api/v1/movies/:movieId" element = {<MovieDetails />}></Route>
          <Route path = "/admin/users" element = {<Users />}></Route>
          <Route path = "/admin/users/addUser" element = {<AdminAddUser />}></Route>
          <Route path = "/admin/addMovie" element = {<AddMovieForm />}></Route>
          <Route path = "*" element  = {<NotFound />}></Route>
        </Route>
      </Routes>

    </div>
  );
}

export default App;
