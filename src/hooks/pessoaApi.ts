import axios from 'axios';

const api = axios.create({
    baseURL: "https://localhost:63576"
});

export const pessoaApi = () => ({
    create: async () =>{},
    update:async () =>{},
    delete:async () =>{},
    list:async () =>{}
});