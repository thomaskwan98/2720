 /**
 * CSCI2720/ESTR2106 Course Project
 * A Social Map of Events
 *
 * We declare that the assignment here submitted is original
 * except for source material explicitly acknowledged,
 * and that the same or closely related material has not been
 * previously submitted for another course.
 * We also acknowledge that we are aware of University policy and
 * regulations on honesty in academic work, and of the disciplinary
 * guidelines and procedures applicable to breaches of such
 * policy and regulations, as contained in the website.
 *
 * University Guideline on Academic Honesty:
 *   http://www.cuhk.edu.hk/policy/academichonesty
 * Faculty of Engineering Guidelines to Academic Honesty:
 *   https://www.erg.cuhk.edu.hk/erg/AcademicHonesty
 *
 * Student Name: TANG KING HEI <fill in for all members>
 * Student ID  : 1155126530 <fill in for all members>
 * Date        : 17/12/2022 <fill in yourself>

We have read the article carefully: http://www.cuhk.edu.hk/policy/academichonesty and include the required declaration

Group members:
TANG KING HEI 1155126530
ZIJUN QIU 1155160247
LIU YANG 1155141479
SU ZIE LEE 1155130593
KWAN LONG KIN 1155137891
LAI CHUEN FUNG 115514443
 */
 
 import React,{ Component} from "react";
 import './Login.css';
 import axios from 'axios';

class Login extends Component {
constructor(props){
  super(props);
  this.state={
    text:"",
    inputuser:"",
    inputpw:""
  }
}
     handleSubmit = e => {
      var result ="";
       e.preventDefault();
       if (!e.target.Username.value) {
         alert("Username is required");
       } else if (!e.target.Username.value) {
         alert("Valid Username is required");
       } else if (!e.target.password.value) {
         alert("Password is required");
       } else {
        var datas={
          name: e.target.Username.value,
          password:e.target.password.value
        }
        axios({
          url: "http://localhost:5000/login",
          method: "POST",
          data: datas
        }).then((res)=>{
          if(res.data.Identity ==="User"){
            sessionStorage.setItem("username", res.data.username);
            sessionStorage.setItem("Identity", "User");
            window.location.replace("http://localhost:3000/user");
          }else{
            sessionStorage.setItem("username", res.data.username);
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
     };
   
     handleClick = e => {
       e.preventDefault();
   
 
     };
   
     render() {
       return (
           <div>
             <div className="App">
                 <div class="form-body">
                     <div class="row">
                         <div class="form-holder">
                              <div class="form-content">
                                  <div class="form-items">
                                     <h3>Login page</h3>
                                     <div style={{color:'red'}}>{this.state.text}</div>
                                     <p>Fill in your user info</p>
                                     <form className="form" class="requires-validation" onSubmit={this.handleSubmit}>
                                         <div class="col-md-12">
                                              <div className="input-group">
                                                  <label htmlFor="Username">Username</label>
                                                  <input id="usernameinput" type="text" name="Username" placeholder="Username" />
                                              </div>
                                         </div>
                                         <br></br>
                                         <div class="col-md-12">
                                              <div className="input-group">
                                                  <label htmlFor="password">password</label>
                                                  <input id="Pwinput" type="password" name="password" />
                                              </div>
                                         </div>
                                         <br></br>
                                         <div class="form-button mt-3">
                                              <button className="primary">Enter</button>
                                         </div>
                                     </form>
                                  </div>
                              </div>
                         </div>
                     </div>
                 </div>
             </div>
         </div>
 
       );
     }
   }
   
   export default Login;
