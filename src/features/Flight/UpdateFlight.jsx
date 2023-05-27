import { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { sendError, sendSuccess, errorMessage } from "../../shared/components/NotificationManager";
import flightService from "../../shared/services/flight.service";
import airplaneService from "../../shared/services/airplane.service";
import routeService from "../../shared/services/route.service";
import flightCategoryService from "../../shared/services/flightCategory.service";


export default function UpdateFlight() {
    const [airplanes, setAirplanes] = useState([]);
    const [routes, setRoutes] = useState([]);
    const [flightCategories, setFlightCategories] = useState([]);

    const [airplaneId, setAirplaneId] = useState("");
    const [routeId, setRouteId] = useState("");
    const [flightCategoryId, setFlightCategoryId] = useState("");
    const [scheduledDepartureAt, setScheduledDepartureAt] = useState("");
    const [scheduledArrivalAt, setScheduledArrivalAt] = useState("");
    const [actualDepartureAt, setActualDepartureAt] = useState("");
    const [ticketPrice, setTicketPrice] = useState("");
    const [minTicketsNumber, setMinTicketsNumber] = useState("");

    const [validated, setValidated] = useState(false);

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        init();
    }, []);

    const init = () => {
        flightService.getById(id)
            .then(response => {
                setAirplaneId(response.data.airplaneId);
                setRouteId(response.data.routeId);
                setFlightCategoryId(response.data.categoryId);
                setScheduledDepartureAt(response.data.scheduledDepartureAt);
                setScheduledArrivalAt(response.data.scheduledArrivalAt);
                setActualDepartureAt(response.data.actualDepartureAt);
                setTicketPrice(response.data.ticketPrice);
                setMinTicketsNumber(response.data.minTicketsNumber);
            })
            .catch(error => {
                if (error.response && error.response.status === 404) {
                    navigate("/404");
                } else {
                    sendError(errorMessage);
                }
            });

        airplaneService.getAll()
            .then(response => {
                setAirplanes(response.data);
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
                setFlightCategories(response.data);
            })
            .catch(() => {
                sendError(errorMessage);
            });
    }

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        if (form.checkValidity() === false) {
            event.stopPropagation();
            setValidated(true);
        } else {
            setValidated(false);
            const flight = {
                id, airplaneId, routeId, flightCategoryId, scheduledDepartureAt, scheduledArrivalAt,
                actualDepartureAt, ticketPrice, minTicketsNumber
            };
            flightService.update(flight)
                .then(() => {
                    sendSuccess("Flight successfully updated");
                })
                .catch(error => {
                    if (error.response && error.response.status === 400) {
                        sendError(error.response.data.message);
                    } else {
                        sendError(errorMessage);
                    }
                });
        }
    };

    const getRoute = (route) => {
        if (route.transferAirportName) {
            return route.departureAirportName + " --> " + route.transferAirportName + " --> " + route.arrivalAirportName;
        }
        return route.departureAirportName + " --> " + route.arrivalAirportName;
    }

    return (
        <div className="content">
            <h1 className="text-uppercase mb-30">Update flight</h1>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Airplane</Form.Label>
                    <Form.Select value={airplaneId} onChange={(e) => {
                        setAirplaneId(e.target.value);
                    }} required>
                        <option value="">Choose airplane</option>
                        {
                            airplanes.map(airplane => (
                                <option key={airplane.id} value={airplane.id}>{airplane.id}</option>
                            ))
                        }
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Route</Form.Label>
                    <Form.Select value={routeId} onChange={(e) => {
                        setRouteId(e.target.value);
                    }} required>
                        <option value="">Choose route</option>
                        {
                            routes.map(route => (
                                <option key={route.id} value={route.id}>{getRoute(route)}</option>
                            ))
                        }
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Category</Form.Label>
                    <Form.Select value={flightCategoryId} onChange={(e) => {
                        setFlightCategoryId(e.target.value);
                    }} required>
                        <option value="">Choose category</option>
                        {
                            flightCategories.map(category => (
                                <option key={category.id} value={category.id}>{category.name}</option>
                            ))
                        }
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Scheduled departure at</Form.Label>
                    <Form.Control value={scheduledDepartureAt} type="date" max={new Date().toLocaleDateString("fr-ca")}
                        placeholder="Scheduled departure at" onChange={(e) => {
                            setScheduledDepartureAt(e.target.value);
                        }} required />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Scheduled arrival at</Form.Label>
                    <Form.Control value={scheduledArrivalAt} type="date" max={new Date().toLocaleDateString("fr-ca")}
                        placeholder="Scheduled arrival at" onChange={(e) => {
                            setScheduledArrivalAt(e.target.value);
                        }} required />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Actual departure at</Form.Label>
                    <Form.Control value={actualDepartureAt} type="date" max={new Date().toLocaleDateString("fr-ca")}
                        placeholder="Actual departure at" onChange={(e) => {
                            setActualDepartureAt(e.target.value);
                        }} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Ticket price</Form.Label>
                    <Form.Control value={ticketPrice} type="number" min="0" max={Math.pow(2, 31) - 1}
                        placeholder="Enter ticket price" onChange={(e) => {
                            setTicketPrice(e.target.value);
                        }} required />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Min tickets number</Form.Label>
                    <Form.Control value={minTicketsNumber} type="number" min="0" max={Math.pow(2, 31) - 1} placeholder="Enter min tickets number"
                        onChange={(e) => {
                            setMinTicketsNumber(e.target.value);
                        }} required />
                </Form.Group>
                <Button className="mb-3" variant="primary" type="submit">
                    Submit
                </Button>
            </Form>

        </div >
    );
}