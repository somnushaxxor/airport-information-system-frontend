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
                    <NavDropdown title="Staff">
                        <NavDropdown.Item href="/employees">Employees</NavDropdown.Item>
                        <NavDropdown.Item href="/specializations">Specializations</NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown title="Departments">
                        <NavDropdown.Item href="/departments">Departments</NavDropdown.Item>
                        <NavDropdown.Item href="/departments/chief-appointment">
                            Department chief appointment
                        </NavDropdown.Item>
                        <NavDropdown.Item href="/departments/chief-removal">
                            Department chief removal
                        </NavDropdown.Item>
                    </NavDropdown>
                    <Nav.Link href="/brigades">Brigades</Nav.Link>
                    <NavDropdown title="Airplanes">
                        <NavDropdown.Item href="/airplanes">Airplanes</NavDropdown.Item>
                        <NavDropdown.Item href="/airplanes/models">Models</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Navbar>

        </header>
    )
}