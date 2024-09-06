import { Contatos } from "../Contatos";

export type ContatosContextType = {
    contatos: Contatos | null;
    create: (nome: string, email: string, telefone: string, whatsapp: string, pessoaid:string) => Promise<string>;
    update: (id: string, nome: string, email: string, telefone: string, whatsapp: string) => Promise<string>;
    delet: (id: string) => Promise<string>;
    list: (pessoaid?:string) => Promise<Contatos[]>;
}
