import {AnyAction, applyMiddleware, combineReducers, createStore } from 'redux';
import thunk, {ThunkAction, ThunkDispatch } from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {authReducer} from "./reducers/authReducer";
import {appReducer} from "./reducers/appReducer";
import {reviewsReducer} from "./reducers/reviewsReducer";

const rootReducer = combineReducers({
    app: appReducer,
    auth: authReducer,
    reviews: reviewsReducer
});

export const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
);

export type AppRootStateType = ReturnType<typeof rootReducer>;
export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AnyAction>;

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AnyAction>;