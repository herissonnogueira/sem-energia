import React, { useState, useCallback } from 'react';
import { ChamadoController } from '../controllers/ChamadoController';

interface FormData {
  nome: string;
  endereco: string;
  bairro: string;
  detalhes: string;
}

const ChamadoForm = () => {
  const [formData, setFormData] = useState<FormData>({
    nome: '',
    endereco: '',
    bairro: '',
    detalhes: '',
  });

  const [isLoading, setIsLoading] = useState(false);

  const chamadoController = new ChamadoController();

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData(prevState => ({
        ...prevState,
        [name]: value,
      }));
    },
    []
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setIsLoading(true);
      try {
        await chamadoController.criarChamado(formData);
        setFormData({ nome: '', endereco: '', bairro: '', detalhes: '' });
        alert('Chamado registrado com sucesso!');
      } catch (error) {
        console.error('Erro ao registrar chamado:', error);
        alert('Erro ao registrar chamado. Por favor, tente novamente.');
      } finally {
        setIsLoading(false);
      }
    },
    [formData, chamadoController]
  );

  return (
    <div className="chamado-form">
      <h2>Registrar falta de energia</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nome">Nome:</label>
          <input
            type="text"
            id="nome"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="endereco">Endereço:</label>
          <input
            type="text"
            id="endereco"
            name="endereco"
            value={formData.endereco}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="bairro">Bairro:</label>
          <input
            type="text"
            id="bairro"
            name="bairro"
            value={formData.bairro}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="detalhes">Detalhes:</label>
          <textarea
            id="detalhes"
            name="detalhes"
            value={formData.detalhes}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Enviando...' : 'Enviar Chamado'}
        </button>
      </form>
    </div>
  );
};

export default ChamadoForm;
