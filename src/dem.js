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
              var venc = temp.substring(temp.indexOf("<venuec><!")+10, temp.indexOf("></venuec>"));
              var vene= temp.substring(temp.indexOf("<venuee><!")+10, temp.indexOf("></venuee>"));
             if(temp.indexOf("<latitude>")>1){
             var lat = temp.substring(temp.indexOf("<latitude><!")+12, temp.indexOf("></latitude>"));
             var long= temp.substring(temp.indexOf("<longitude><!")+13, temp.indexOf("></longitude>"));
             console.log(lat);
             console.log(long);
             console.log(id);
             console.log(venc);
             console.log(vene);
             axios({
              url: "http://localhost:5000/venue_upload",
              method: "POST",
              data: {
              id: id,
              venc:venc,
              vene:vene,
              lat:lat,
              long:long
              }
            }).then((res)=>{
              if(res.data.Identity ==="User"){
                sessionStorage.setItem("username", res.data.username);
                sessionStorage.setItem("Identity", "User");
                window.location.replace("http://localhost:3000/user");
              }else{
                sessionStorage.setItem("Identity", "Admin");
                window.location.replace("http://localhost:3000/admin");
              }
            }).catch(e=>{
              let result = (e.response.data);
              console.log(e);
              if (result === "no this user"){
                this.setState({text:"Wrong User acc!"});
                document.getElementById("usernameinput").value="";
                document.getElementById("Pwinput").value="";
                console.log(this.state.text);
              }else if(result === "wrongPw"){
                this.setState({text:"Wrong Password!!"})
                document.getElementById("Pwinput").value="";
              }
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