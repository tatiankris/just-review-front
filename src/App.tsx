import React from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './components/HomePage/Home';
import {AppBar} from "@mui/material";
import Header from "./components/Header";
import Routing from "./Routing";


function App() {
  return (
    <div id={'appid'} className="App">

            <Header />
            <Routing/>


    </div>
  );
}

export default App;
