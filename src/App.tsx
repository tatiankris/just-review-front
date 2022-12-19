import React, {useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './components/HomePage/Home';
import {AppBar, Backdrop} from "@mui/material";
import Header from "./components/Header";
import Routing from "./Routing";
import {useAppDispatch, useAppSelector} from "./common/utils/hooks";
import {authTC} from "./store/reducers/authReducer";
import {CircularProgress} from "@mui/joy";


function App() {
    const dispatch = useAppDispatch();
    const status = useAppSelector(state => state.app.appStatus)

    useEffect(() => {
        dispatch(authTC())
    }, [])

    return (
        <div id={'appid'} className="App">
            <Backdrop open={status === 'loading'} sx={{color: '#fff', zIndex: 10}}>
                <CircularProgress />
            </Backdrop>
            <Header />
            <Routing/>


        </div>
    );

}

export default App;
