import { Link } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

export default function Header() {
    return (
        <header>
            <div className="header-title">
                <Link to="/">
                    <img width={143} height={149} src="/img/plane.png" alt="Plane" />
                </Link>
                Airport Information System
            </div>

            <Navbar className="header-menu" bg="primary">
                <Nav className="me-auto">
                    <NavDropdown title="Staff">
                        <NavDropdown.Item href="/employees">Employees</NavDropdown.Item>
                        <NavDropdown.Item href="/specializations">Specializations</NavDropdown.Item>
                        <NavDropdown.Item href="/employees/attributes">Attributes</NavDropdown.Item>
                        <NavDropdown.Item href="/employees/attributes/values">Attribute values</NavDropdown.Item>
                        <NavDropdown.Item href="/pilots-medical-examinations">Pilots medical examinations</NavDropdown.Item>
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
                    <NavDropdown title="Flights">
                        <NavDropdown.Item href="/routes">Routes</NavDropdown.Item>
                        <NavDropdown.Item href="/flights">Flights</NavDropdown.Item>
                        <NavDropdown.Item href="/flights/categories">Flight categories</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Navbar>

        </header>
    )
}