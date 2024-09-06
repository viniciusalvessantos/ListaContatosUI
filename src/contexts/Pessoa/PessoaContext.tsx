import { createContext } from "react";
import { PessoasContextType } from "../../types/contexttype/PessoasContextType";

export const PessoaContext = createContext<PessoasContextType>(null!);