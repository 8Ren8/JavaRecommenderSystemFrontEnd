import React, { useState, useMemo } from 'react'
import Pagination from '../pagination/Pagination';
import './Movies.css';
import Carousel from 'react-material-ui-carousel';
import { Paper } from  '@mui/material';
import { useNavigate } from 'react-router-dom';
import logo from './logo.svg';
import Button from 'react-bootstrap/Button';

let PageSize = 10;

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
        <Carousel>
            {
                moviesData?.map((movie) => {
                    return (
                        <Paper>
                            <div className = 'movie-card-container'>
                                <div className = 'movie-card'>
                                    <div className = 'movie-detail'>
                                        <div className = 'movie-poster'>
                                            <img src = {logo} alt = "" />
                                        </div>
                                        <div className = "movie-title">
                                            <h3>{movie.title}</h3>
                                        </div>
                                        <div className='movie-review-button-container'>
                                            <Button variant = "info" onClick = {() => movieDetails(movie.movieId)}>Movie Details</Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Paper>
                    )
                })
            }
        </Carousel>
        <Pagination
            className="pagination-bar"
            currentPage={currentPage}
            totalCount={movies?.length}
            pageSize={PageSize}
            onPageChange={page => setCurrentPage(page)}
        />
    </div>
  )
}

export default Movies