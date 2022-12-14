import {authAPI, LoginDataType, RegisterDataType} from "../../api/auth-api";
import {AppThunk} from "../store";
import {light} from "@mui/material/styles/createPalette";

type UserData = {
    id: string
    email: string
    username: string
    avatar: string
    roles: Array<string>
}

let initialState = {
    isLoggedIn: false,
    user: {} as UserData
}
export type StateType = typeof initialState;

export const authReducer = (state: StateType = initialState, action: AuthActionsType): StateType => {

    switch (action.type) {
        case 'auth/SET-IS-LOGGED-IN': {
            return {...state, isLoggedIn: true, user: action.user}
        }
        case 'auth/SET-IS-LOGOUT': {
            localStorage.removeItem('token')
            console.log('Logout is OK')
            const newState = {...state, isLoggedIn: false, user: {} as UserData}
            return newState
        }
        default:
            return state
    }
}

//actions
export const loginAC = (user: UserData) => {
    return {
        type: 'auth/SET-IS-LOGGED-IN',
        user
    } as const
}
export const logoutAC = () => {
    return {
        type: 'auth/SET-IS-LOGOUT',
    } as const
}

//thunks
export const loginTC = (data: LoginDataType): AppThunk => {
    return (dispatch) => {
        // dispatch(setAppStatusAC("loading"))
        authAPI.login(data)
            .then(res => {
                let user = {
                    id: res.data.user._id,
                    email: res.data.user.email,
                    username: res.data.user.username,
                    avatar: res.data.user.avatar,
                    roles: res.data.user.roles
                } as UserData
                console.log('user', user)
                dispatch(loginAC(user))

                localStorage.setItem('token', res.data.token)
                // console.log('token', res.data.token)
            })
            .then(() =>{
                // dispatch(getReviewsTC())
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

export const registerTC = (data: RegisterDataType): AppThunk => {
    return (dispatch) => {
        // dispatch(setAppStatusAC("loading"))
        authAPI.registration(data)
            .then(res => {
                if (res.status === 200) {

                    let loginData = {
                        email: data.email,
                        password: data.password
                    } as LoginDataType

                    console.log('loginData', loginData)

                    dispatch(loginTC(loginData))

                } else {
                    console.log(res)
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

export const authTC = (): AppThunk => {
    return (dispatch) => {
        // dispatch(setAppStatusAC("loading"))

        authAPI.me()
            .then(res => {
                let user = {
                    id: res.data.user._id,
                    email: res.data.user.email,
                    username: res.data.user.username,
                    avatar: res.data.user.avatar,
                    roles: res.data.user.roles
                } as UserData
                console.log('auth me user', user)
                dispatch(loginAC(user))

                // dispatch(getReviewsTC())
                localStorage.setItem('token', res.data.token)
            })
            .catch(err => {
                console.log('error', err.data.message)
                localStorage.removeItem('token')
            })
            .finally(() => {
                    // dispatch(setAppStatusAC("succeeded"))
                }
            )
    }
}


export type AuthActionsType = ReturnType<typeof loginAC> | ReturnType<typeof logoutAC>
