import { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { sendError, sendSuccess, errorMessage } from "../../shared/components/NotificationManager";
import airportService from "../../shared/services/airport.service";
import routeService from "../../shared/services/route.service";


export default function CreateRoute() {
    const [airports, setAirports] = useState([]);

    const [departureAirportId, setDepartureAirportId] = useState("");
    const [transferAirportId, setTransferAirportId] = useState("");
    const [arrivalAirportId, setArrivalAirportId] = useState("");

    const [transferAirportSelectionCheckboxChecked, setTransferAirportSelectionCheckboxChecked] = useState(false);

    const [validated, setValidated] = useState(false);


    useEffect(() => {
        init();
    }, []);

    const init = () => {
        airportService.getAll()
            .then(response => {
                setAirports(response.data);
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
            const route = { departureAirportId, transferAirportId, arrivalAirportId };
            routeService.create(route)
                .then(() => {
                    sendSuccess("Route successfully created");
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
        setDepartureAirportId("");
        setTransferAirportId("");
        setArrivalAirportId("");
    }

    return (
        <div className="content">
            <h1 className="text-uppercase mb-30">Create route</h1>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Departure airport</Form.Label>
                    <Form.Select onChange={(e) => {
                        setDepartureAirportId(e.target.value);
                        setTransferAirportId("");
                        setArrivalAirportId("");
                        setTransferAirportSelectionCheckboxChecked(false);
                    }} required>
                        <option value="">Choose departure airport</option>
                        {
                            airports.map(airport => (
                                <option key={airport.id} value={airport.id}>{airport.name}</option>
                            ))
                        }
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Check
                        type="checkbox"
                        label="Choose transfer airport?"
                        checked={transferAirportSelectionCheckboxChecked}
                        disabled={!departureAirportId}
                        onChange={(e) => {
                            if (!e.target.checked) {
                                setTransferAirportId("");
                            }
                            setTransferAirportSelectionCheckboxChecked(e.target.checked);
                        }}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Transfer airport</Form.Label>
                    <Form.Select value={transferAirportId} disabled={!transferAirportSelectionCheckboxChecked} onChange={(e) => {
                        setTransferAirportId(e.target.value);
                    }} required>
                        <option value="">Choose transfer airport</option>
                        {
                            airports.map(airport => (
                                <option key={airport.id} value={airport.id}>{airport.name}</option>
                            ))
                        }
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Arrival airport</Form.Label>
                    <Form.Select value={arrivalAirportId} disabled={!departureAirportId} onChange={(e) => {
                        setArrivalAirportId(e.target.value);
                    }} required>
                        <option value="">Choose arrival airport</option>
                        {
                            airports.map(airport => (
                                <option key={airport.id} value={airport.id}>{airport.name}</option>
                            ))
                        }
                    </Form.Select>
                </Form.Group>
                <Button className="mb-3" variant="primary" type="submit">
                    Submit
                </Button>
            </Form>

        </div >
    );
}