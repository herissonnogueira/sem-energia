import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useState, useEffect } from 'react';
import { supabase } from '../services/supabase';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// ícone personalizado
const customIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

interface Chamado {
  id: number;
  nome: string;
  endereco: string;
  detalhes: string;
  latitude: number | null;
  longitude: number | null;
}

const MapChamados = () => {
  const [chamados, setChamados] = useState<Chamado[]>([]);

  useEffect(() => {
    const fetchChamados = async () => {
      const { data, error } = await supabase
        .from('chamados')
        .select('id, nome, endereco, detalhes, latitude, longitude');

      if (error) {
        console.error('Erro ao buscar chamados:', error.message);
      } else {
        setChamados(data || []);
      }
    };

    fetchChamados();
  }, []);

  return (
    <MapContainer center={[-23.55052, -46.633308]} zoom={10} style={{ height: '500px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {chamados
        .filter(chamado => chamado.latitude !== null && chamado.longitude !== null)
        .map((chamado) => (
          <Marker
            key={chamado.id}
            position={[chamado.latitude!, chamado.longitude!]}
            icon={customIcon} // usar o ícone personalizado
          >
            <Popup>
              <strong>{chamado.nome}</strong> <br />
              {chamado.endereco} <br />
              {chamado.detalhes}
            </Popup>
          </Marker>
        ))}
    </MapContainer>
  );
};

export default MapChamados;
