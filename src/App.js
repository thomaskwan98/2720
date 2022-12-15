import './App.css';
import { BrowserRouter, Route, Routes, Link} from "react-router-dom";
import { useState } from 'react';
import Login from './Login';
import User from './User';
import Admin from './Admin';

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
        </ul>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path='/user' element={<User/>} />
          <Route path='/admin' element={<Admin/>} />
        </Routes>
      </div>
    </BrowserRouter>

);

}


export default App;
