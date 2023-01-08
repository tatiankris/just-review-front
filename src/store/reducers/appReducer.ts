
export type AppStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
const initialState = {
    appStatus: 'idle',
    mode: false,
    language: 'en'
}

export type StateType = typeof initialState;

export const appReducer = (state: StateType = initialState, action: AppActionsType): StateType => {

    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, appStatus: action.status}
        case 'APP/SET-THEME':
            return {...state, mode: action.value}
        case 'APP/SET-LANG':
            return {...state, language: action.value}

        default:
            return state
    }
}

//actions
export const setAppStatusAC = (status: AppStatusType) => ({type: 'APP/SET-STATUS', status} as const)
export const setThemeAC = (value: boolean) => ({type: 'APP/SET-THEME', value} as const)
export const setLangAC = (value: 'ru' | 'en' | string) => ({type: 'APP/SET-LANG', value} as const)
export type AppActionsType = ReturnType<typeof setAppStatusAC> | ReturnType<typeof setThemeAC> | ReturnType<typeof setLangAC>

