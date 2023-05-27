import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Badge from "react-bootstrap/Badge"
import { Button, Form, Row, Col } from "react-bootstrap";
import { sendError, sendSuccess, errorMessage } from "../../shared/components/NotificationManager";
import ticketService from "../../shared/services/ticket.service";
import flightService from "../../shared/services/flight.service";
import genderService from "../../shared/services/gender.service";


export default function Tickets() {
    const [flights, setFlights] = useState([]);
    const [genders, setGenders] = useState([]);

    const [tickets, setTickets] = useState([]);

    const [flightId, setFlightId] = useState("");
    const [genderId, setGenderId] = useState("");
    const [ageInYears, setAgeInYears] = useState("");

    useEffect(() => {
        init();
    }, []);

    const init = () => {
        flightService.getAll()
            .then(response => {
                setFlights(response.data);
            })
            .catch(() => {
                sendError(errorMessage);
            });
        genderService.getAll()
            .then(response => {
                setGenders(response.data);
            })
            .catch(() => {
                sendError(errorMessage);
            });
        ticketService.getAll()
            .then(response => {
                setTickets(response.data);
            })
            .catch(() => {
                sendError(errorMessage);
            });
    }

    const reloadTickets = () => {
        ticketService.getAllFiltered(flightId, genderId, ageInYears)
            .then(response => {
                setTickets(response.data);
            })
            .catch(() => {
                sendError(errorMessage);
            });
    }

    const handleTicketDelete = (id) => {
        ticketService.deleteById(id)
            .then(() => {
                sendSuccess("Ticket successfully deleted")
                reloadTickets();
            })
            .catch(error => {
                if (error.response && error.response.status === 400) {
                    sendError(error.response.data.message);
                } else {
                    sendError(errorMessage);
                }
            });
    }

    const handleSearch = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        if (form.checkValidity() === false) {
            event.stopPropagation();
        } else {
            ticketService.getAllFiltered(flightId, genderId, ageInYears)
                .then(response => {
                    setTickets(response.data);
                })
                .catch(() => {
                    sendError(errorMessage);
                });
        }
    };

    const handleClear = () => {
        setFlightId("");
        setGenderId("");
        setAgeInYears("");
    }

    return (
        <div className="content">
            <h1 className="text-uppercase mb-30">Tickets</h1>
            <div>
                <Form noValidate onSubmit={handleSearch} onReset={handleClear} className="mb-30">
                    <Row className="mb-3">
                        <Form.Group as={Col}>
                            <Form.Label>Flight</Form.Label>
                            <Form.Select value={flightId} onChange={(e) => {
                                setFlightId(e.target.value);
                            }}>
                                <option value="">Choose flight</option>
                                {
                                    flights.map(flight => (
                                        <option key={flight.id} value={flight.id}>{flight.id}</option>
                                    ))
                                }
                            </Form.Select>
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>Gender</Form.Label>
                            <Form.Select value={genderId} onChange={(e) => {
                                setGenderId(e.target.value);
                            }}>
                                <option value="">Choose gender</option>
                                {
                                    genders.map(gender => (
                                        <option key={gender.id} value={gender.id}>{gender.name}</option>
                                    ))
                                }
                            </Form.Select>
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>Age in years</Form.Label>
                            <Form.Control value={ageInYears} type="number" min="0" max={Math.pow(2, 31) - 1}
                                placeholder="Enter age in years" onChange={(e) => {
                                    setAgeInYears(e.target.value);
                                }} />
                        </Form.Group>
                    </Row>
                    <Button style={{ marginRight: 10 }} variant="info" size="lg" type="submit">
                        Search
                    </Button>
                    <Button variant="warning" size="lg" type="reset">
                        Clear
                    </Button>
                </Form>
            </div>

            <div className="d-flex flex-wrap">
                <Link to="/tickets/create" className="btn btn-success btn-lg mb-20" style={{ marginRight: 10 }}>
                    Create ticket
                </Link>
                <h4 className="mb-20">
                    <Badge bg="dark">Total: {tickets.length}</Badge>
                </h4>
                <Table striped bordered hover variant="dark">
                    <thead >
                        <tr>
                            <th>Flight number</th>
                            <th>Name</th>
                            <th>Gender</th>
                            <th>Data of birth</th>
                            <th>Local passport number</th>
                            <th>International passport number</th>
                            <th>Seat</th>
                            <th>Baggage</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            tickets.map(ticket => (
                                <tr key={ticket.id}>
                                    <td>{ticket.flightNumber}</td>
                                    <td>{ticket.firstName + " " + ticket.lastName}</td>
                                    <td>{ticket.genderName}</td>
                                    <td>{ticket.dateOfBirth}</td>
                                    <td>{ticket.localPassportNumber}</td>
                                    <td>{ticket.internationalPassportNumber}</td>
                                    <td>{ticket.seat}</td>
                                    <td>{ticket.baggage.toString()}</td>
                                    <td>
                                        <Link className="btn btn-primary" style={{ marginRight: 10 }}
                                            to={`/tickets/${ticket.id}/update`}>
                                            Update
                                        </Link>
                                        <Button variant="danger"
                                            onClick={(e) => { handleTicketDelete(ticket.id) }}>
                                            Delete
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>
            </div>
        </div >
    );
}
