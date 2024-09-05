import axios from 'axios';

const api = axios.create({
    baseURL: "https://localhost:63576"
});

export const pessoaApi = () => ({
    signin: async (username:string, password:string)=>{
        const response = await api.post('/api/usuarios/login', { username, password });        
        return response.data;
    },
    logout: async () => {
        return { status: true };
        const response = await api.post('/logout');
        return response.data;
    },
});