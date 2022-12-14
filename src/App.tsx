import React, {useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './components/HomePage/Home';
import {AppBar} from "@mui/material";
import Header from "./components/Header";
import Routing from "./Routing";
import {useAppDispatch} from "./common/utils/hooks";
import {authTC} from "./store/reducers/authReducer";


function App() {

    const dispatch = useAppDispatch();
    
    useEffect(() => {
        dispatch(authTC())
    }, [])

  return (
    <div id={'appid'} className="App">

            <Header />
            <Routing/>


    </div>
  );
}

export default App;
