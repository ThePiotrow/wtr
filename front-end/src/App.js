import './App.css';
import { Route, Link, Routes } from 'react-router-dom';
import SignIn from './components/SignIn';
import Home from './components/Home';
import SignUp from './components/SignUp';


function App() {
  return (
    <div className="App">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/signin">SignIn</Link>
        </li>
        <li>
          <Link to="/signup">signup</Link>
        </li>
      </ul>


      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/rooms" />
      </Routes>
    </div >
  );
}

export default App;
