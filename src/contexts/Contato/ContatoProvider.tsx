import { ReactNode, useState } from "react";
import { Contatos } from "../../types/Contatos";
import { ContatoContext } from "./ContatoContext";
import { contatoApi } from "../../hooks/contatoApi";

// Criando o provider
export const ContatosProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [contatos, setContato] = useState<Contatos | null>(null);
    const [contatoslist, setContatos] = useState<Contatos[]>(null!);
    const api = contatoApi();
    const create = async (nome: string, email: string, telefone: string, whatsapp: string, pessoaid:string) => {
      // Aqui você pode chamar a API ou realizar a lógica para criar o contato
      const novoContato: Contatos = {
          nome: nome, email: email, telefone: telefone, whatsApp: whatsapp, pessoaid: pessoaid,

      };
       const data =  await api.create(novoContato);
      return data;
    };
  
    const update = async (id: string, nome: string, email: string, telefone: string, whatsapp: string) => {
      // Lógica para atualizar o contato
      
      return "";
    };
  
    const delet = async (id: string) => {
      // Lógica para deletar o contato
     
      return "";
    };
  
    const list = async (pessoaid?:string) => {
      // Aqui você poderia buscar os dados de uma API
      return contatoslist;
    };
  
    return (
      <ContatoContext.Provider value={{ contatos, create, update, delet, list }}>
        {children}
      </ContatoContext.Provider>
    );
  };