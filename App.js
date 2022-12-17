import ReactDOM from "react-dom/client";
import './App.css';
import { BrowserRouter, Route, Routes, Link, useLocation} from "react-router-dom";
import React, { useState } from 'react';
import Login from './Login';
import User from './User';
import Admin from './Admin';
import Dem from './dem';

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  function validateForm() {return email.length > 0 && password.length > 0;}
  function handleSubmit(event) { event.preventDefault();}

  return (
    // Login page
    // User page
    // Admin page
<BrowserRouter>
      <div>
        <ul>
          <li><Link to='/'>Login</Link></li>
          <li><Link to='/user'>User page</Link></li>
          <li><Link to='/admin'>Admin page</Link></li>
          <li><Link to='/dem'>Dem</Link></li>
        </ul>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path='/user' element={<User/>} />
          <Route path='/admin' element={<Admin/>} />
          <Route path='/dem' element={<Dem/>} />
          <Route path="/*" element={<NoMatch/>} />
        </Routes>
      </div>
    </BrowserRouter>

);
}


function Title(props)  {      //the Title component
  return (
    <header>
      <h1 className="display-4 text-center">{props.name}</h1>
    </header>
  );
}

function Admin() {
  return(
    <div>
      <Event_CRUD />
      <User_CRUD />
    </div>
  );
}

class Event_CRUD extends React.Component{
	render(){
	return(
		<>
		<h1>Admin Actions: CRUD Events</h1>
		<Router>
		<div>
		<ul>
			<LongLink to="/admin/eventCreate" label="Create Event"/>
			<LongLink to="/admin/events" label="Retrieve Event" />
			<LongLink to="/admin/eventUpdate" label="Update Event" />
			<LongLink to="/admin/eventDelete" label="Delete Event" />
		</ul>
		<hr/>
		<Switch>
		<Route exact path="/admin/eventCreate" component={eventCreate} /> 
		<Route exact path="/admin/events" component={eventsList} />   
		<Route exact path="/admin/eventUpdate" component={eventUpdate} />
		<Route exact path="/admin/eventDelete" component={eventDelete} />
		<Route path="/*" component={NoMatch} />
		</Switch>
		</div>
	</Router>
	</>
	)
	}
}

// class Event_CRUD extends React.Component {
//   render() {
//     {/* <> fragment for >1 components */}
//     return (
//       <>
//        <h1>Admin Actions: CRUD Events</h1>
//        <Router>
//         <div>
//           <ul>
//             <li><Link to='/admin/eventCreate'>Create Event</Link></li>
//             <li><Link to='/admin/events'>Retrieve Event</Link></li>
//             <li><Link to='/admin/eventUpdate'>Update Event</Link></li>
//             <li><Link to='/admin/eventDelete'>Delete Event</Link></li>
//           </ul>
//           <Routes>
//             <Route path='/admin/eventCreate' element={<eventCreate />}/>
//             <Route path='/admin/events' element={<eventsList/>}/>
//             <Route path='/admin/eventUpdate' element={<eventUpdate/>}/>
//             <Route path='/admin/eventDelete' element={<eventDelete/>}/>
//             <Route path='/*' element={<NoMatch/>}/>
//           </Routes>
//         </div>
//        </Router>
//       </>  
//     ); 
//   } 
// }

// class User_CRUD extends React.Component {
//   render() {
//     {/* <> fragment for >1 components */}
//     return (
//       <>
//        <h1>Admin Actions: CRUD Users</h1> 
//        <Router>
//         <div>
//           <ul>
//             <li><Link to='/admin/userCreate'>Create User</Link></li>
//             <li><Link to='/admin/users'>Retrieve User</Link></li>
//             <li><Link to='/admin/userUpdate'>Update User</Link></li>
//             <li><Link to='/admin/userDelete'>Delete User</Link></li>
//           </ul>
//           <Routes>
//             <Route path='/admin/userCreate' element={<userCreate/>}/>
//             <Route path='/admin/users' element={<usersList/>}/>
//             <Route path='/admin/userUpdate' element={<userUpdate/>}/>
//             <Route path='/admin/userDelete' element={<userDelete/>}/>
//             <Route path='/*' element={<NoMatch/>}/>
//           </Routes>
//         </div>
//        </Router>
//       </>  
//     );
//   }
// }

class User_CRUD extends React.Component{
	render(){
	return(
		<>
		<h1>Admin Actions: CRUD Users</h1>
		<Router>
		<div>
		<ul>
			<LongLink to="/admin/userCreate" label="Create User"/>
			<LongLink to="/admin/users" label="Retrieve User" />
			<LongLink to="/admin/userUpdate" label="Update User" />
			<LongLink to="/admin/userDelete" label="Delete User" />
		</ul>
		<hr/>
		<Switch>
		<Route exact path="/admin/userCreate" component={userCreate} /> 
		<Route exact path="/admin/users" component={usersList} />   
		<Route exact path="/admin/userUpdate" component={userUpdate} />
		<Route exact path="/admin/userDelete" component={userDelete} />
		<Route path="/*" component={NoMatch} />
		</Switch>
		</div>
	</Router>
	</>
	)
	}
}


