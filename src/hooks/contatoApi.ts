import axios from 'axios';
import { Contatos } from '../types/Contatos';

const api = axios.create({
    baseURL: "https://apitestevaga-g5gndmhudefbevgb.brazilsouth-01.azurewebsites.net/api/"
});

const getToken = () => {
    return localStorage.getItem('authToken'); // Ajuste conforme necessário
};

export const contatoApi = () => ({
    create: async (contato: Contatos) => {
        try {
            const token = getToken();
            const response = await api.post('/contatos/register', {
                nome: contato.nome,
                email: contato.email,
                telefone: contato.telefone,
                whatsApp: contato.whatsApp,
                pessoaId: contato.pessoaid,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            return response.data;
        } catch (error) {
            console.error('Erro ao criar contato:', error);
            throw error;
        }
    },
    update: async (contatoId: string, contato: Contatos) => {

        try {
            const token = getToken();
            const response = await api.put(`/contatos/update/${contatoId}`, {
                nome: contato.nome,
                email: contato.email,
                telefone: contato.telefone,
                whatsApp: contato.whatsApp,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            return response.data;
        } catch (error) {
            console.error('Erro ao atualizar contato:', error);
            throw error;
        }

    },
    delete: async (id: string) => {
        try {
            const token = getToken();
            const response = await api.delete('/contatos/delete', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                data: { id: id },  // Inclui o ID no corpo da requisição
            });
            return response.data;
        } catch (error) {
            console.error('Erro ao deletar contato:', error);
            throw error;
        }

    },
    visualiza: async (id: string) => {
        try {
            const token = getToken();
            const response = await api.get(`/contatos/visualizar/${id}`,  {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            return response.data;
        } catch (error) {
            console.error('Erro ao visualizar contato:', error);
            throw error;
        }
    },
    list: async (id?: string) => {
        try {
            const token = getToken();
            const endpoint = id ? `/contatos/listar?id=${id}` : '/contatos/listar';
            const response = await api.get(endpoint, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            return response.data;
        } catch (error) {
            console.error('Erro ao listar contatos:', error);
            throw error;
        }


    }
});