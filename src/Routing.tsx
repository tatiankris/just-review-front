import React from "react";
import {Routes, Route, Navigate} from "react-router-dom";
import Home from "./components/HomePage/Home";
import ProfilePage from "./components/ProfilePage/ProfilePage";
import ReviewPage from "./components/ReviewPage/ReviewPage";
import Test from "./Test";
import {useAppSelector} from "./common/utils/hooks";

export const REVIEW_PAGE = '/review' //'/:userName/:reviewName'
export const PROFILE_PAGE = '/profile' //'/:userName


function Routing() {

    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

    if (!isLoggedIn) {
        return <Routes>
            <Route path={`${REVIEW_PAGE}/:username/:review`} element={<ReviewPage />}/>
            <Route path={`${PROFILE_PAGE}/:username`} element={<ProfilePage />}/>
            <Route path={'/test'} element={<Test />}/>
            <Route path="/" element={<Home/>} />
            <Route
                path="*"
                element={<Navigate to={"/"} replace />}
            />
        </Routes>
    }
    return (

        <Routes>
            <Route path={`${REVIEW_PAGE}/:username/:review`} element={<ReviewPage />}/>
            <Route path={`${PROFILE_PAGE}/:username`} element={<ProfilePage />}/>

            <Route path={'/test'} element={<Test />}/>
            <Route path="/" element={<Home/>} />
            <Route
                path="*"
                element={<Navigate to={"/"} replace />}
            />
        </Routes>
    )
}

export default Routing;