import { Pessoas } from "../Pessoas";

export type PessoasContextType = {
    pessoas: Pessoas | null;
    create: (nome: string, sobreNome: string, telefone: string, email: string) => Promise<string>;
    update: (id:string ,nome: string, sobreNome: string, telefone: string, email: string) => Promise<string>;
    delete: (id: string) => Promise<string>;
    list: () => Promise<Pessoas[]>;
}

