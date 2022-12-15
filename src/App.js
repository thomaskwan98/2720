import './App.css';
import { BrowserRouter, Route, Routes, Link} from "react-router-dom";
import { useState } from 'react';
import Login from './Login';
import User from './User';
import Admin from './Admin';

function App() {

  return (
    // Login page
    // User page
    // Admin page
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
      </div>
    </BrowserRouter>

);
}


export default App;