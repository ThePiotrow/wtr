import './App.css';
import { Route, Link, Routes } from 'react-router-dom';
import ViewHome from './views/ViewHome';
import ViewSignIn from './views/ViewSignIn';
import ViewSignUp from './views/ViewSignUp';
import ViewRooms from './views/ViewRooms';
import ViewConfirmEmail from './views/ViewConfirmEmail';
import ViewRoom from './views/ViewRoom';
import socketIO from 'socket.io-client';

const socket = socketIO('http://localhost:3001');
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
        <li>
          <Link to="/rooms">rooms</Link>
        </li>
      </ul>


      <Routes>
        <Route path="/" element={<ViewHome />} />
        <Route path="/signin" element={<ViewSignIn />} />
        <Route path="/signup" element={<ViewSignUp />} />
        <Route path="/room/:id" element={<ViewRoom />}/>
        <Route path="/rooms" element={<ViewRooms socket={socket}/>}/>
        <Route path="/confirm" element={<ViewConfirmEmail />}/>
      </Routes>
    </div >
  );
}

export default App;
