import { useState, useCallback, ChangeEvent, FormEvent } from 'react';
import { ChamadoController } from '../controllers/ChamadoController';
import { Chamado } from '../models/Chamado';
import { cidadesSP } from '../utils/cidadesSP';

interface ChamadoFormProps {
  onBack: () => void;
}

const ChamadoForm = ({ onBack }: ChamadoFormProps) => {
  const [formData, setFormData] = useState<Chamado>({
    nome: '',
    endereco: '',
    bairro: '',
    cidade: '',
    estado: 'SP',
    detalhes: '',
    cep: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [cepError, setCepError] = useState<string | null>(null);
  const [isLoadingCep, setIsLoadingCep] = useState(false);

  const chamadoController = new ChamadoController();

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    if (name === 'cep' && value.length === 8) {
      consultarCep(value);
    }
  }, []);

  const consultarCep = async (cep: string) => {
    setCepError(null);
    setIsLoadingCep(true);
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      
      if (!response.ok) {
        throw new Error('Falha na conexão com o serviço de CEP');
      }

      const data = await response.json();

      if (data.erro) {
        throw new Error('CEP não encontrado');
      }

      if (data.uf !== 'SP') {
        throw new Error('CEP não pertence ao Estado de São Paulo');
      }

      setFormData((prevState) => ({
        ...prevState,
        endereco: data.logradouro || '',
        bairro: data.bairro || '',
        cidade: data.localidade || '',
        estado: 'SP',
      }));
    } catch (error) {
      setFormData((prevState) => ({
        ...prevState,
        endereco: '',
        bairro: '',
        cidade: '',
        estado: 'SP',
      }));

      if (error instanceof Error) {
        setCepError(error.message);
      } else if (error instanceof TypeError && error.message === 'Failed to fetch') {
        setCepError('Falha na conexão. Verifique sua internet e tente novamente.');
      } else {
        setCepError('Erro ao buscar CEP. Por favor, verifique o número digitado e tente novamente.');
      }
    } finally {
      setIsLoadingCep(false);
    }
  };

  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
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
      <h2>Registrar Falta de Luz</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            id="nome"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            required
            placeholder="Nome completo"
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            id="cep"
            name="cep"
            value={formData.cep}
            onChange={handleChange}
            maxLength={8}
            placeholder="CEP"
            required
          />
          {isLoadingCep && <p className="loading-message">Buscando CEP...</p>}
          {cepError && <p className="error-message">{cepError}</p>}
        </div>
        <div className="form-group">
          <input
            type="text"
            id="endereco"
            name="endereco"
            value={formData.endereco}
            onChange={handleChange}
            required
            placeholder="Endereço"
          />
        </div>
        <div className="form-group">
          <select
            id="cidade"
            name="cidade"
            value={formData.cidade}
            onChange={handleChange}
            required
          >
            <option value="" disabled>Selecione a cidade</option>
            {cidadesSP.map((cidade) => (
              <option key={cidade} value={cidade}>
                {cidade}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <input
            type="text"
            id="bairro"
            name="bairro"
            value={formData.bairro}
            onChange={handleChange}
            required
            placeholder="Bairro"
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            id="estado"
            name="estado"
            value={formData.estado}
            onChange={handleChange}
            required
            placeholder="Estado"
          />
        </div>
        <div className="form-group">
          <textarea
            id="detalhes"
            name="detalhes"
            value={formData.detalhes}
            onChange={handleChange}
            required
            placeholder="Detalhes do problema"
          />
        </div>
        <div className="form-buttons">
          <button type="button" onClick={onBack} className="back-button">
            Voltar
          </button>
          <button type="submit" disabled={isLoading} className="submit-button">
            {isLoading ? 'Enviando...' : 'Enviar Chamado'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChamadoForm;
