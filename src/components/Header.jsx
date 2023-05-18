import { Link } from 'react-router-dom';
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from 'react-bootstrap/NavDropdown';

export default function Header() {
    return (
        <header>
            <div className="header-title">
                <Link to="/">
                    <img width={143} height={149} src="/img/plane.png" alt="Logo" />
                </Link>
                Airport Information System
            </div>

            <Navbar className="header-menu" bg="primary">
                <Nav className="me-auto">
                    <NavDropdown title="Employees">
                        <NavDropdown.Item href="/employees">Employees</NavDropdown.Item>
                        <NavDropdown.Item href="/specializations">Specializations</NavDropdown.Item>
                    </NavDropdown>
                    <Nav.Link href="/departments">Departments</Nav.Link>
                    <Nav.Link href="/brigades">Brigades</Nav.Link>
                </Nav>
            </Navbar>

        </header>
    )
}