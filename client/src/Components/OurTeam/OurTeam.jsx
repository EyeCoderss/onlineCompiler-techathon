import React from "react";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Navb from "../Navbar/Navb";
import aditya from "./aditya.jpg";
import apurv from "./apurv.jpeg";
import aayush from "./aayush.jpeg";
import abhinav from "./abhinav.jpeg";
import './OurTeam.css';

function OurTeam(){
    return(
        <>
        <Navb/>
        <div className="cards-container">
    <Card style={{ width: '18rem' ,padding:'0px',border:'0px'}}>
      <Card.Img variant="top" src={abhinav} style={{padding:'0px',border:'0px',height:'400px'}} />
      <Card.Body>
        <Card.Title>Abhinav Mishra</Card.Title> 
      </Card.Body>
    </Card>
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={apurv}style={{padding:'0px',border:'0px',height:'400px'}} />
      <Card.Body>
        <Card.Title>Apurv Kumar</Card.Title> 
      </Card.Body>
    </Card>
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={aditya} style={{padding:'0px',border:'0px',height:'400px'}}/>
      <Card.Body>
        <Card.Title>Aditya Bhardwaj</Card.Title> 
      </Card.Body>
    </Card>
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={aayush} style={{padding:'0px',border:'0px',height:'400px'}}/>
      <Card.Body>
        <Card.Title>Aayush Garg</Card.Title> 
      </Card.Body>
    </Card>
    </div>
   </>
    )
}

export default OurTeam;