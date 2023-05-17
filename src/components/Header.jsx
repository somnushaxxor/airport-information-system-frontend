import { Link } from 'react-router-dom';
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

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
                <Nav >
                    <Nav.Link href="/employees">Employees</Nav.Link>
                </Nav>
                <Nav >
                    <Nav.Link href="/departments">Departments</Nav.Link>
                </Nav>
                <Nav className="me-auto">
                    <Nav.Link href="/brigades">Brigades</Nav.Link>
                </Nav>
            </Navbar>

        </header>
    )
}