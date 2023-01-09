import axios from "axios";

export const instance = axios.create({
    baseURL: 'https://just-review-back.vercel.app',
    // baseURL: 'http://localhost:5000',
})





