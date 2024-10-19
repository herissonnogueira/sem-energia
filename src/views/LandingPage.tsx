import { useState } from 'react';
import ChamadoForm from './ChamadoForm';

const LandingPage = () => {
  const [showForm, setShowForm] = useState(false);

  const toggleForm = () => setShowForm(!showForm);

  const openWhatsApp = () => {
    window.open('https://wa.me/5521996019608?text=Olá, gostaria de reportar uma falta de energia no Estado de São Paulo', '_blank', 'noopener,noreferrer');
  };

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
              <i className="fas fa-bolt" aria-hidden="true"></i>
              Registrar falta de luz online
            </button>
            <button onClick={openWhatsApp} className="option-button whatsapp-button">
              <i className="fab fa-whatsapp" aria-hidden="true"></i>
              Registrar via WhatsApp
            </button>
            <a href="tel:08007272196" className="option-button phone-button">
              <i className="fas fa-phone" aria-hidden="true"></i>
              Ligar para 0800 72 72 196
            </a>
            <div className="app-links">
              <p>Baixe nosso app:</p>
              <a href="https://play.google.com/store/apps/details?id=br.com.trinitysolucoes.saemobile&hl=pt_BR" className="app-link" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-google-play" aria-hidden="true"></i> Google Play
              </a>
              <a href="https://apps.apple.com/br/app/enel-s%C3%A3o-paulo/id1033618336" className="app-link" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-apple" aria-hidden="true"></i> App Store
              </a>
            </div>
          </div>
        ) : (
          <ChamadoForm onBack={toggleForm} />
        )}
      </main>

      <footer>
        <p>Atendimento 24 horas por dia</p>
      </footer>

      <div className="info-sp">
        <p>Este serviço é destinado aos moradores do Estado de São Paulo atendidos pela Enel Distribuição São Paulo.</p>
      </div>
    </div>
  );
};

export default LandingPage;
