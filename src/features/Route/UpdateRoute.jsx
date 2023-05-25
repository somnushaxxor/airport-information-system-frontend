import { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { sendError, sendSuccess, errorMessage } from "../../shared/components/NotificationManager";
import airportService from "../../shared/services/airport.service";
import routeService from "../../shared/services/route.service";


export default function UpdateRoute() {
    const [airports, setAirports] = useState([]);

    const [departureAirportId, setDepartureAirportId] = useState("");
    const [transferAirportId, setTransferAirportId] = useState("");
    const [arrivalAirportId, setArrivalAirportId] = useState("");

    const [transferAirportSelectionCheckboxChecked, setTransferAirportSelectionCheckboxChecked] = useState(false);

    const [validated, setValidated] = useState(false);

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        init();
    }, []);

    const init = () => {
        routeService.getById(id)
            .then(response => {
                setDepartureAirportId(response.data.departureAirportId);
                setArrivalAirportId(response.data.arrivalAirportId);
                if (response.data.transferAirportId) {
                    setTransferAirportSelectionCheckboxChecked(true);
                    setTransferAirportId(response.data.transferAirportId);
                }
            })
            .catch(error => {
                if (error.response && error.response.status === 404) {
                    navigate("/404");
                } else {
                    sendError(errorMessage);
                }
            });

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
            const route = { id, departureAirportId, transferAirportId, arrivalAirportId };
            routeService.update(route)
                .then(() => {
                    sendSuccess("Route successfully updated");
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

    return (
        <div className="content">
            <h1 className="text-uppercase mb-30">Update route</h1>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Departure airport</Form.Label>
                    <Form.Select value={departureAirportId} onChange={(e) => {
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