/*
I declare my reference regarding the xml import @ https://therichpost.com/reactjs-read-xml-file-data-working-demo/
*/

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
    this.state = {venue:[],update:false,delete:false}      
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

Logout=(e)=>{
  console.log("asddasas");
  sessionStorage.clear();
  window.location.replace("http://localhost:3000");
};

render() {
  console.log(this.state.delete, this.state.update);
  if (!this.state.delete){
          //  delete
          axios({
            url: "http://localhost:5000/clean_location",
            method: "POST",
          }).then((res)=>{
            console.log(res.data);
     
        });
        // axios({
        //   url: "http://localhost:5000/clean_event",
        //   method: "POST",
        // }).then((res)=>{
        
          
        // }).catch(e=>{
         
        // });


    this.setState({delete:true});
  }
  if (this.state.delete ){
    if(!this.state.update){
      axios({
        url: "http://localhost:5000/xml",
        method: "POST",
      }).then((res)=>{
        var array=[];
  
        var text= res.data.substring(res.data.indexOf("<venues>")+8);
        var num=0;
        for(var i=0;i<text.split("</venue>").length - 2;i++){
   
          console.log(num);
          var temp;
          temp= text.substring(0, text.indexOf("</venue>")+8);
          var id = temp.substring(temp.indexOf("id=")+4, temp.indexOf(">")-1);
          var vene= temp.substring(temp.indexOf("<venuee><![CDATA[")+17, temp.indexOf("]]></venuee>"));
         if(temp.indexOf("<latitude>")>1){
         var lat = temp.substring(temp.indexOf("<latitude><![CDATA[")+19, temp.indexOf("]]></latitude>"));
         var long= temp.substring(temp.indexOf("<longitude><![CDATA[")+20, temp.indexOf("]]></longitude>"));
         num+=1;

  
        // upload
         axios({
          url: "http://localhost:5000/venue_upload",
          method: "POST",
          data: {
          id: id,
          vene:vene,
          lat:lat,
          long:long
          }
        }).then((res)=>{
          console.log(res);
          
        }).catch(e=>{
          console.log(e);
        });
         }
         
         text= text.substring(text.indexOf("</venue>")+8);
         this.setState({update:true});
        }
      
    
    }).catch(e=>{
    
    });

    axios({
      url: "http://localhost:5000/xml",
      method: "POST",
    }).then((res)=>{
      var array=[];
      
      var text= res.data.substring(res.data.indexOf("<venues>")+8);
      
      for(var i=0;i<text.split("</venue>").length - 2;i++){
        var temp;
        temp= text.substring(0, text.indexOf("</venue>")+8);
        var id = temp.substring(temp.indexOf("id=")+4, temp.indexOf(">")-1);
        var vene= temp.substring(temp.indexOf("<venuee><![CDATA[")+17, temp.indexOf("]]></venuee>"));
       if(temp.indexOf("<latitude>")>1){
       var lat = temp.substring(temp.indexOf("<latitude><![CDATA[")+19, temp.indexOf("]]></latitude>"));
       var long= temp.substring(temp.indexOf("<longitude><![CDATA[")+20, temp.indexOf("]]></longitude>"));

       console.log(id);
       console.log(vene);
       console.log(lat);
       console.log(long);
       //delete
       axios({
        url: "http://localhost:5000/clean_location",
        method: "POST",
      }).then((res)=>{
      
        
      }).catch(e=>{
       
      });
      // upload
       axios({
        url: "http://localhost:5000/venue_upload",
        method: "POST",
        data: {
        id: id,
        vene:vene,
        lat:lat,
        long:long
        }
      }).then((res)=>{
      
        
      }).catch(e=>{
       
      });
       }
       
       text= text.substring(text.indexOf("</venue>")+8);
      }
    

  }).catch(e=>{
 
    });

      this.setState({update:true});
    }

}

  console.log(sessionStorage.getItem("username"));
  console.log (sessionStorage.getItem("Identity"));
  let username = sessionStorage.getItem("username");
  let Identity = sessionStorage.getItem("Identity");
    if (Identity==="Admin") {
      window.location.replace("http://localhost:3000/admin");
    }else if(username===null){
      window.location.replace("http://localhost:3000");
    }
    
return (
  <div className="container">   
      <button onClick={this.Logout}>logout</button>
    <ul class="list-group"> 

    <></>
    {(this.state.venue.map((item, index) => {
    return (
    <>  
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
    </li>
    </>

    )}))}
    
    </ul>
  </div>
)
};
}

export default User;
