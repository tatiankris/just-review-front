import {AppThunk} from "../store";
import {loginAC, setAuthUserRating} from "./authReducer";
import {gradesAPI, ReviewDataType, reviewsAPI} from "../../api/review-api";
import {getCategoriesTC, getTagsTC} from "./tagsReducer";
import {getCommentsTC} from "./commentsReducer";
import { setAppStatusAC } from "./appReducer";

export type TagsType = Array<{title: string | string}>
export type ReviewType = {
    _id: string
    userId: string
    userName: string
    category: { title: string }
    tags: TagsType
    likes: Array<{_id: string, reviewId: string, userId: string}>
    reviewTitle: string
    workTitle: string
    reviewText: string
    authorGrade: number
    rating: number
    comments: number
    createdAt: string
    imageURL?: string
    avatar?: string
}
const initialState = {
    reviews: [] as Array<ReviewType>,
    currentReview: {} as ReviewType,
    search: '',
    latest: [] as Array<ReviewType>,
    highestRating: [] as Array<ReviewType>
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
        case 'reviews/SET-LATEST-LIKES': {
            return {...state, latest:
                    [...state.latest.map(r => r._id === action.reviewId ? {...r, likes: action.likes} : r)]}
        }
        case 'reviews/SET-HIGHEST-LIKES': {
            return {...state, highestRating:
                    [...state.highestRating.map(r => r._id === action.reviewId ? {...r, likes: action.likes} : r)]}
        }
        case 'reviews/SET-CURRENT-LIKES': {
            return {...state, currentReview: {...state.currentReview, likes: action.likes}}
        }
        case 'reviews/SET-SEARCH': {
            return {...state, search: action.search}
        }
        case 'reviews/SET-MAIN-REVIEWS': {
            return {...state, latest: action.latest, highestRating: action.highestRating}
        }
        case 'reviews/SET-RATINGS': {
            return {...state, reviews:
                    [...state.reviews.map(r => r._id === action.reviewId ? {...r, rating: action.averageRating} : r)]}
        }
        case 'reviews/SET-CURRENT-RATINGS': {
            return {...state, currentReview: {...state.currentReview, rating: action.averageRating}}
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
export const setMainReviewsAC = (latest: ReviewType[], highestRating: ReviewType[] ) => {
    return {
        type: 'reviews/SET-MAIN-REVIEWS',
        latest,
        highestRating
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

export const setLatestLikesAC = (reviewId: string, likes: Array<{_id: string, reviewId: string, userId: string}>) => {
    return {
        type: 'reviews/SET-LATEST-LIKES',
        reviewId,
        likes
    } as const
}
export const setHighestLikesAC = (reviewId: string, likes: Array<{_id: string, reviewId: string, userId: string}>) => {
    return {
        type: 'reviews/SET-HIGHEST-LIKES',
        reviewId,
        likes
    } as const
}

export const setCurrentLikesAC = (likes: Array<{_id: string, reviewId: string, userId: string}>) => {
    return {
        type: 'reviews/SET-CURRENT-LIKES',
        likes
    } as const
}
export const setSearchAC = (search: string) => {
    return {
        type: 'reviews/SET-SEARCH',
        search
    } as const
}
export const setRatingsAC = (reviewId: string, averageRating: number) => {
    return {
        type: 'reviews/SET-RATINGS',
        reviewId,
        averageRating
    } as const
}
export const setCurrentRatingsAC = (averageRating: number) => {
    return {
        type: 'reviews/SET-CURRENT-RATINGS',
        averageRating
    } as const
}

//thunks
export const getReviewsTC = (reviewId?: string | null, isMain?: boolean): AppThunk => {
    return (dispatch, getState) => {

        const search = getState().reviews.search
        const tags = getState().tags.searchTags

        dispatch(setAppStatusAC("loading"))
        reviewsAPI.all(
            search.length ? search : null,
            tags.length ? tags : null,
            isMain ? isMain : false
            )
            .then(res => {
                // console.log('reviews', res.data.reviews)
                if (!!res.data.isMain) {

                    dispatch(setMainReviewsAC(res.data.latest, res.data.highestRating))
                    dispatch(getCategoriesTC())
                    dispatch(getTagsTC())



                } else {
                    dispatch(setReviewsAC(res.data.reviews))

                    dispatch(getCategoriesTC())
                    dispatch(getTagsTC())

                    // if (reviewId) {
                    //     const current = res.data.reviews.find((r: ReviewType) => r._id === reviewId)
                    //     dispatch(setCurrentReviewAC(current))
                    //     dispatch(getCommentsTC(reviewId))
                    //     // console.log('current', current)
                    // }
                }

            })
            .catch(err => {
                console.log('error', err.message)

            })
            .finally(() => {
                    dispatch(setAppStatusAC("succeeded"))
                }
            )
    }
}
export const getCurrentReviewsTC = (reviewId: string): AppThunk => {
    return (dispatch) => {
        dispatch(setAppStatusAC("loading"))
        reviewsAPI.currentReview (reviewId)
            .then(res => {

                dispatch(setCurrentReviewAC(res.data.review))
                dispatch(getCommentsTC(reviewId))
            })
            .catch(err => {
                console.log('error', err.message)

            })
            .finally(() => {
                    dispatch(setAppStatusAC("succeeded"))
                }
            )
    }
}
export const getAuthorTC = (username: string, create: string, grade: string, rating: string, category: string): AppThunk => {
    return (dispatch) => {
        dispatch(setAppStatusAC("loading"))
        reviewsAPI.author (username,create, grade, rating, category )
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
                    dispatch(setAppStatusAC("succeeded"))
                }
            )
    }
}

export const createReviewTC = (reviewData: ReviewDataType, userId: string): AppThunk => {
    return (dispatch) => {
        dispatch(setAppStatusAC("loading"))
        reviewsAPI.create (reviewData, userId)
            .then(res => {

                console.log('review', res.data.review)
                dispatch(getAuthorTC(res.data.review.userName, '-1', 'null', 'null', 'null'))
            })
            .catch(err => {
                console.log('error', err.message)

            })
            .finally(() => {
                    dispatch(setAppStatusAC("succeeded"))
                }
            )
    }
}

export const updateReviewTC = (reviewId: string, reviewData: ReviewDataType): AppThunk => {
    return (dispatch) => {
        dispatch(setAppStatusAC("loading"))
        reviewsAPI.update (reviewId, reviewData)
            .then(res => {

                console.log('review', res.data.review)
                dispatch(getAuthorTC(res.data.review.userName, '-1', 'null', 'null', 'null'))
            })
            .catch(err => {
                console.log('error', err.message)

            })
            .finally(() => {
                    dispatch(setAppStatusAC("succeeded"))
                }
            )
    }
}

export const deleteReviewTC = (reviewId: string): AppThunk => {
    return (dispatch) => {
        dispatch(setAppStatusAC("loading"))
        reviewsAPI.delete (reviewId)
            .then(res => {

                console.log('review', res.data.review)
                dispatch(getAuthorTC(res.data.review.userName, '-1', 'null', 'null', 'null'))
            })
            .catch(err => {
                console.log('error', err.message)

            })
            .finally(() => {
                    dispatch(setAppStatusAC("succeeded"))
                }
            )
    }
}

export const likeReviewTC = (reviewId: string, current: 'current' | 'none'): AppThunk => {
    return (dispatch,getState) => {
        const review = getState().reviews.reviews.find(r => r._id === reviewId)

        const reviewLatest = getState().reviews.latest.find(r => r._id === reviewId)
        const highestRating = getState().reviews.highestRating.find(r => r._id === reviewId)

        // dispatch(setAppStatusAC("loading"))
        gradesAPI.addLike ({reviewId})
            .then(res => {


                        if (review) {

                            dispatch(setLikesAC(reviewId, res.data.likes))
                        }
                        if (reviewLatest) {

                            dispatch(setLatestLikesAC(reviewId, res.data.likes))
                        }
                        if (highestRating) {

                            dispatch(setHighestLikesAC(reviewId, res.data.likes))
                        }

                        if (current === 'current') {
                    console.log( "currentTC",current)
                    dispatch(setCurrentLikesAC(res.data.likes))
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
export const dislikeReviewTC = (reviewId: string, current:'current' | 'none'): AppThunk => {
    return (dispatch,getState) => {
        const review = getState().reviews.reviews.find(r => r._id === reviewId)

        const reviewLatest = getState().reviews.latest.find(r => r._id === reviewId)
        const highestRating = getState().reviews.highestRating.find(r => r._id === reviewId)
        // dispatch(setAppStatusAC("loading"))
        gradesAPI.deleteLike(reviewId)
            .then(res => {

                if (review) {

                    dispatch(setLikesAC(reviewId, res.data.likes))
                }
                if (reviewLatest) {

                    dispatch(setLatestLikesAC(reviewId, res.data.likes))
                }
                if (highestRating) {

                    dispatch(setHighestLikesAC(reviewId, res.data.likes))
                }
                if (current === 'current') {
                    console.log( "currentTC",current)
                    dispatch(setCurrentLikesAC(res.data.likes))
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

export const ratedReviewTC = (value: number, reviewId: string, current?: boolean): AppThunk => {
    return (dispatch,getState) => {
        const review = getState().reviews.reviews.find(r => r._id === reviewId)

        // dispatch(setAppStatusAC("loading"))
        gradesAPI.addRating({value, reviewId})
            .then(res => {

                if (review) {

                    dispatch(setRatingsAC(reviewId, res.data.averageRating))
                    dispatch(setAuthUserRating(res.data.userRatings ))

                }
                if (current) {
                    dispatch(setCurrentRatingsAC(res.data.averageRating ))
                    dispatch(setAuthUserRating(res.data.userRatings ))
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


export type ReviewActionsType = ReturnType<typeof setHighestLikesAC> | ReturnType<typeof setLatestLikesAC> | ReturnType<typeof setCurrentRatingsAC> | ReturnType<typeof setRatingsAC> | ReturnType<typeof setReviewsAC> | ReturnType<typeof setMainReviewsAC> | ReturnType<typeof setSearchAC> | ReturnType<typeof setCurrentReviewAC>| ReturnType<typeof setCurrentLikesAC>| ReturnType<typeof setLikesAC>

