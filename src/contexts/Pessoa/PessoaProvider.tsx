import { ReactNode, useState } from "react";
import { Pessoas } from "../../types/Pessoas";
import { PessoaContext } from "./PessoaContext";
import { pessoaApi } from "../../hooks/pessoaApi";

// Criando o provider
export const PessoasProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [pessoas, setPessoas] = useState<Pessoas | null>(null);
    const [pessoaslist, setPessoaslist] = useState<Pessoas[]>(null!);
    const api = pessoaApi();
    const create = async (nome: string, sobreNome: string, telefone: string, email: string) => {
      // Lógica para criar uma nova pessoa
      const novaPessoa: Pessoas = { 
        nome: nome, 
        sobrenome: sobreNome, 
        telefone: telefone, 
        email: email, 
      };
      const data = await api.create(novaPessoa);
      return data;
    };
  
    const update = async (id: string, nome: string, sobreNome: string, telefone: string, email: string) => {
      // Lógica para atualizar uma pessoa existente
     
      return 'Pessoa atualizada com sucesso';
    };
  
    const deletePessoa = async (id: string) => {
      // Lógica para deletar uma pessoa
     
      return 'Pessoa deletada com sucesso';
    };
  
    const list = async () => {
      // Lógica para listar as pessoas (poderia ser de uma API)
      return pessoaslist;
    };
  
    return (
      <PessoaContext.Provider value={{ pessoas, create, update, delete: deletePessoa, list }}>
        {children}
      </PessoaContext.Provider>
    );
  };
  