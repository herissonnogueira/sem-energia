import { supabase } from '../services/supabase';
import { Chamado } from '../models/Chamado';

export class ChamadoController {
  async criarChamado(chamado: Chamado): Promise<void> {
    const { error } = await supabase
      .from('chamados')
      .insert([chamado]);

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
}
