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
