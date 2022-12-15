import './App.css';
import { BrowserRouter, Route, Routes} from "react-router-dom";
import Login from './Login';
import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./Login.css";


function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  function validateForm() {return email.length > 0 && password.length > 0;}
  function handleSubmit(event) { event.preventDefault();}

  return (
    // Login page
    // User page
    // Admin page
    <div className="Login">
      <Form onSubmit={handleSubmit}>
        <Form.Group size="lg" controlId="email">
          <Form.Label>Email </Form.Label>
          <Form.Control autoFocus type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
        </Form.Group>
        <Form.Group size="lg" controlId="password">
          <Form.Label>Password </Form.Label>
          <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
        </Form.Group>
        <Button block size="lg" type="submit" disabled={!validateForm()}>Login</Button>
      </Form>
      {/*
      <BrowserRouter>
        <div>
          <Routes>
            <Route path="/" element={<Login />} />
          </Routes>
        </div>
      </BrowserRouter>
      */}
    </div>
);
}

export default App;
