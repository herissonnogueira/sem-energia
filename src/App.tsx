import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LandingPage from './views/LandingPage';

function App() {
  return (
    <>
      <LandingPage />
      <ToastContainer />
    </>
  );
}

export default App;
