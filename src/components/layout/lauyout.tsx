import { useContext } from "react";
import { AuthContext } from "../../contexts/Auth/AuthContext";
import { Header } from "../header/Header";

export const Layout = ({ children }: { children: JSX.Element }) => {
    const auth = useContext(AuthContext);
    const handleLogout = async () => {
        await auth.signout();
        //window.location.href = window.location.href;
    }
    return (
        <>
           <Header handleLogout = {handleLogout} auth={auth} />
            <main>
                {children}
            </main>
        </>
    );
}