import {ReviewActionsType, ReviewType, setCurrentReviewAC, setReviewsAC} from "./reviewsReducer";
import {AppThunk} from "../store";
import {reviewsAPI} from "../../api/review-api";
import {tagsAPI} from "../../api/tags-api";
import {setAppStatusAC} from "./appReducer";


const initialState = {
    categories: [] as Array<{title: string}>,
    tags: [] as Array<{title: string}>
}

export type StateType = typeof initialState;

export const tagsReducer = (state: StateType = initialState, action: TagsActionsType): StateType => {

    switch (action.type) {
        case 'tags/SET-CATEGORIES': {
            return {...state, categories: action.categories}
        }
        case 'tags/SET-TAGS': {
            return {...state, tags: action.tags}
        }
        default:
            return state
    }
}

export const setCategoriesAC = (categories: Array<{title: string}>) => {
    return {
        type: 'tags/SET-CATEGORIES',
        categories
    } as const
}

export const setTagsAC = (tags: Array<{title: string}>) => {
    return {
        type: 'tags/SET-TAGS',
        tags
    } as const
}

export const getCategoriesTC = (): AppThunk => {
    return (dispatch) => {
        dispatch(setAppStatusAC("loading"))
        tagsAPI.getCategories()
            .then(res => {
                console.log('categories', res.data.categories)
                dispatch(setCategoriesAC(res.data.categories))

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
export const getTagsTC = (): AppThunk => {
    return (dispatch) => {
        dispatch(setAppStatusAC("loading"))
        tagsAPI.getTags()
            .then(res => {
                console.log('tags', res.data.tags)
                dispatch(setTagsAC(res.data.tags))

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


export type TagsActionsType = ReturnType<typeof setCategoriesAC> | ReturnType<typeof setTagsAC>