import React from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";
import { LOGIN_ROUTE } from "../../utils/consts";
import { Context } from '../../Context';

const NavBar = () => {
    const navigate = useNavigate();
    const [isAuth, setIsAuth] = React.useContext(Context)

    function logout (event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        setIsAuth(false)
    };

    React.useEffect(()=>{
        if (!isAuth) {
            navigate(LOGIN_ROUTE);
        }
    }, [isAuth])

    function CreateNavBar() {
    return (
        <Navbar bg="light" expand="lg">
        <Container>
            <Navbar.Brand href="#home">Динамика</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
                <Nav.Link href="#home">Главная</Nav.Link>
                {/* <Nav.Link href="#link">Link</Nav.Link> */}
                {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                    Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                    Separated link
                </NavDropdown.Item>
                </NavDropdown> */}
                <Button variant="dark" onClick={logout}>Выход</Button>
            </Nav>
            </Navbar.Collapse>
        </Container>
        </Navbar>
    );
    }

    return(
        <div>
            {CreateNavBar()}
        </div>
    )
};

export default NavBar;