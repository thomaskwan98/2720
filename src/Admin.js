
import { optionGroupUnstyledClasses } from '@mui/base';
import React, { Component } from 'react';
import { Link } from "react-router-dom";
class Admin extends Component {
  


  Logout=(e)=>{
    console.log("asddasas");
    sessionStorage.clear();
    window.location.replace("http://localhost:3000");
  };

render(){


  let username = sessionStorage.getItem("username");
  let Identity = sessionStorage.getItem("Identity");
    if (Identity==="User") {
			window.location.replace("http://localhost:3000/user");
		}else if(username===null){
			window.location.replace("http://localhost:3000");
    }
  return (
    <div className="Admin">
      <header className="Admin-header">
      </header>
    <button onClick={this.Logout}>logout</button>
    </div>
  );
}
 


}

export default Admin;