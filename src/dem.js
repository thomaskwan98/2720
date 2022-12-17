import React, { useEffect, useState } from "react";
import axios from 'axios';



const dem=()=> {
   
    function a() {

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
        



 
        };  

  return (
    <>   
     <div>dem</div>
     <button onClick={a()} >gg</button>
    </>


  )
}

export default dem