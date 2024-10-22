import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LandingPage from './views/LandingPage';
import MapChamados from './views/MapChamados';

function App() {
  return (
    <>
      <LandingPage />
      <MapChamados />
      <ToastContainer />
    </>
  );
}

export default App;
