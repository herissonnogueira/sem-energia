import React, { useState, useCallback } from 'react';
import { ChamadoController } from '../controllers/ChamadoController';

interface FormData {
  nome: string;
  endereco: string;
  bairro: string;
  cidade: string;
  estado: string;
  detalhes: string;
  cep: string;
}

const ChamadoForm = () => {
  const [formData, setFormData] = useState<FormData>({
    nome: '',
    endereco: '',
    bairro: '',
    cidade: '',
    estado: '',
    detalhes: '',
    cep: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [cepError, setCepError] = useState<string | null>(null);

  const chamadoController = new ChamadoController();

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));

      if (name === 'cep' && value.length === 8) {
        consultarCep(value);
      }
    },
    []
  );

  const consultarCep = async (cep: string) => {
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();

      if (data.erro) {
        throw new Error('CEP não encontrado.');
      }

      setFormData((prevState) => ({
        ...prevState,
        endereco: data.logradouro || '',
        bairro: data.bairro || '',
        cidade: data.localidade || '',
        estado: data.uf || '',
      }));

      setCepError(null);
    } catch (error) {
      setCepError('Erro ao buscar CEP. Verifique o número digitado.');
    }
  };

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setIsLoading(true);
      try {
        await chamadoController.criarChamado(formData);
        setFormData({
          nome: '',
          endereco: '',
          bairro: '',
          cidade: '',
          estado: '',
          detalhes: '',
          cep: '',
        });
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
      <h2>Registrar Novo Chamado</h2>
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
          <label htmlFor="cep">CEP:</label>
          <input
            type="text"
            id="cep"
            name="cep"
            value={formData.cep}
            onChange={handleChange}
            maxLength={8}
            placeholder="Digite o CEP"
            required
          />
          {cepError && <p style={{ color: 'red' }}>{cepError}</p>}
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
          <label htmlFor="cidade">Cidade:</label>
          <input
            type="text"
            id="cidade"
            name="cidade"
            value={formData.cidade}
            onChange={handleChange}
            required
          />
        </div>


        <div className="form-group">
          <label htmlFor="estado">Estado:</label>
          <input
            type="text"
            id="estado"
            name="estado"
            value={formData.estado}
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
