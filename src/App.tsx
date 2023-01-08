import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import {AppBar, Backdrop} from "@mui/material";
import Header from "./components/Header";
import Routing from "./Routing";
import {useAppDispatch, useAppSelector} from "./common/utils/hooks";
import {authTC, googleAuthTC} from "./store/reducers/authReducer";
import {CircularProgress} from "@mui/joy";
import {useMediaQuery} from "react-responsive";
import {setLangAC, setThemeAC} from "./store/reducers/appReducer";
import {useTranslation} from "react-i18next";


function App() {
    const dispatch = useAppDispatch();
    const status = useAppSelector(state => state.app.appStatus)
    const isInitialize = useAppSelector(state => state.auth.isInitializeApp)
    const language = useAppSelector(state => state.app.language)
    // const google = useAppSelector(state => state.auth.googleAuth)
    const theme = useAppSelector(state => state.app.mode)

    const { i18n } = useTranslation();

    useEffect(() => {
        dispatch(authTC())

        if (localStorage.getItem('lang')) {
            dispatch(setLangAC(String(localStorage.getItem('lang'))))
            i18n.changeLanguage(String(localStorage.getItem('lang')))
        } else {
            i18n.changeLanguage(language)
        }
        if (localStorage.getItem('theme')) {
            console.log('THEME', localStorage.getItem('theme'))
            dispatch(setThemeAC(localStorage.getItem('theme') === 'false' ? false : true))
            document.body.setAttribute('theme', String(localStorage.getItem('theme')))
        } else {
            document.body.setAttribute('theme', String(theme))
        }

    }, [])


    return (
        <div id={'appid'} className="App">
            <Backdrop open={status === 'loading' || !isInitialize} sx={{color: '#fff', zIndex: 10}}>
                <CircularProgress />
            </Backdrop>
            <Header/>
            {/*<div id={"signInDiv"}></div>*/}
            <Routing/>


        </div>

    );

}

export default App;
