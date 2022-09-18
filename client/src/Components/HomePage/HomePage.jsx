import React from "react";
import Navb from "../Navbar/Navb";
import codeimg from'./code.webp';
import { useNavigate } from "react-router-dom";
import './HomePage.css';

function HomePage(){
    let navigate = useNavigate(); 
  const routeChange = () =>{ 
    let path = `CodeEditor`; 
    navigate(path);
  }
    return(<>
    <Navb/>
      <div className="content-image-container">
        <div className="content-container">
           <h3>--- YOUR BEST CHOICE</h3>
           <h2>Programming in iNeuron Code-Editor</h2>
           <p>This Code Editor is Built in 24 Hour with shear dedication and perseverence at iNeuron TECH-A-THON(India's Largest Hackathon) hosted at JECRC University</p>
           <button className="getStarted" onClick={routeChange}>Get Started!</button>
        </div>
        <div className="image-container">
            <img src={codeimg} alt="code-snippet"/>
        </div>
      </div>
    </>)
}

export default HomePage;