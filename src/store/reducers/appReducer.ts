
export type AppStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
const initialState = {
    appStatus: 'idle'
}

export type StateType = typeof initialState;

export const appReducer = (state: StateType = initialState, action: AppActionsType): StateType => {

    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, appStatus: action.status}

        default:
            return state
    }
}

//actions
export const setAppStatusAC = (status: AppStatusType) => ({type: 'APP/SET-STATUS', status} as const)

export type AppActionsType = ReturnType<typeof setAppStatusAC>

