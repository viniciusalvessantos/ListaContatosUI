import axios from 'axios';
import { Pessoas } from '../types/Pessoas';


const api = axios.create({
    baseURL: "https://localhost:8081/api/"
});

export const pessoaApi = () => ({
    create: async (pessoa: Pessoas) => {
        try {
            const response = await api.post('/pessoas/register', {
                nome: pessoa.nome,
                sobreNome: pessoa.sobreNome,
                telefone: pessoa.telefone,
                email: pessoa.email
            });
            return response.data;
        } catch (error) {
            console.error('Erro ao criar pessoa:', error);
            throw error;
        }
    },
    update: async (pessoaId: string, pessoa: Pessoas) => {
        try {
            const response = await api.put(`/pessoas/update/${pessoaId}`, {
                nome: pessoa.nome,
                sobreNome: pessoa.sobreNome,
                telefone: pessoa.telefone,
                email: pessoa.email
            });
            return response.data;
        } catch (error) {
            console.error('Erro ao atualizar pessoa:', error);
            throw error;
        }
    },
    delete: async (pessoaId: string) => {
        try {
            const response = await api.delete(`/pessoas/delete`, {
                data: { id: pessoaId },
            });
            return response.data;
        } catch (error) {
            console.error('Erro ao deletar pessoa:', error);
            throw error;
        }
    },
    list: async () => {
        try {
            const response = await api.get('/pessoas/listar');
            return response.data;
        } catch (error) {
            console.error('Erro ao listar pessoas:', error);
            throw error;
        }
    },
    visualizar: async (pessoaId: string) => {
        try {
            const response = await api.get(`/pessoas/visualizar/${pessoaId}`);
            return response.data;
        } catch (error) {
            console.error('Erro ao visualizar pessoa:', error);
            throw error;
        }
    }
});