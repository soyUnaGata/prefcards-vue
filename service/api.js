import axios from "axios";

const instance = axios.create({
    baseURL: "https://prefcards.onrender.com/",
    headers: {'content-type': 'application/json'}
});

export default instance;