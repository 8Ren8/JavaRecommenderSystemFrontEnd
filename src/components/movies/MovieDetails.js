import { useEffect, useRef, useState } from "react";
import api from '../../api/axiosConfig';
import {useParams} from 'react-router-dom';
import {Container, Row, Col, Button, Card, Form} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import React from "react";
import logo from './logo.svg';
import RatingForm from '../ratingForm/RatingForm';
import { textAlign } from "@mui/system";

const MovieDetails = () => {

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

    const[rating, setRating] = useState('1');
    const userID = JSON.parse(localStorage.getItem("userID"));
    console.log(userID);
    console.log(movieId);
    console.log(rating);

    //add rating
    function addRatingRequest() {

        api.post("http://localhost:8083/api/v1/ratings/addRating", {
            userId: userID,
            movieId: movieId,
            rating: rating
        })
        .then((response) => {
            if (response.status === 201) {
                console.log(response);
                alert("Rating Added.")
            }
            else {
                throw new Error("Please Try Again");
            }
        }).catch ((message) => {
            alert(message);
        })
    }

  return (
    <Container fluid>
        <Row>
            <Col><h3 className="mt-2">Movie Details</h3></Col>
        </Row>
        <Row className = "mt-2">
            <Col className="mb-4">
                <img src = {`https://image.tmdb.org/t/p/w500/${tmdbMovie?.poster_path}?api_key=17d6dd8cf5cfd7d1dbbafac3e5eefcee`} alt = {logo} />
            </Col>
            <Col>
                {
                    <div>
                        <Row>
                            <Col className="mb-4">
                                <h2>{movieDetail?.title}</h2>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <h3>{movieDetail?.genres}</h3>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="mb-4">
                                <h3>{tmdbMovie?.overview}</h3>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Select className = "mb-2" style = {{width: "4rem"}} onChange={(event) => setRating(event.target.value)}>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </Form.Select>
                                <Button onClick={addRatingRequest}>Add Rating</Button>
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
