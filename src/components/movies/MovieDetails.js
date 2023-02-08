import { useEffect, useRef } from "react";
import api from '../../api/axiosConfig';
import {useParams} from 'react-router-dom';
import {Container, Row, Col, Button} from 'react-bootstrap';
import React from "react";
import logo from './logo.svg';
import RatingForm from '../ratingForm/RatingForm';

const MovieDetails = ({getMovieData, movie, rating, setRating}) => {

    let params = useParams();
    const movieId = params.movieId;

    useEffect(() => {
        getMovieData(movieId);
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
    <Container>
        <Row>
            <Col><h3>Movie Details</h3></Col>
        </Row>
        <Row className = "mt-2">
            <Col>
            <img src = {logo} alt = {logo} />
            </Col>
            <Col>
                {
                    <div>
                        <Row>
                            <Col>
                                <Button>Rate Movie</Button>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                {MovieDetails.movie}
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
                <hr />
            </Col>
        </Row>
    </Container>
  )
}

export default MovieDetails
