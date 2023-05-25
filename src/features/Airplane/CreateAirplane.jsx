import { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { sendError, sendSuccess, errorMessage } from "../../shared/components/NotificationManager";
import airportService from "../../shared/services/airport.service";
import airplaneService from "../../shared/services/airplane.service";
import airplaneModelService from "../../shared/services/airplaneModel.service";
import brigadeService from "../../shared/services/brigade.service";


export default function CreateAirplane() {
    const [models, setModels] = useState([]);
    const [pilotsBrigades, setPilotsBrigades] = useState([]);
    const [techniciansBrigades, setTechniciansBrigades] = useState([]);
    const [serviceBrigades, setServiceBrigades] = useState([]);
    const [airports, setAirports] = useState([]);

    const [modelId, setModelId] = useState("");
    const [createdAt, setCreatedAt] = useState("");
    const [pilotsBrigadeId, setPilotsBrigadeId] = useState("");
    const [techniciansBrigadeId, setTechniciansBrigadeId] = useState("");
    const [serviceBrigadeId, setServiceBrigadeId] = useState("");
    const [homeAirportId, setHomeAirportId] = useState("");

    const [validated, setValidated] = useState(false);

    useEffect(() => {
        init();
    }, []);

    const init = () => {
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
                modelId, createdAt, pilotsBrigadeId, techniciansBrigadeId, serviceBrigadeId, homeAirportId
            };
            airplaneService.create(airplane)
                .then(() => {
                    sendSuccess("Airplane successfully created");
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
        setModelId("");
        setCreatedAt("");
        setPilotsBrigadeId("");
        setTechniciansBrigadeId("");
        setServiceBrigadeId("");
        setHomeAirportId("");
    }


    return (
        <div className="content">
            <h1 className="text-uppercase mb-30">Create airplane</h1>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Model</Form.Label>
                    <Form.Select onChange={(e) => {
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
                    <Form.Control type="date" max={new Date().toLocaleDateString("fr-ca")}
                        placeholder="Created at" onChange={(e) => {
                            setCreatedAt(e.target.value);
                        }} required />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Pilots brigade</Form.Label>
                    <Form.Select onChange={(e) => {
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
                    <Form.Select onChange={(e) => {
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
                    <Form.Select onChange={(e) => {
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
                    <Form.Select onChange={(e) => {
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