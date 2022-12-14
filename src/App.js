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
        <Routes>
          <Route path="/" element={<Login />} />
          
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
