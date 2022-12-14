

const initialState = {

}

export type StateType = typeof initialState;

export const appReducer = (state: StateType = initialState, action: AppActionsType): StateType => {

    switch (action.type) {
        case 'auth/SET': {
            return {...state}
        }
        default:
            return state
    }
}

//actions
export const setAC = () => {
    return {
        type: 'auth/SET',
    } as const
}

export type AppActionsType = ReturnType<typeof setAC>

