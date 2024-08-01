import axios from 'axios';

const API_URL = 'http://localhost:3333';

export const fetchBffData = async () => {
  try {
    const response = await axios.get(`${API_URL}/bff`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar os dados do BFF:', error);
    throw error;
  }
};
