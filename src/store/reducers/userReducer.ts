import {AppThunk} from "../store";
import {reviewsAPI, userAPI} from "../../api/review-api";
import {getCategoriesTC, getTagsTC} from "./tagsReducer";
import {getAuthorTC, ReviewType, setReviewsAC} from "./reviewsReducer";
import {setAppStatusAC} from "./appReducer";

type UserType = {
    userId: string
    email: string
    username: string
    avatar: string
    likes: Array<{_id: string, reviewId: string, userId: string}>
    reviews: Array<ReviewType>
    roles: Array<string>
}

type AdminsUser = {
    userId: string
    email: string
    username: string
    avatar: string
}
const initialState = {
    user: {} as UserType,
    users: [] as Array<AdminsUser>
}

export type StateType = typeof initialState;

export const userReducer = (state: StateType = initialState, action: UserActionsType): StateType => {

    switch (action.type) {
        case 'user/SET-USER': {
            return {...state, user: action.user}
        }
        case 'user/SET-ADMINS-USERS': {
            return {...state, users: action.users}
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
export const setAdminsUsersAC = (users: Array<AdminsUser>) => {
    return {
        type: 'user/SET-ADMINS-USERS',
        users
    } as const
}

export const getUserTC = (username: string): AppThunk => {
    return (dispatch) => {
        dispatch(setAppStatusAC("loading"))
        userAPI.user (username)
            .then(res => {
                dispatch(setUserAC(res.data.user))
                dispatch(getAuthorTC(username, '-1', 'null', 'null', 'null'))
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
export const getUsersTC = (): AppThunk => {
    return (dispatch) => {
        dispatch(setAppStatusAC("loading"))
        userAPI.users()
            .then(res => {

                dispatch(setAdminsUsersAC(res.data.users))
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



export type UserActionsType = ReturnType<typeof setUserAC> | ReturnType<typeof setAdminsUsersAC>

