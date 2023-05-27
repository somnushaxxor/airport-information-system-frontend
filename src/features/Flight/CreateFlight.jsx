import { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { sendError, sendSuccess, errorMessage } from "../../shared/components/NotificationManager";
import flightService from "../../shared/services/flight.service";
import airplaneService from "../../shared/services/airplane.service";
import routeService from "../../shared/services/route.service";
import flightCategoryService from "../../shared/services/flightCategory.service";


export default function CreateFlight() {
    const [airplanes, setAirplanes] = useState([]);
    const [routes, setRoutes] = useState([]);
    const [flightCategories, setFlightCategories] = useState([]);

    const [airplaneId, setAirplaneId] = useState("");
    const [routeId, setRouteId] = useState("");
    const [flightCategoryId, setFlightCategoryId] = useState("");
    const [scheduledDepartureAt, setScheduledDepartureAt] = useState("");
    const [scheduledArrivalAt, setScheduledArrivalAt] = useState("");
    const [ticketPrice, setTicketPrice] = useState("");
    const [minTicketsNumber, setMinTicketsNumber] = useState("");

    const [validated, setValidated] = useState(false);

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
                airplaneId, routeId, flightCategoryId, scheduledDepartureAt, scheduledArrivalAt,
                ticketPrice, minTicketsNumber
            };
            flightService.create(flight)
                .then(() => {
                    sendSuccess("Flight successfully created");
                    form.reset();
                    clearState();
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

    const clearState = () => {
        setAirplaneId("");
        setRouteId("");
        setFlightCategoryId("");
        setScheduledDepartureAt("");
        setScheduledArrivalAt("");
        setTicketPrice("");
        setMinTicketsNumber("");
    }

    const getRoute = (route) => {
        if (route.transferAirportName) {
            return route.departureAirportName + " --> " + route.transferAirportName + " --> " + route.arrivalAirportName;
        }
        return route.departureAirportName + " --> " + route.arrivalAirportName;
    }

    return (
        <div className="content">
            <h1 className="text-uppercase mb-30">Create flight</h1>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Airplane</Form.Label>
                    <Form.Select onChange={(e) => {
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
                    <Form.Select onChange={(e) => {
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
                    <Form.Select onChange={(e) => {
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
                    <Form.Control type="date" max={new Date().toLocaleDateString("fr-ca")}
                        placeholder="Scheduled departure at" onChange={(e) => {
                            setScheduledDepartureAt(e.target.value);
                        }} required />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Scheduled arrival at</Form.Label>
                    <Form.Control type="date" max={new Date().toLocaleDateString("fr-ca")}
                        placeholder="Scheduled arrival at" onChange={(e) => {
                            setScheduledArrivalAt(e.target.value);
                        }} required />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Ticket price</Form.Label>
                    <Form.Control type="number" min="0" max={Math.pow(2, 31) - 1}
                        placeholder="Enter ticket price" onChange={(e) => {
                            setTicketPrice(e.target.value);
                        }} required />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Min tickets number</Form.Label>
                    <Form.Control type="number" min="0" max={Math.pow(2, 31) - 1} placeholder="Enter min tickets number"
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