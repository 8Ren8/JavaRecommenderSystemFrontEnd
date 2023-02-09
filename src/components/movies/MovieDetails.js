import { useEffect, useRef, useState } from "react";
import api from '../../api/axiosConfig';
import {useParams} from 'react-router-dom';
import {Container, Row, Col, Button, Card} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import React from "react";
import logo from './logo.svg';
import RatingForm from '../ratingForm/RatingForm';
import { textAlign } from "@mui/system";

const MovieDetails = ({getMovieData, movie, rating, setRating}) => {

    //get movieId from parameter in url
    let params = useParams();
    const movieId = params.movieId;

    // useEffect(() => {
    //     getMovieData(movieId);
    // }, [])

    const[movieDetail, setMovieDetail] = useState([]);
    const[tmdbMovie, setTmdbMovie] = useState([]);

    //fetch movie detail based on movieId
    useEffect(() => {
        const fetchMovie = async() => {

            const movie_response = await api.get(`/api/v1/movies/${movieId}`);
            const movie_detail = movie_response.data;

            const tmdb_movie_response = await fetch(`https://api.themoviedb.org/3/movie/${movie_detail.tmdbId}?api_key=17d6dd8cf5cfd7d1dbbafac3e5eefcee&language=en-US`);
            const tmdb_movie_detail = await tmdb_movie_response.json();

            setMovieDetail(movie_detail);
            setTmdbMovie(tmdb_movie_detail);
        }
        fetchMovie();
    }, [])

    const[similarMovies, setSimilarMovies] = useState([]);

    // navigate to another movie
    const navigate = useNavigate();

    function movieDetails(movieID){
        navigate(`../api/v1/movies/${movieID}`, {replace: true});
        navigate(0);
    }

    //fetch similar movies based on movieId
    useEffect(() => {

        const fetchData = async () => {

			const similarMoviesResponse = await api.get(`/api/v1/movies/similarMovies/${movieId}`)
			const similarMoviesResult = similarMoviesResponse.data;

			const tmdbMovies = await Promise.all(
				similarMoviesResult.map(async (movie) => {
					const tmdbResponse = await fetch(`https://api.themoviedb.org/3/movie/${movie.tmdbId}?api_key=17d6dd8cf5cfd7d1dbbafac3e5eefcee&language=en-US`);
					const tmdbResult = await tmdbResponse.json();
					return {
						...movie,
						poster_path:  tmdbResult.poster_path,
					};
				})
			);
				setSimilarMovies(tmdbMovies);
		}
		fetchData();

    }, [])

    const addRating = async (e) => {
        e.preventDefault();

        const rating = rating.current;

        try{
            const response = await api.post("/api/v1/ratings", {ratingBody: rating.value, movieID:movieId});

            const updatedRating = rating.value;
    
            setRating(updatedRating);
        }
        catch(err) {
            console.error(err);
        }

    }

  return (
    <Container fluid>
        <Row>
            <Col><h3 className="mt-2">{movieDetail?.title}</h3></Col>
        </Row>
        <Row className = "mt-2">
            <Col>
            <img src = {`https://image.tmdb.org/t/p/w500/${tmdbMovie?.poster_path}?api_key=17d6dd8cf5cfd7d1dbbafac3e5eefcee`} alt = {logo} />
            </Col>
            <Col>
                {
                    <div>
                        <Row>
                            <Col>
                                <h3>{movieDetail?.title}</h3>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <h3>{movieDetail?.genres}</h3>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <h3>{tmdbMovie?.overview}</h3>
                            </Col>
                        </Row>
                    </div>
                }
                {
                    <div>
                        <Row>
                            <Col></Col>
                        </Row>
                        <Row>
                            <Col>
                                <hr />
                            </Col>
                        </Row>
                    </div>
                }
            </Col>
        </Row>
        <Row>
            <Col>
                <h3>Recommended Movies</h3>
            </Col>
        </Row>
        <Row xs={1} md={5} className="g-4">
            {similarMovies.length === 0 &&
                <div>No Recommended Movies</div>
            }
            {
                similarMovies?.map((simMovie) => {
                    return (
                        <Col>
                            <Card border = "light" bg = "dark" style={{ width: '18rem' }}>
                                <Card.Img variant="top" src={`https://image.tmdb.org/t/p/w500/${simMovie.poster_path}?api_key=17d6dd8cf5cfd7d1dbbafac3e5eefcee/`} alt = {logo} />
                                <Card.Body>
                                    <Card.Title>{simMovie.title}</Card.Title>
                                    <Card.Text>
                                    </Card.Text>
                                    <Button variant = "info" onClick = {() => movieDetails(simMovie.movieId)}>Movie Details</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    )
                })
            }
        </Row>
    </Container>
  )
}

export default MovieDetails
