import React, { useState, useMemo } from 'react'
import Pagination from '../pagination/Pagination';
import './Movies.css';
import Carousel from 'react-material-ui-carousel';
import { Paper } from  '@mui/material';
import { useNavigate } from 'react-router-dom';
import logo from './logo.svg';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';

let PageSize = 12;

const Movies = ({movies}) => {

    const [currentPage, setCurrentPage] = useState(1);

    const moviesData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        return movies?.slice(firstPageIndex, lastPageIndex);
    }, [currentPage]);

    const navigate = useNavigate();

    function movieDetails(movieId){
        navigate(`/api/v1/movies/${movieId}`);
    }

  return (
    <div>
        <Container fluid>
            <Row xs={1} md={3} className="g-4">
                {
                    moviesData?.map((movie) => {
                        return (
                            <Col>
                                <Card bg = "dark" style={{ width: '20rem' }}>
                                    <Card.Img variant="top" src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}?api_key=17d6dd8cf5cfd7d1dbbafac3e5eefcee/`} alt = {logo} />
                                    <Card.Body>
                                        <Card.Title>{movie.title}</Card.Title>
                                        <Card.Text>
                                        </Card.Text>
                                        <Button variant = "info" onClick = {() => movieDetails(movie.movieId)}>Movie Details</Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        )
                    })
                }
            </Row>
            <Pagination
                className="pagination-bar"
                currentPage={currentPage}
                totalCount={movies?.length}
                pageSize={PageSize}
                onPageChange={page => setCurrentPage(page)}
            />
        </Container>
    </div>
  );
}

export default Movies