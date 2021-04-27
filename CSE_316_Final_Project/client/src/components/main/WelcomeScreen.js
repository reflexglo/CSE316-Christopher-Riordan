import React from 'react';
import logo from './globe.jpg';

const WelcomeScreen = () =>{
    return(
        <>
       <img className="logo" src={logo}></img>
       <br></br>
       <div className="welcome">
           Welcome To The <br></br>
           World Data Mapper
       </div>
       </>
    );
}
export default WelcomeScreen;