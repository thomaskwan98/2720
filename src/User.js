import './User.css';
import XMLData from './Data/venues.xml';
import axios from 'axios';
import React, { useState } from 'react';

import dataEventDates from './Data/eventDates.xml';
import dataEvents from './Data/events.xml';
import dataVenues from '.Data/venues.xml';
import XMLParser from 'react-xml-parser';

const convert = require("xml2js");

class User extends React.Component{
  constructor(props) {
    super(props);
    this.state = {venue:[],}      
  }
componentDidMount() {
 //get data request
  axios.get('/Data/venues.xml', {
    "Content-Type": "application/xml; charset=utf-8"
   }).then(res => {
    //Storing users detail in state array object
    const jsonDataFromXml = new XMLParser().parseFromString(res.data);
    this.setState({ venue: jsonDataFromXml.getElementsByTagName('venuee') })
  }); 
}

render() {
return (
  <div className="container p-5">   
    <ul class="list-group"> 
    {(this.state.venue.map((item, index) => {
    return (<li class="list-group-item">{item.value}</li>)}))}
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