import {AppThunk} from "../store";
import {reviewsAPI, userAPI} from "../../api/review-api";
import {getCategoriesTC, getTagsTC} from "./tagsReducer";
import {getAuthorTC, setReviewsAC} from "./reviewsReducer";
import {setAppStatusAC} from "./appReducer";

type UserType = {
    userId: string
    email: string
    username: string
    avatar: string
    likes: Array<{_id: string, reviewId: string, userId: string}>
    ratings: Array<{_id: string, reviewId: string, userId: string, rating: number}>
}
const initialState = {
    user: {} as UserType
}

export type StateType = typeof initialState;

export const userReducer = (state: StateType = initialState, action: UserActionsType): StateType => {

    switch (action.type) {
        case 'user/SET-USER': {
            return {...state, user: action.user}
        }
        default:
            return state
    }
}

//actions
export const setUserAC = (user: UserType) => {
    return {
        type: 'user/SET-USER',
        user
    } as const
}

export const getUserTC = (username: string): AppThunk => {
    return (dispatch) => {
        dispatch(setAppStatusAC("loading"))
        userAPI.user (username)
            .then(res => {
                dispatch(setUserAC(res.data.user))
                dispatch(getAuthorTC(username))
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



export type UserActionsType = ReturnType<typeof setUserAC>

