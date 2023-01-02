import React, {useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import {AppBar, Backdrop} from "@mui/material";
import Header from "./components/Header";
import Routing from "./Routing";
import {useAppDispatch, useAppSelector} from "./common/utils/hooks";
import {authTC, googleAuthTC} from "./store/reducers/authReducer";
import {CircularProgress} from "@mui/joy";
import {useMediaQuery} from "react-responsive";

// declare var google: any;

function App() {
    const dispatch = useAppDispatch();
    const status = useAppSelector(state => state.app.appStatus)
    // const google = useAppSelector(state => state.auth.googleAuth)


    // useEffect(() => {
    //     console.log('app google', google)
    //     if (google) {
    //
    //         dispatch(googleAuthTC())
    //     }
    // }, [google])

    // function handleCallbackResponse(response: any) {
    //     console.log('encoded JWT ID token:' + response.credential)
    // }
    // useEffect(() => {
    //
    //     google.accounts.id.initialize({
    //         client_id: "301022637814-i3noevnhjjh0rn88avi7p3d0q5m6hucj.apps.googleusercontent.com",
    //         callback: handleCallbackResponse
    //     })
    //
    //     google.accounts.id.renderButton(
    //         document.getElementById("signInDiv"),
    //         { theme: "outline", size: "large"  , zIndex: '1000000'}
    //     )
    // }, [])

    useEffect(() => {
        dispatch(authTC())
    }, [])


    return (
        <div id={'appid'} className="App">
            <Backdrop open={status === 'loading'} sx={{color: '#fff', zIndex: 10}}>
                <CircularProgress />
            </Backdrop>
            <Header/>
            {/*<div id={"signInDiv"}></div>*/}
            <Routing/>


        </div>
    );

}

export default App;
