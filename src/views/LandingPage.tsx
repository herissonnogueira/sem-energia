import { useState, useCallback } from 'react';
import ChamadoForm from './ChamadoForm';

const LandingPage = () => {
  const [showForm, setShowForm] = useState(false);

  const toggleForm = useCallback(() => setShowForm(prevState => !prevState), []);

  return (
    <div className="landing-page">
      <header>
        <h1>Falta de luz no Estado de São Paulo?</h1>
        <p className="subtitle">Saiba como registrar ocorrências em todo o estado paulista</p>
      </header>

      <main>
        {!showForm ? (
          <div className="options">
            <button onClick={toggleForm} className="option-button">
              <i className="fas fa-bolt"></i>
              Registrar falta de luz online
            </button>
          </div>
        ) : (
          <ChamadoForm onBack={toggleForm} />
        )}
      </main>

      <footer>
        <p>Este serviço é destinado aos moradores da Grande São Paulo. Em breve para todo o Brasil!</p>
      </footer>
    </div>
  );
};

export default LandingPage;
