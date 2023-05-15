import { Link } from 'react-router-dom';
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";

export default function Header() {
    return (
        <header>
            <div className="header-icon">
                <Link to="/">
                    <img width={143} height={149} src="/img/plane.png" />
                </Link>
                <div className="header-info">
                    <h3>Airport Information System</h3>
                </div>
            </div>

            <Navbar style={{ padding: 10, marginTop: 20, fontSize: 25 }} bg="primary" variant="dark">
                <Container>
                    <Navbar.Brand ></Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link style={{ paddingInlineEnd: 65 }} href="/employees">Employees</Nav.Link>
                    </Nav>
                    <Nav className="me-auto">
                        <Nav.Link style={{ paddingInlineEnd: 65 }} href="/departments">Departments</Nav.Link>
                    </Nav>
                    <Nav className="me-auto">
                        <Nav.Link style={{ paddingInlineEnd: 65 }} href="/brigades">Brigades</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>

            <br />
        </header>
    )
}