import { Button, Container, Form, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import './Header.css'
import { AuthContextType } from "../../types/contexttype/AuthContextType";
export const Header = ({ handleLogout, auth }: { handleLogout: () => void, auth: AuthContextType }) => {
    return (
        <header>
            <Navbar expand="lg" className="custom-navbar" >
                <Container fluid>
                    <Navbar.Brand as={Link} to="/" className="brand-style">[Logo]</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav className="mx-auto navbar-nav-center" navbarScroll>
                            <Nav.Link className="white-text" as={Link} to="/">HOME</Nav.Link>
                            <Nav.Link className="white-text" as={Link} to="/pessoas">PESSOAS</Nav.Link>
                            <Nav.Link className="white-text" as={Link} to="/contatos">CONTATOS</Nav.Link>
                        </Nav>
                        <Form className="d-flex navbar-buttons">
                            {!auth.user ? (
                               <></> 
                            ) : (
                                <Button onClick={handleLogout} className="custom-button">Sair</Button>
                            )}
                        </Form>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
}