import {instance, instanceGoogle} from "./api";
import axios from "axios";
const CLIENT_ID = '51eed0be7af19f448be0'
const CLIENT_SECRET = 'f561ab4ab6241252b270812f4dc63877dfa84e4f'
const baseURL = 'https://just-review-back.vercel.app'
const params = '?client_id=' + CLIENT_ID + '&client_secret=' + CLIENT_SECRET + '&code='


export const authAPI = {
    login(data: LoginDataType) {
        return instance.post('/auth/login', data)
    },
    registration(data: RegisterDataType) {
        return instance.post('/auth/registration', data)
    },
    me() {
        return instance.get('/auth/me', {headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}})
    },

    google() {
        return axios.get(baseURL + '/auth/login/success', {withCredentials: true
            // headers: {
            //     "Accept": "application/json",
            //     "Content-Type": "application/json",
            //     // "Access-Control-Allow-Origin": 'https://tatiankris.github.io',
            //     // "Access-Control-Allow-Methods": 'GET'
            // }
        })
    }
}

export type LoginDataType = {
    email: string
    password: string
}

export type RegisterDataType = {
    username: string
    email: string
    password: string
}