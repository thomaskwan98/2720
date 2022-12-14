import React,{ Component} from "react";

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
        <div className="App">
          <form className="form" onSubmit={this.handleSubmit}>
            <div className="input-group">
              <label htmlFor="Username">Username</label>
              <input type="text" name="Username" placeholder="Username" />
            </div>
            <div className="input-group">
              <label htmlFor="password">password</label>
              <input type="password" name="password" />
            </div>
            <button className="primary">Enter</button>
          </form>
        </div>
      );
    }
  }
  
  export default Login;