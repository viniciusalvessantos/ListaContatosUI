import axios from 'axios';
import { Contatos } from '../types/Contatos';

const api = axios.create({
    baseURL: "https://localhost:8081/api/"
});

export const contatoApi = () => ({
    create: async (contato: Contatos) =>{
        try {
            const response = await api.post('/contatos/register', {
                nome: contato.nome,
                email: contato.email,
                telefone: contato.telefone,
                whatsApp: contato.whatsApp,
                pessoaId: contato.pessoaid,
            });
            return response.data;
        } catch (error) {
            console.error('Erro ao criar contato:', error);
            throw error;
        }
    },
    update:async (contatoId: string, contato: Contatos) =>{

        try {
            const response = await api.put(`/contatos/update/${contatoId}`, {
                nome: contato.nome,
                email: contato.email,
                telefone: contato.telefone,
                whatsApp: contato.whatsApp,
            });
            return response.data;
        } catch (error) {
            console.error('Erro ao atualizar contato:', error);
            throw error;
        }

    },
    delete:async (id:string) =>{
        try {
            const response = await api.delete('/contatos/delete', {
                data: { id: id },  // O corpo da requisição DELETE deve incluir o ID
            });
            return response.data;
        } catch (error) {
            console.error('Erro ao deletar contato:', error);
            throw error;
        }

    },
    visualiza:async (id:string) => {
        try {
            const response = await api.get(`/contatos/visualizar/${id}`);
            return response.data;
        } catch (error) {
            console.error('Erro ao visualizar contato:', error);
            throw error;
        }
    },
    list:async (id?: string) =>{
        try {
            const endpoint = id ? `/contatos/listar?id=${id}` : '/contatos/listar';
            const response = await api.get(endpoint);
            return response.data;
        } catch (error) {
            console.error('Erro ao listar contatos:', error);
            throw error;
        }


    }
});