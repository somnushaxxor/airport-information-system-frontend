import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Badge from "react-bootstrap/Badge"
import { Button, Form, Row } from "react-bootstrap";
import { sendError, sendSuccess, errorMessage } from "../../shared/components/NotificationManager";
import flightService from "../../shared/services/flight.service";


export default function Flights() {

    const [flights, setFlights] = useState([]);

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
    }

    const reloadFlights = () => {
        flightService.getAllFiltered()
            .then(response => {
                setFlights(response.data);
            })
            .catch(() => {
                sendError(errorMessage);
            });
    }

    const handleFlightDelete = (id) => {
        flightService.deleteById(id)
            .then(() => {
                sendSuccess("Flight successfully deleted")
                reloadFlights();
            })
            .catch(() => {
                sendError(errorMessage);
            });
    }

    const handleSearch = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        if (form.checkValidity() === false) {
            event.stopPropagation();
        } else {
            flightService.getAllFiltered()
                .then(response => {
                    setFlights(response.data);
                })
                .catch(() => {
                    sendError(errorMessage);
                });
        }
    };

    const handleClear = () => {
        // setHomeAirportId("");
        // setJoinedAt("");
    }

    return (
        <div className="content">
            <h1 className="text-uppercase mb-30">Flights</h1>
            <div>
                <Form noValidate onSubmit={handleSearch} onReset={handleClear} className="mb-30">
                    <Row className="mb-3">
                        {/* <Form.Group as={Col}>
                            <Form.Label>Home airport</Form.Label>
                            <Form.Select value={homeAirportId} onChange={(e) => {
                                setHomeAirportId(e.target.value);
                            }}>
                                <option value="">Choose home airport</option>
                                {
                                    airports.map(airport => (
                                        <option key={airport.id} value={airport.id}>
                                            {airport.name + ", " + airport.cityName}
                                        </option>
                                    ))
                                }
                            </Form.Select>
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>Joined at</Form.Label>
                            <Form.Control type="date" value={joinedAt} max={new Date().toLocaleDateString("fr-ca")}
                                placeholder="Joined at" onChange={(e) => {
                                    setJoinedAt(e.target.value);
                                }} />
                        </Form.Group> */}
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
                <Link to="/flights/create" className="btn btn-success btn-lg mb-20" style={{ marginRight: 10 }}>
                    Create flight
                </Link>
                <h4 className="mb-20">
                    <Badge bg="dark">Total: {flights.length}</Badge>
                </h4>
                <Table striped bordered hover variant="dark">
                    <thead >
                        <tr>
                            <th>Airplane number</th>
                            <th>Departure</th>
                            <th>Transfer</th>
                            <th>Arrival</th>
                            <th>Category</th>
                            <th>Scheduled departure at</th>
                            <th>Scheduled arrival at</th>
                            <th>Actual arrival at</th>
                            <th>Ticket price</th>
                            <th>Minimum tickets number</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            flights.map(flight => (
                                <tr key={flight.id}>
                                    <td>{flight.airplaneNumber}</td>
                                    <td>{flight.departureAirportName + ", " + flight.departureCityName}</td>
                                    <td>
                                        {
                                            () => {
                                                if (flight.transferAirportName) {
                                                    return flight.transferAirportName + ", " + flight.transferCityName
                                                }
                                                return "";
                                            }
                                        }
                                    </td>
                                    <td>{flight.arrivalAirportName + ", " + flight.arrivalCityName}</td>
                                    <td>{flight.categoryName}</td>
                                    <td>{flight.scheduledDepartureAt}</td>
                                    <td>{flight.scheduledArrivalAt}</td>
                                    <td>{flight.actualArrivalAt}</td>
                                    <td>{flight.ticketPrice}</td>
                                    <td>{flight.minTicketsNumber}</td>
                                    <td>
                                        <Link className="btn btn-primary" style={{ marginRight: 10 }}
                                            to={`/flights/${flight.id}/update`}>
                                            Update
                                        </Link>
                                        <Button variant="danger"
                                            onClick={(e) => { handleFlightDelete(flight.id) }}>
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
