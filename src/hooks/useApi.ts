import axios from 'axios';

const api = axios.create({
    baseURL: "https://localhost:53283"
});

export const useApi = () => ({

    validateToken: async (token:string) =>{
        return {
            user: { id: 3, name: 'Admin', email: 'admin@admin.com' }
        };
        const response = await api.post('/validate', { token });
        return response.data;
    },

    signin: async (username:string, password:string)=>{
        const response = await api.post('/api/usuarios/login', { username, password });  
        return {
            user: { id: 3, name: 'Admin', email: 'admin@admin.com' },
            token: response.data.token
        };      
        return response.data;
    },
    logout: async () => {
        return { status: true };
        const response = await api.post('/logout');
        return response.data;
    },
});