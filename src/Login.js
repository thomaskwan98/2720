import React,{ Component} from "react";
import './Login.css';

class Login extends Component {

    handleSubmit = e => {
      e.preventDefault();
      console.log(e.target.Username.value);
  
      if (!e.target.Username.value) {
        alert("Username is required");
      } else if (!e.target.Username.value) {
        alert("Valid Username is required");
      } else if (!e.target.password.value) {
        alert("Password is required");
      } else if (
//CheckDB 
1
      ) {
        alert("Successfully logged in");
//check identity
      } else {
        alert("Wrong email or password combination");
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
                                    <p>Fill in your user info</p>
                                    <form className="form" class="requires-validation" onSubmit={this.handleSubmit}>
                                        <div class="col-md-12">
                                             <div className="input-group">
                                                 <label htmlFor="Username">Username</label>
                                                 <input type="text" name="Username" placeholder="Username" />
                                             </div>
                                        </div>
                                        <div class="col-md-12">
                                             <div className="input-group">
                                                 <label htmlFor="password">password</label>
                                                 <input type="password" name="password" />
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