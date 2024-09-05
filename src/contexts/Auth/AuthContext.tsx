import { createContext } from "react";
import { AuthContextType } from "../../types/contexttype/AuthContextType";
export const AuthContext = createContext<AuthContextType>(null!);