function eventCreate() {
  return (
    <div>
      <h1>Create Events!</h1>
      <form action="http://localhost/admin/eventCreate" method="post">

      <label for="eventid">Event Id</label>
      <input type="text" id="eventid" name="eventId"/> 
      <br/>

      <label for="eventname">Event title</label>
      <input type="text" id="eventname" name="title"/> 
      <br/>

      <label for="eventloc">Venue Id</label>
      <input type="text" id="eventloc" name="locId"/>
      <br/>

      <label for="eventdate">Event date</label>
      <input type="text" id="eventdate" name="date"/>
      <br/>

      <label for="eventtime">Event time (duration)</label>
      <input type="text" id="eventtime" name="time"/>
      <br/>

      <label for="eventdesc">Event description</label>
      <input type="textarea" id="eventdesc" name="desc"/>
      <br/>

      <label for="eventorg">Event presenter</label>
      <input type="text" id="eventorg" name="org"/>
      <br/>

      <label for="eventprice">Event price</label>
      <input type="text" id="eventprice" name="price"/>
      <br/>

      <input type="submit"/>
      <br/>

      </form>
    </div>
  );
}

function eventsList() {
  return(
    <>
    </>
  );
}

function eventUpdate() {
  return(
  <div>
    <h1>Update Events!</h1>

      <form action="http://localhost/admin/eventUpdate" method="post">
      <label for="eventid">Event Id</label>
      <input type="text" id="eventid" name="eventIdU"/> 
      <br/>

      <label for="eventname">Event title</label>
      <input type="text" id="eventname" name="titleU"/> 
      <br/>

      <label for="eventloc">Venue Id</label>
      <input type="text" id="eventloc" name="locId"/>
      <br/>

      <label for="eventdate">Event date</label>
      <input type="text" id="eventdate" name="dateU"/>
      <br/>

      <label for="eventtime">Event time (duration)</label>
      <input type="text" id="eventtime" name="timeU"/>
      <br/>

      <label for="eventdesc">Event description</label>
      <input type="textarea" id="eventdesc" name="descU"/>
      <br/>

      <label for="eventorg">Event presenter</label>
      <input type="text" id="eventorg" name="orgU"/>
      <br/>

      <label for="eventprice">Event price</label>
      <input type="text" id="eventprice" name="priceU"/>
      <br/>

      <input type="submit"/>
      <br/>

      </form>
  </div>
  );
}

function eventDelete() {
  return(
  <div>
    <h1>Delete Events!</h1>

    <form action="http://localhost/admin/eventDelete" method="post">

    <label for="eventid">Type EventId to delete the event:</label>
    <input type="text" id="eventid" name="eventIdD"/>
    <br/> 

    <input type="submit"/>
    <br/>

    </form>
  </div>
  );
}

function userCreate(){
  return(
    <div>
      <h1>Create Users!</h1>

      <form action="http://localhost/admin/userCreate" method="post">

      <h3>Create New User!</h3>
      <label for="username">Username</label>
      <input type="text" id="username" name="username"/>
      <br/>

      <label for="userpw">Userpassword</label>
      <input type="text" id="userpw" name="password"/>
      <br/>

      <input type="submit"/>
      <br/>

      </form>
    </div>
  );
}


function usersList() {
  return(
    <>
    </>
  );
}

function userUpdate() {
  return(
  <div>
    <h1>Update Users!</h1>

    <form action="http://localhost/admin/userUpdate" method="post"> 

    <label for="username">Username</label>
    <input type="text" id="username" name="usernameU"/> 
    <br/>

    <label for="userpw">Userpassword</label>
    <input type="text" id="userpw" name="passwordU"/>
    <br/>

    <input type="submit"/>
    <br/>

    </form>
  </div>
  );
}

function userDelete() {
  return(
  <div>
    <h1>Delete Users!</h1>

    <form action="http://localhost/admin/userDelete" method="post">

    <label for="username">Type Username to delete the user:</label>
    <input type="text" id="username" name="usernameD"/>
    <br/>

    <input type="submit"/>
    <br/>

    </form>
  </div>
  );
}


function NoMatch() {       //for invalid paths
  let location = useLocation();
  return (
    <div>
      <h3>
        No match for <code>{location.pathname}</code>
      </h3>
    </div>
  );
}




const root = ReactDOM.createRoot(document.querySelector('#app'));
root.render(<App name="A Social Map of Events"/>);
//export default App;
