import { Usuarios } from "../Usuarios"

export type AuthContextType = {
    user: Usuarios | null;
    signin: (username: string, password: string) => Promise<boolean>;
    signout: () => void;
}