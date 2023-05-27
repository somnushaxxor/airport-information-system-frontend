import { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { sendError, sendSuccess, errorMessage } from "../../shared/components/NotificationManager";
import ticketService from "../../shared/services/ticket.service";
import genderService from "../../shared/services/gender.service";
import flightService from "../../shared/services/flight.service";


export default function UpdateTicket() {
    const [flights, setFlights] = useState([]);
    const [genders, setGenders] = useState([]);

    const [flightId, setFlightId] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [genderId, setGenderId] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [localPassportNumber, setLocalPassportNumber] = useState("");
    const [internationalPassportNumber, setInternationalPassportNumber] = useState("");
    const [seat, setSeat] = useState("");
    const [baggage, setBaggage] = useState(false);

    const [baggageCheckboxChecked, setBaggageCheckboxChecked] = useState(false);

    const [validated, setValidated] = useState(false);

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        init();
    }, []);

    const init = () => {
        ticketService.getById(id)
            .then(response => {
                setFlightId(response.data.flightId);
                setFirstName(response.data.firstName);
                setLastName(response.data.lastName);
                setGenderId(response.data.genderId);
                setDateOfBirth(response.data.dateOfBirth);
                setLocalPassportNumber(response.data.localPassportNumber);
                setInternationalPassportNumber(response.data.internationalPassportNumber);
                setSeat(response.data.seat);
                setBaggage(response.data.baggage);
                setBaggageCheckboxChecked(response.data.baggage);
            })
            .catch(error => {
                if (error.response && error.response.status === 404) {
                    navigate("/404");
                } else {
                    sendError(errorMessage);
                }
            });

        genderService.getAll()
            .then(response => {
                setGenders(response.data);
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

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        if (form.checkValidity() === false) {
            event.stopPropagation();
            setValidated(true);
        } else {
            setValidated(false);
            const ticket = {
                id, flightId, firstName, lastName, genderId, dateOfBirth, localPassportNumber,
                internationalPassportNumber, seat, baggage
            };
            ticketService.update(ticket)
                .then(() => {
                    sendSuccess("Ticket successfully updated");
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
            <h1 className="text-uppercase mb-30">Update ticket</h1>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Flight</Form.Label>
                    <Form.Select value={flightId} onChange={(e) => {
                        setFlightId(e.target.value);
                    }} required>
                        <option value="">Choose flight</option>
                        {
                            flights.map(flight => (
                                <option key={flight.id} value={flight.id}>{flight.id}</option>
                            ))
                        }
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>First name</Form.Label>
                    <Form.Control value={firstName} type="text" placeholder="Enter first name" onChange={(e) => {
                        setFirstName(e.target.value);
                    }} required />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Last name</Form.Label>
                    <Form.Control value={lastName} type="text" placeholder="Enter last name" onChange={(e) => {
                        setLastName(e.target.value);
                    }} required />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Gender</Form.Label>
                    <Form.Select value={genderId} onChange={(e) => {
                        setGenderId(e.target.value);
                    }} required>
                        <option value="">Choose gender</option>
                        {
                            genders.map(gender => (
                                <option key={gender.id} value={gender.id}>{gender.name}</option>
                            ))
                        }
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Date of birth</Form.Label>
                    <Form.Control value={dateOfBirth} type="date" max={new Date().toLocaleDateString("fr-ca")}
                        placeholder="Date of birth" onChange={(e) => {
                            setDateOfBirth(e.target.value);
                        }} required />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Local passport number</Form.Label>
                    <Form.Control value={localPassportNumber} type="text" placeholder="Enter local passport number" onChange={(e) => {
                        setLocalPassportNumber(e.target.value);
                    }} required />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>International passport number</Form.Label>
                    <Form.Control value={internationalPassportNumber} type="text" placeholder="Enter international passport number" onChange={(e) => {
                        setInternationalPassportNumber(e.target.value);
                    }} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Seat</Form.Label>
                    <Form.Control value={seat} type="number" min="0" max={Math.pow(2, 31) - 1}
                        placeholder="Enter seat" onChange={(e) => {
                            setSeat(e.target.value);
                        }} required />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Check
                        type="checkbox"
                        label="Baggage?"
                        checked={baggageCheckboxChecked}
                        onChange={(e) => {
                            setBaggageCheckboxChecked(e.target.checked);
                            setBaggage(e.target.checked);
                        }}
                    />
                </Form.Group>
                <Button className="mb-3" variant="primary" type="submit">
                    Submit
                </Button>
            </Form>

        </div >
    );
}