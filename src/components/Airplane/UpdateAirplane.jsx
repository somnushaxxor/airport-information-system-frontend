import { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { sendError, sendSuccess, errorMessage } from "../NotificationManager";
import { useNavigate, useParams } from "react-router-dom";
import brigadeService from "../../services/brigade.service";
import airplaneModelService from '../../services/airplaneModel.service';
import airportService from '../../services/airport.service';
import airplaneService from '../../services/airplane.service';

export default function UpdateAirplane() {
    const [models, setModels] = useState([]);
    const [pilotsBrigades, setPilotsBrigades] = useState([]);
    const [techniciansBrigades, setTechniciansBrigades] = useState([]);
    const [serviceBrigades, setServiceBrigades] = useState([]);
    const [airports, setAirports] = useState([]);

    const [modelId, setModelId] = useState("");
    const [createdAt, setCreatedAt] = useState("");
    const [joinedAt, setJoinedAt] = useState("");
    const [pilotsBrigadeId, setPilotsBrigadeId] = useState("");
    const [techniciansBrigadeId, setTechniciansBrigadeId] = useState("");
    const [serviceBrigadeId, setServiceBrigadeId] = useState("");
    const [homeAirportId, setHomeAirportId] = useState("");

    const [validated, setValidated] = useState(false);

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        init();
    }, []);

    const init = () => {
        airplaneService.getById(id)
            .then(response => {
                setModelId(response.data.modelId);
                setCreatedAt(response.data.createdAt);
                setJoinedAt(response.data.joinedAt);
                setPilotsBrigadeId(response.data.pilotsBrigadeId);
                setTechniciansBrigadeId(response.data.techniciansBrigadeId);
                setServiceBrigadeId(response.data.serviceBrigadeId);
                setHomeAirportId(response.data.homeAirportId);
            })
            .catch(error => {
                if (error.response && error.response.status === 404) {
                    navigate("/404");
                } else {
                    sendError(errorMessage);
                }
            });

        airplaneModelService.getAll()
            .then(response => {
                setModels(response.data);
            })
            .catch(() => {
                sendError(errorMessage);
            });
        brigadeService.getAllNonemptyPilotsBrigades()
            .then(response => {
                setPilotsBrigades(response.data);
            })
            .catch(() => {
                sendError(errorMessage);
            });
        brigadeService.getAllNonemptyTechniciansBrigades()
            .then(response => {
                setTechniciansBrigades(response.data);
            })
            .catch(() => {
                sendError(errorMessage);
            });
        brigadeService.getAllNonemptyServiceBrigades()
            .then(response => {
                setServiceBrigades(response.data);
            })
            .catch(() => {
                sendError(errorMessage);
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
            const airplane = {
                id, modelId, createdAt, joinedAt, pilotsBrigadeId, techniciansBrigadeId, serviceBrigadeId,
                homeAirportId
            };
            airplaneService.update(airplane)
                .then(() => {
                    sendSuccess("Airplane successfully updated");
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
            <h1 className="text-uppercase mb-30">Update airplane</h1>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Model</Form.Label>
                    <Form.Select value={modelId} onChange={(e) => {
                        setModelId(e.target.value);
                    }} required>
                        <option value="">Choose model</option>
                        {
                            models.map(model => (
                                <option key={model.id} value={model.id}>{model.name}</option>
                            ))
                        }
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Created at</Form.Label>
                    <Form.Control value={createdAt} type="date" max={new Date().toLocaleDateString("fr-ca")}
                        placeholder="Created at" onChange={(e) => {
                            setCreatedAt(e.target.value);
                        }} required />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Joined at</Form.Label>
                    <Form.Control value={joinedAt} type="date" min={createdAt} max={new Date().toLocaleDateString("fr-ca")}
                        placeholder="Joined at" onChange={(e) => {
                            setJoinedAt(e.target.value);
                        }} required />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Pilots brigade</Form.Label>
                    <Form.Select value={pilotsBrigadeId} onChange={(e) => {
                        setPilotsBrigadeId(e.target.value);
                    }} required>
                        <option value="">Choose pilots brigade</option>
                        {
                            pilotsBrigades.map(pilotsBrigade => (
                                <option key={pilotsBrigade.id} value={pilotsBrigade.id}>{pilotsBrigade.name}</option>
                            ))
                        }
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Technicians brigade</Form.Label>
                    <Form.Select value={techniciansBrigadeId} onChange={(e) => {
                        setTechniciansBrigadeId(e.target.value);
                    }} required>
                        <option value="">Choose technicians brigade</option>
                        {
                            techniciansBrigades.map(techniciansBrigade => (
                                <option key={techniciansBrigade.id} value={techniciansBrigade.id}>
                                    {techniciansBrigade.name}
                                </option>
                            ))
                        }
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Service brigade</Form.Label>
                    <Form.Select value={serviceBrigadeId} onChange={(e) => {
                        setServiceBrigadeId(e.target.value);
                    }} required>
                        <option value="">Choose service brigade</option>
                        {
                            serviceBrigades.map(serviceBrigade => (
                                <option key={serviceBrigade.id} value={serviceBrigade.id}>
                                    {serviceBrigade.name}
                                </option>
                            ))
                        }
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Home airport</Form.Label>
                    <Form.Select value={homeAirportId} onChange={(e) => {
                        setHomeAirportId(e.target.value);
                    }} required>
                        <option value="">Choose home airport</option>
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