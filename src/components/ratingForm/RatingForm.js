import {Form, Button} from 'react-bootstrap';

const RatingForm = ({handleSubmit, ratingVal, labelText, defaultValue}) => {
    return (
        <Form>
            <Form.Group className = "mb-3" controlId = "exampleForm.ControlTextarea1">
                <Form.Label>{labelText}</Form.Label>
                <Form.Control ref = {ratingVal} as = "textarea" rows = {3} defaultValue = {defaultValue} />
            </Form.Group>
            <Button variant = "outline-info" onClick = {handleSubmit}>Add</Button>
        </Form>
    )
}

export default RatingForm