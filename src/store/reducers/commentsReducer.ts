import {AppThunk} from "../store";
import {CommentData, commentsAPI} from "../../api/comments-api";

export type CommentType = {
    review: string
    user: string
    text: string
    createdAt: string
    _id: string

}

const initialState = {
        comments: [] as CommentType[]
}

export type StateType = typeof initialState;

export const commentsReducer = (state: StateType = initialState, action: CommentsActionsType): StateType => {

    switch (action.type) {
        case 'comments/SET-COMMENTS': {
            return {...state, comments: action.data}
        }
        default:
            return state
    }
}

//actions
export const setCommentsAC = (data: CommentType[]) => {
    return {
        type: 'comments/SET-COMMENTS',
        data
    } as const
}



export const getCommentsTC = (reviewId: string): AppThunk => {
    return (dispatch) => {
        // dispatch(setAppStatusAC("loading"))
        commentsAPI.getComments(reviewId)
            .then(res => {
                console.log('res.data.comments', res.data.comments)
                dispatch(setCommentsAC(res.data.comments))
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

export const createCommentTC = (reviewId: string, data: CommentData): AppThunk => {
    return (dispatch) => {
        // dispatch(setAppStatusAC("loading"))
        commentsAPI.createComment(reviewId, data)
            .then(res => {

                dispatch(getCommentsTC(reviewId))
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

export const updateCommentTC = (reviewId: string, commentId: string, data: CommentData): AppThunk => {
    return (dispatch) => {
        // dispatch(setAppStatusAC("loading"))
        commentsAPI.updateComment(reviewId, commentId, data)
            .then(res => {

                dispatch(getCommentsTC(reviewId))
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
export const deleteCommentTC = (reviewId: string, commentId: string): AppThunk => {
    return (dispatch) => {
        // dispatch(setAppStatusAC("loading"))
        commentsAPI.deleteComment(reviewId, commentId)
            .then(res => {

                dispatch(getCommentsTC(reviewId))
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

export type CommentsActionsType = ReturnType<typeof setCommentsAC>
