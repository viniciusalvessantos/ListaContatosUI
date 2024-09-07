import axios from 'axios';
import { Pessoas } from '../types/Pessoas';
const getToken = () => {
    return localStorage.getItem('authToken'); // Ajuste conforme necessário
};

const api = axios.create({
    baseURL: "https://apitestevaga-g5gndmhudefbevgb.brazilsouth-01.azurewebsites.net/api/"
});

export const pessoaApi = () => ({
    create: async (pessoa: Pessoas) => {
        try {
            const token = getToken();
            const response = await api.post('/pessoas/register', {
                nome: pessoa.nome,
                sobreNome: pessoa.sobreNome,
                telefone: pessoa.telefone,
                email: pessoa.email
            },  {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            return response.data;
        } catch (error) {
            console.error('Erro ao criar pessoa:', error);
            throw error;
        }
    },
    update: async (pessoaId: string, pessoa: Pessoas) => {
        try {
            const token = getToken();
            const response = await api.put(`/pessoas/update/${pessoaId}`, {
                nome: pessoa.nome,
                sobreNome: pessoa.sobreNome,
                telefone: pessoa.telefone,
                email: pessoa.email
            },  {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            return response.data;
        } catch (error) {
            console.error('Erro ao atualizar pessoa:', error);
            throw error;
        }
    },
    delete: async (pessoaId: string) => {
        try {
            const token = getToken();
            const response = await api.delete(`/pessoas/delete`, {
                headers: {
                    Authorization: `Bearer ${token}`, // Adiciona o token de autorização
                },
                data: { id: pessoaId },  // Inclui o ID da pessoa no corpo da requisição
            });
            return response.data;
        } catch (error) {
            console.error('Erro ao deletar pessoa:', error);
            throw error;
        }
    },
    list: async () => {
        try {
            const token = getToken();
            const response = await api.get('/pessoas/listar',  {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            return response.data;
        } catch (error) {
            console.error('Erro ao listar pessoas:', error);
            throw error;
        }
    },
    visualizar: async (pessoaId: string) => {
        try {
            const token = getToken();
            const response = await api.get(`/pessoas/visualizar/${pessoaId}`,  {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            return response.data;
        } catch (error) {
            console.error('Erro ao visualizar pessoa:', error);
            throw error;
        }
    }
});