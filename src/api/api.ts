import axios from "axios";
export const baseURL = 'https://just-review-back.vercel.app' // 'http://localhost:5000'

export const instance = axios.create({
    baseURL: baseURL,
})





