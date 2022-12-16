import './User.css';
import XMLData from './Data/venues.xml';
import axios from 'axios';
import React, { useState } from 'react';

import dataEventDates from './Data/eventDates.xml';
import dataEvents from './Data/events.xml';
import dataVenues from './Data/venues.xml';
import XMLParser from 'react-xml-parser';

const convert = require("xml2js");

class User extends React.Component{
  constructor(props) {
    super(props);
    this.state = {venue:[],}      
  }
componentDidMount() {
 //get data request
  axios.get(XMLData, {
  "Content-Type": "application/xml; charset=utf-8"
   }).then(res => {
    //Storing users detail in state array object
    const jsonDataFromXml = new XMLParser().parseFromString(res.data);
    this.setState({ venue: jsonDataFromXml.getElementsByTagName('venuee') })
  }); 
}

render() {
return (
  <div className="container">   
    <ul class="list-group"> 
    {(this.state.venue.map((item, index) => {
    return (
    <li class="list-group-item">
      <div class="wrapper">
        <div class="link_wrapper">
          <a href="#">{item.value}</a>
          <div class="icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 268.832 268.832">
              <path d="M265.17 125.577l-80-80c-4.88-4.88-12.796-4.88-17.677 0-4.882 4.882-4.882 12.796 0 17.678l58.66 58.66H12.5c-6.903 0-12.5 5.598-12.5 12.5 0 6.903 5.597 12.5 12.5 12.5h213.654l-58.66 58.662c-4.88 4.882-4.88 12.796 0 17.678 2.44 2.44 5.64 3.66 8.84 3.66s6.398-1.22 8.84-3.66l79.997-80c4.883-4.882 4.883-12.796 0-17.678z"/>
            </svg>
          </div>
        </div>
      </div>

      {/*
      <div class="center">
        <a href="#" class="button">
        {item.value}
        </a>
      </div>  
      */}

    </li>
    )}))}
    </ul>
  </div>
)
};
}

function User_() {
  const [data, setData] = useState(Array.from({ length: 10 }, v => Array.from({ length: 5 }, v => null)));

  var parseString = convert.parseString;

  axios.get(XMLData, {
    "Content-Type": "application/xml; charset=utf-8"
  }).then(response => {
    parseString(response.data, (err, result) => {
      if(err) {
       //Do something
      } else {
        let copy = [...data];
        var i =0;
        var j=0;
        for (const key in result) {
          var dataset=result[key];
          for (const key in dataset) {
            var venueSet =dataset[key];
            for (const key in venueSet) {
              var venue = venueSet[key];
              for (const key in venue) {
                var detail = venue[key];
                for (const key in detail) {
                  if(i<4){
                    copy[j][i]=detail[key];
                    i+=1;
                  }else{
                    i=0;
                    j+=1;
                  }
                }
              }
            }
          }
        }
        setData(copy);
     }
    });        
  })

  function print(i){
    return(
    <div>
      <div>
      {data[0][1]}
      <br></br>
      {data[0][2]}
      </div>
    </div>);
  }

  
//make table

  return (
    <div className="User">
      <header className="User-header">
        <div>{print(0)}</div>
      </header>
    </div>
  );
}

export default User;