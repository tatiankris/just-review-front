import { instance } from "./api";


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