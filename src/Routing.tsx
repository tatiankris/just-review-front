import React from "react";
import {Routes, Route, Navigate} from "react-router-dom";
import Home from "./components/HomePage/Home";
import ProfilePage from "./components/ProfilePage/ProfilePage";
import ReviewPage from "./components/ReviewPage/ReviewPage";
import Test from "./Test";

export const REVIEW_PAGE = '/review-page' //'/:userName/:reviewName'
export const PROFILE_PAGE = '/profile-page' //'/:userName
function Routing() {

    return (

        <Routes>
            <Route path={REVIEW_PAGE} element={<ReviewPage />}/>
            <Route path={PROFILE_PAGE} element={<ProfilePage />}/>
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