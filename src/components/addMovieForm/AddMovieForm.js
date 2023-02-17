import React, { useState } from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import api from '../../api/axiosConfig';

const AddMovieForm = () => {

    const [title, setTitle] = useState('');
    const [genres, setGenres] = useState('');
    const [description, setDescription] = useState('');
    const [posterUrl, setPosterUrl] = useState('');
    const [tmdbId, setTmdbId] = useState(0);

    function addMovieRequest() {
        api.post("http://localhost:8083/api/v1/movies/addMovie", {
            title: title,
            genres: genres,
            tmdbId: tmdbId,
            description: description,
            poster_url: posterUrl
        })
        .then((response) => {
            if (response.status === 201) {
                console.log(response);
                alert("Movie Added.")
            }
            else {
                throw new Error("Please Try Again");
            }
        }).catch ((message) => {
            alert(message);
        })
    }

  return (
    <div>
        <Form className="container d-flex flex-column align-items-center justify-content-center mt-4" style={{width: "50%"}}>
            <h2>Add New Movie</h2>
            <Form.Group className="mb-3" controlId="formBasicTitle"> 
                <Form.Label>
                    Movie Title
                </Form.Label>
                <Form.Control style = {{width: "20rem"}} type="text" value = {title} onChange = {(event) => setTitle(event.target.value)} placeholder="Movie Title" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicGenres"> 
                <Form.Label>
                    Genres
                </Form.Label>
                <Form.Control style = {{width: "20rem"}} type="text" value = {genres} onChange = {(event) => setGenres(event.target.value)} placeholder="Genres" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicDescription"> 
                <Form.Label>
                    Description
                </Form.Label>
                <Form.Control style = {{width: "20rem"}} as="textarea" rows={4} value = {description} onChange = {(event) => setDescription(event.target.value)} placeholder="Movie Description" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPosterUrl"> 
                <Form.Label>
                    Poster URL
                </Form.Label>
                <Form.Control style = {{width: "20rem"}} type="text" value = {posterUrl} onChange = {(event) => setPosterUrl(event.target.value)} placeholder="Poster URL" />
            </Form.Group>

            <Button variant = "info" onClick={() => addMovieRequest()}>Add Movie</Button>
        </Form>
    </div>
  )
}

export default AddMovieForm