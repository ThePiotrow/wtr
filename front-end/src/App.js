import './App.css';
import { Route, Link, Routes } from 'react-router-dom';
import ViewHome from './views/ViewHome';
import ViewSignIn from './views/ViewSignIn';
import ViewSignUp from './views/ViewSignUp';
import ViewRooms from './views/ViewRooms';
import ViewConfirmEmail from './views/ViewConfirmEmail';
import ViewRoom from './views/ViewRoom';
import SocketIO from 'socket.io-client';
import ViewChat from './views/ViewChat';
import PrimarySearchAppBar from './components/PrimarySearchAppBar';
import useToken from './useToken';
import CssBaseline from '@material-ui/core/CssBaseline';

const socket = SocketIO('http://localhost:3000');

function App() {
  const { token, setToken } = useToken();

  return (
    <div className="App">
      <CssBaseline />
      <PrimarySearchAppBar />
      <Routes>
        <Route path="/" element={<ViewHome />} />
        <Route path="/signin" element={<ViewSignIn />} />
        <Route path="/signup" element={<ViewSignUp />} />
        <Route path="/chat" element={<ViewChat socket={socket} />} />
        <Route path="/room/:id" element={<ViewRoom socket={socket} />} />
        <Route path="/room/:id" element={<ViewRoom />} />
        <Route path="/rooms" element={<ViewRooms socket={socket} />} />
        <Route path="/confirm" element={<ViewConfirmEmail />} />
      </Routes>
    </div >
  );
}

export default App;
