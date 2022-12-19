import {AppThunk} from "../store";
import {loginAC} from "./authReducer";
import {likesAPI, ReviewDataType, reviewsAPI} from "../../api/review-api";
import {getCategoriesTC, getTagsTC} from "./tagsReducer";
import {getCommentsTC} from "./commentsReducer";

export type ReviewType = {
    _id: string
    userId: string
    userName: string
    category: { title: string }
    tags: Array<{title: string | string}>
    likes: Array<{_id: string, reviewId: string, userId: string}>
    reviewTitle: string
    workTitle: string
    reviewText: string
    authorGrade: number
    overallRating: {1: number, 2: number, 3: number, 4: number, 5: number}
    comments: number
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
        case 'reviews/SET-LIKES': {
            return {...state, reviews:
                    [...state.reviews.map(r => r._id === action.reviewId ? {...r, likes: action.likes} : r)]}
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

export const setLikesAC = (reviewId: string, likes: Array<{_id: string, reviewId: string, userId: string}>) => {
    return {
        type: 'reviews/SET-LIKES',
        reviewId,
        likes
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
                    dispatch(getCommentsTC(reviewId))
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

export const likeReviewTC = (reviewId: string): AppThunk => {
    return (dispatch,getState) => {
        const review = getState().reviews.reviews.find(r => r._id === reviewId)
        // dispatch(setAppStatusAC("loading"))
        likesAPI.addLike ({reviewId})
            .then(res => {


                        if (review) {
                            dispatch(setLikesAC(reviewId, res.data.likes))
                        }

                // console.log('review', res.data.review)
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
export const dislikeReviewTC = (reviewId: string): AppThunk => {
    return (dispatch,getState) => {
        const review = getState().reviews.reviews.find(r => r._id === reviewId)
        // dispatch(setAppStatusAC("loading"))
        likesAPI.deleteLike(reviewId)
            .then(res => {

                if (review) {
                    dispatch(setLikesAC(reviewId, res.data.likes))
                }

                // console.log('review', res.data.review)
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





export type ReviewActionsType = ReturnType<typeof setReviewsAC> | ReturnType<typeof setCurrentReviewAC>| ReturnType<typeof setLikesAC>

