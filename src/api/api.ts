import axios from "axios";

export const instance = axios.create({
    baseURL: 'http://localhost:5000',
})


export const instanceGoogle = axios.create({
    baseURL: 'http://localhost:5000',
    withCredentials: true
    // headers: {
    //     Accept: 'application/json',
    //     'Content-Type': 'application/json',
    //     // 'Access-Control-Allow-Origin': 'http://localhost:3000/google',
    //     // 'Access-Control-Allow-Credentials': true
    // }
})



