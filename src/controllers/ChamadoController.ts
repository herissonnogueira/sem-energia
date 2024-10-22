import { supabase } from '../services/supabase';
import { Chamado } from '../models/Chamado';

export class ChamadoController {
  async criarChamado(chamado: Chamado): Promise<void> {
    const coordenadas = await this.buscarCoordenadas(`${chamado.endereco}, ${chamado.cidade}, ${chamado.estado}`);

    const chamadoComCoordenadas = {
      ...chamado,
      latitude: coordenadas?.latitude || null,
      longitude: coordenadas?.longitude || null,
    };

    const { error } = await supabase
      .from('chamados')
      .insert([chamadoComCoordenadas]);

    if (error) {
      throw new Error('Erro ao criar chamado: ' + error.message);
    }
  }

  async listarChamados(): Promise<Chamado[]> {
    const { data, error } = await supabase
      .from('chamados')
      .select('*')
      .order('createdAt', { ascending: false });

    if (error) {
      throw new Error('Erro ao listar chamados: ' + error.message);
    }
    return data || [];
  }

  private async buscarCoordenadas(endereco: string): Promise<{ latitude: number; longitude: number } | null> {
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(endereco)}`);
      const data = await response.json();

      if (data.length > 0) {
        return {
          latitude: parseFloat(data[0].lat),
          longitude: parseFloat(data[0].lon),
        };
      }
      return null;
    } catch (error) {
      console.error('Erro ao buscar coordenadas:', error);
      return null;
    }
  }
}
