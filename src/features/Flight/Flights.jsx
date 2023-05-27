import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Badge from "react-bootstrap/Badge"
import { Button, Form, Row, Col } from "react-bootstrap";
import { sendError, sendSuccess, errorMessage } from "../../shared/components/NotificationManager";
import flightService from "../../shared/services/flight.service";
import airplaneService from "../../shared/services/airplane.service";
import airplaneModelService from "../../shared/services/airplaneModel.service";
import routeService from "../../shared/services/route.service";
import flightCategoryService from "../../shared/services/flightCategory.service";


export default function Flights() {
    const [airplanes, setAirplanes] = useState([]);
    const [airplaneModels, setAirplaneModels] = useState([]);
    const [routes, setRoutes] = useState([]);
    const [categories, setCategories] = useState([]);

    const [flights, setFlights] = useState([]);

    const [airplaneId, setAirplaneId] = useState("");
    const [airplaneModelId, setAirplaneModelId] = useState("");
    const [routeId, setRouteId] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [ticketPrice, setTicketPrice] = useState("");

    useEffect(() => {
        init();
    }, []);

    const init = () => {
        airplaneService.getAll()
            .then(response => {
                setAirplanes(response.data);
            })
            .catch(() => {
                sendError(errorMessage);
            });
        airplaneModelService.getAll()
            .then(response => {
                setAirplaneModels(response.data);
            })
            .catch(() => {
                sendError(errorMessage);
            });
        routeService.getAll()
            .then(response => {
                setRoutes(response.data);
            })
            .catch(() => {
                sendError(errorMessage);
            });
        flightCategoryService.getAll()
            .then(response => {
                setCategories(response.data);
            })
            .catch(() => {
                sendError(errorMessage);
            });
        flightService.getAll()
            .then(response => {
                setFlights(response.data);
            })
            .catch(() => {
                sendError(errorMessage);
            });
    }

    const reloadFlights = () => {
        flightService.getAllFiltered(airplaneId, airplaneModelId, routeId, categoryId, ticketPrice)
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
            flightService.getAllFiltered(airplaneId, airplaneModelId, routeId, categoryId, ticketPrice)
                .then(response => {
                    setFlights(response.data);
                })
                .catch(() => {
                    sendError(errorMessage);
                });
        }
    };

    const handleClear = () => {
        setAirplaneId("");
        setAirplaneModelId("");
        setRouteId("");
        setCategoryId("");
        setTicketPrice("");
    }

    const getRoute = (route) => {
        if (route.transferAirportName) {
            return route.departureAirportName + " --> " + route.transferAirportName + " --> " + route.arrivalAirportName;
        }
        return route.departureAirportName + " --> " + route.arrivalAirportName;
    }

    const getTransfer = (flight) => {
        if (flight.transferAirportName) {
            return flight.transferAirportName + ", " + flight.transferCityName
        }
        return "";
    }

    return (
        <div className="content">
            <h1 className="text-uppercase mb-30">Flights</h1>
            <div>
                <Form noValidate onSubmit={handleSearch} onReset={handleClear} className="mb-30">
                    <Row className="mb-3">
                        <Form.Group as={Col}>
                            <Form.Label>Airplane</Form.Label>
                            <Form.Select value={airplaneId} onChange={(e) => {
                                setAirplaneId(e.target.value);
                            }}>
                                <option value="">Choose airplane</option>
                                {
                                    airplanes.map(airplane => (
                                        <option key={airplane.id} value={airplane.id}>{airplane.id}</option>
                                    ))
                                }
                            </Form.Select>
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>Airplane model</Form.Label>
                            <Form.Select value={airplaneModelId} onChange={(e) => {
                                setAirplaneModelId(e.target.value);
                            }}>
                                <option value="">Choose airplane model</option>
                                {
                                    airplaneModels.map(airplaneModel => (
                                        <option key={airplaneModel.id} value={airplaneModel.id}>
                                            {airplaneModel.name}
                                        </option>
                                    ))
                                }
                            </Form.Select>
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>Route</Form.Label>
                            <Form.Select value={routeId} onChange={(e) => {
                                setRouteId(e.target.value);
                            }}>
                                <option value="">Choose route</option>
                                {
                                    routes.map(route => (
                                        <option key={route.id} value={route.id}>{getRoute(route)}</option>
                                    ))
                                }
                            </Form.Select>
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>Category</Form.Label>
                            <Form.Select value={categoryId} onChange={(e) => {
                                setCategoryId(e.target.value);
                            }}>
                                <option value="">Choose category</option>
                                {
                                    categories.map(category => (
                                        <option key={category.id} value={category.id}>{category.name}</option>
                                    ))
                                }
                            </Form.Select>
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>Ticket price</Form.Label>
                            <Form.Control value={ticketPrice} type="number" min="0" max={Math.pow(2, 31) - 1}
                                placeholder="Enter ticket price" onChange={(e) => {
                                    setTicketPrice(e.target.value);
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
                                    <td>{getTransfer(flight)}</td>
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
