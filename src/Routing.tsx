import React from "react";
import {Routes, Route, Navigate} from "react-router-dom";
import SearchPage from "./components/SearchPage/SearchPage";
import ProfilePage from "./components/ProfilePage/ProfilePage";
import ReviewPage from "./components/ReviewPage/ReviewPage";
import Test from "./testComponents/Test";
import {useAppSelector} from "./common/utils/hooks";
import HomePage from "./components/HomePage/HomePage";
import {GoogleAuth} from "./components/Auth/GoogleAuth";
import AdminPanel from "./components/AdminPanel/AdminPanel";

export const REVIEW_PAGE = '/review' //'/:userName/:reviewName'
export const PROFILE_PAGE = '/profile' //'/:userName
export const ADMIN_PANEL = '/admin-panel'

function Routing() {

    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const roles = useAppSelector(state => state.auth.user.roles)


    if (!isLoggedIn) {
        return <Routes>
            <Route path={`${REVIEW_PAGE}/:username/:review`} element={<ReviewPage />}/>
            <Route path={`${PROFILE_PAGE}/:username`} element={<ProfilePage />}/>
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
            {
                roles && roles.includes('ADMIN') &&
                <Route path={`${ADMIN_PANEL}`} element={<AdminPanel />}/>
            }
            <Route path={`${REVIEW_PAGE}/:username/:review`} element={<ReviewPage />}/>

            <Route path={`${PROFILE_PAGE}/:username`} element={<ProfilePage />}/>
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