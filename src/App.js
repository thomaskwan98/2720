import './App.css';
import { BrowserRouter, Route, Routes} from "react-router-dom";

import Login from './Login';

function App() {
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
