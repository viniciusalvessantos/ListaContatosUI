import { createContext } from "react";
import { ContatosContextType } from "../../types/contexttype/ContatosContextType";

export const ContatoContext = createContext<ContatosContextType>(null!);