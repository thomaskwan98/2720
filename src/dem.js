import React, { useEffect, useState } from "react";
import axios from 'axios';



const dem=()=> {
   
    function a() {

        axios({
            url: "http://localhost:5000/xmlEvent",
            method: "POST",
          }).then((res)=>{
         
            var num=0;
            var text= res.data.substring(res.data.indexOf("<events>")+8);
            for(var i=0;i<text.split("</event>").length - 2;i++){
              var temp;
              temp= text.substring(0, text.indexOf("</event>")+8);
              
              var eventId = temp.substring(temp.indexOf("id=")+4, temp.indexOf(">")-1);
              
              var title= temp.substring(temp.indexOf("<titlee><![CDATA[")+17, temp.indexOf("]]></titlee>"));
  
              var venu = temp.substring(temp.indexOf("<venueid><![CDATA[")+18, temp.indexOf("]]></venueid>"));
  
              var date =  temp.substring(temp.indexOf("<predateE><![CDATA[")+19, temp.indexOf("]]></predateE>"));
              var time =  temp.substring(temp.indexOf("<progtimee><![CDATA[")+20, temp.indexOf("]]></progtimee>"));
              var description=temp.substring(temp.indexOf("<desce><![CDATA[")+16, temp.indexOf("]]></desce>"));
  
              var presenter=temp.substring(temp.indexOf("<presenterorge><![CDATA[")+24, temp.indexOf("]]></presenterorge>"));
              var price=temp.substring(temp.indexOf("<pricee><![CDATA[")+17, temp.indexOf("]]></pricee>"));
             
              if(temp.indexOf("<desce><![CDATA[")>1 && temp.indexOf("<presenterorge><![CDATA[")>1){
                console.log(eventId);
                console.log(title);
                console.log(venu);
                console.log(description);
                console.log(date);
                console.log(time);
                console.log(presenter);
                console.log(price);

                axios({
                  url: "http://localhost:5000/events_upload",
                  method: "POST",
                  data: {
                    eventId: eventId,
                    title:title,
                    venue:venu,
                    description:description,
                    date:date,
                    time:time,
                    presenter:presenter,
                    price:price
                  }
                }).then((res)=>{
         
                  
    
                  console.log(res);
                  
                }).catch(e=>{
                  console.log(e);
                });
              }
             
         
  
             text= text.substring(text.indexOf("</event>")+8);
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