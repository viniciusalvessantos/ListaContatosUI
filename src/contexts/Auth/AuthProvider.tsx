import { useCallback, useEffect, useState } from "react";
import { useApi } from "../../hooks/useApi";
import { Usuarios } from "../../types/Usuarios";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({children} : {children: JSX.Element}) => {
    const [user, setUser] = useState<Usuarios | null>(null);
    const api = useApi();

    const validateToken = useCallback(async () => {
        const storageData = localStorage.getItem('authToken');
        if (storageData) {
            const data = await api.validateToken(storageData);
            if (data.user) {
                setUser(data.user);
            }
        }
    }, []);
    
    useEffect(() => {
        validateToken();
    }, [validateToken]);


    const signin = async (email: string, password: string) => {
        const data = await api.signin(email, password);
     
        if (data.user && data.token) {
            setUser(data.user);
            setToken(data.token);
            return true;
        }
        return false;
    }

    const signout = async () => {
        console.log("signout está sendo executada.");
        setUser(null);
        setToken('');
        await api.logout();
    }

    const setToken = (token: string) => {
        localStorage.setItem('authToken', token);
    }

    return (
        <AuthContext.Provider value={{user, signin, signout}}>
            {children}
        </AuthContext.Provider>
    );
}