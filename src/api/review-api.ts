import { instance } from "./api";
import {TagsType} from "../store/reducers/reviewsReducer";



export const reviewsAPI = {
    all(search?: string | null, tags?: string[] | null, isMain?: boolean) {
        return instance.get(`/reviews/all`, {params: {search, tags, isMain}})
    },
    currentReview(reviewId: string) {
        return instance.get(`/reviews/reviewPage/${reviewId}`)
    },
    author(username: string) {
        return instance.get(`/reviews/${username}`)
    },
    create(data: ReviewDataType) {
        return instance.post('/reviews/review', data, {headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}})
    },
    update(reviewId: string, data: ReviewDataType) {
        return instance.put(`/reviews/review/${reviewId}`, data, {headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}})
    },
    delete(reviewId: string) {
        return instance.delete(`/reviews/review/${reviewId}`, {headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}})
    },
    images(file: any) {
        return instance.post('reviews/images', {file: file}, {headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}})
    }
}

export const likesAPI = {

    addLike(data: { reviewId: string }) {
        return instance.post('/reviews/like', data, {headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}})
    },
    deleteLike(reviewId: string) {
        return instance.delete(`/reviews/like/${reviewId}`, {headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}})
    }
}

export const userAPI = {
    user(username: string) {
        return instance.get(`/reviews/user/${username}`)
    },
}

export type ReviewDataType = {
    reviewTitle: string,
    workTitle: string,
    reviewText: string,
    category: { title: string },
    tags: Array<{title: string | string}>,
    authorGrade: number
    file?: string | null
}
