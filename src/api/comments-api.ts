import { instance } from "./api";



export const commentsAPI = {

    getComments(reviewId: string) {
        return instance.get(`/reviews/comment/${reviewId}`,{headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}})
    },
    createComment(reviewId: string, data: CommentData) {
        return instance.post(`/reviews/comment/${reviewId}`, data, {headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}})
    },
    updateComment(reviewId: string, commentId: string, data: CommentData) {
        return instance.put(`/reviews/comment/${reviewId}/${commentId}`, data, {headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}})
    },
    deleteComment(reviewId: string, commentId: string) {
        return instance.post(`/reviews/comment/${reviewId}/${commentId}`, {headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}})
    },


}

export type CommentData = {
    text: string
}


