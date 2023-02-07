import axios from 'axios';

const token = JSON.parse(localStorage.getItem('jwt'));

export default axios.create ({
    baseURL:`http://localhost:8083/`,
    headers: {
        "ngrok-skip-browser-warning": "true",
        'Authorization': `Bearer ${token}`
    }
});