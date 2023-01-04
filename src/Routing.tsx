import React from "react";
import {Routes, Route, Navigate} from "react-router-dom";
import SearchPage from "./components/SearchPage/SearchPage";
import ProfilePage from "./components/ProfilePage/ProfilePage";
import ReviewPage from "./components/ReviewPage/ReviewPage";
import Test from "./testComponents/Test";
import {useAppSelector} from "./common/utils/hooks";
import HomePage from "./components/HomePage/HomePage";
import {GoogleAuth} from "./components/Auth/GoogleAuth";

export const REVIEW_PAGE = '/review' //'/:userName/:reviewName'
export const PROFILE_PAGE = '/profile' //'/:userName


function Routing() {

    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

    if (!isLoggedIn) {
        return <Routes>
            <Route path={`${REVIEW_PAGE}/:username/:review`} element={<ReviewPage />}/>
            <Route path={`${PROFILE_PAGE}/:username`} element={<ProfilePage />}/>
            <Route path={'/test'} element={<Test />}/>
            <Route path={'/google'} element={<GoogleAuth />}/>
            {/*<Route path="/search" element={<SearchPage/>} />*/}
            <Route path="/home" element={<HomePage/>} />
            <Route
                path="*"
                element={<Navigate to={"/home"} replace />}
            />
        </Routes>
    }
    return (

        <Routes>
            <Route path={`${REVIEW_PAGE}/:username/:review`} element={<ReviewPage />}/>
            <Route path={`${PROFILE_PAGE}/:username`} element={<ProfilePage />}/>

            <Route path={'/test'} element={<Test />}/>
            {/*<Route path="/search" element={<SearchPage/>} />*/}
            <Route path="/home" element={<HomePage/>} />
            <Route
                path="*"
                element={<Navigate to={"/home"} replace />}
            />
        </Routes>
    )
}

export default Routing;