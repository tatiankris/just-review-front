import { instance } from "./api";



export const reviewsAPI = {

    all() {
        return instance.get('/reviews/all')
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

export type ReviewDataType = {
    reviewTitle: string,
    workTitle: string,
    reviewText: string,
    category: { title: string },
    tags: Array<{title: string | string}>,
    authorGrade: number

}
