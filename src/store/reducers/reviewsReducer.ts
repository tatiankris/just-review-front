import {AppThunk} from "../store";
import {loginAC} from "./authReducer";
import {ReviewDataType, reviewsAPI} from "../../api/review-api";
import {getCategoriesTC, getTagsTC} from "./tagsReducer";

export type ReviewType = {
    _id: string
    userId: string
    userName: string
    category: { title: string }
    tags: Array<{title: string | string}>
    likes: number
    reviewTitle: string
    workTitle: string
    reviewText: string
    authorGrade: number
    overallRating: {1: number, 2: number, 3: number, 4: number, 5: number}
    comments: [any]
    createdAt: string
    imageURL?: string
}
const initialState = {
    reviews: [] as Array<ReviewType>,
    currentReview: {} as ReviewType
}

export type StateType = typeof initialState;

export const reviewsReducer = (state: StateType = initialState, action: ReviewActionsType): StateType => {

    switch (action.type) {
        case 'reviews/SET-REVIEWS': {
            return {...state, reviews: action.reviews}
        }
        case 'reviews/SET-CURRENT-REVIEW': {
            return {...state, currentReview: action.review}
        }
        default:
            return state
    }
}

//actions
export const setReviewsAC = (reviews: ReviewType[]) => {
    return {
        type: 'reviews/SET-REVIEWS',
        reviews
    } as const
}

export const setCurrentReviewAC = (review: ReviewType) => {
    return {
        type: 'reviews/SET-CURRENT-REVIEW',
        review
    } as const
}

//thunks
export const getReviewsTC = (reviewId?: string): AppThunk => {
    return (dispatch) => {
        // dispatch(setAppStatusAC("loading"))
        reviewsAPI.all()
            .then(res => {
                console.log('reviews', res.data.reviews)
                dispatch(setReviewsAC(res.data.reviews))

                dispatch(getCategoriesTC())
                dispatch(getTagsTC())

                if (reviewId) {
                   const current = res.data.reviews.find((r: ReviewType) => r._id === reviewId)
                    dispatch(setCurrentReviewAC(current))
                    // console.log('current', current)
                }
            })
            .catch(err => {
                console.log('error', err.message)

            })
            .finally(() => {
                    // dispatch(setAppStatusAC("succeeded"))
                }
            )
    }
}

export const getAuthorTC = (username: string): AppThunk => {
    return (dispatch) => {
        // dispatch(setAppStatusAC("loading"))
        reviewsAPI.author (username)
            .then(res => {
                console.log('reviews', res.data.reviews)
                dispatch(setReviewsAC(res.data.reviews))

                dispatch(getCategoriesTC())
                dispatch(getTagsTC())
            })
            .catch(err => {
                console.log('error', err.message)

            })
            .finally(() => {
                    // dispatch(setAppStatusAC("succeeded"))
                }
            )
    }
}

export const createReviewTC = (reviewData: ReviewDataType): AppThunk => {
    return (dispatch) => {
        // dispatch(setAppStatusAC("loading"))
        reviewsAPI.create (reviewData)
            .then(res => {

                console.log('review', res.data.review)
                // dispatch(getAuthorTC(res.data.review.))
            })
            .catch(err => {
                console.log('error', err.message)

            })
            .finally(() => {
                    // dispatch(setAppStatusAC("succeeded"))
                }
            )
    }
}

export const updateReviewTC = (reviewId: string, reviewData: ReviewDataType): AppThunk => {
    return (dispatch) => {
        // dispatch(setAppStatusAC("loading"))
        reviewsAPI.update (reviewId, reviewData)
            .then(res => {

                console.log('review', res.data.review)
                // dispatch(getAuthorTC(res.data.review.))
            })
            .catch(err => {
                console.log('error', err.message)

            })
            .finally(() => {
                    // dispatch(setAppStatusAC("succeeded"))
                }
            )
    }
}

export const deleteReviewTC = (reviewId: string): AppThunk => {
    return (dispatch) => {
        // dispatch(setAppStatusAC("loading"))
        reviewsAPI.delete (reviewId)
            .then(res => {

                console.log('review', res.data.review)
                // dispatch(getAuthorTC(res.data.review.))
            })
            .catch(err => {
                console.log('error', err.message)

            })
            .finally(() => {
                    // dispatch(setAppStatusAC("succeeded"))
                }
            )
    }
}

export type ReviewActionsType = ReturnType<typeof setReviewsAC> | ReturnType<typeof setCurrentReviewAC>

