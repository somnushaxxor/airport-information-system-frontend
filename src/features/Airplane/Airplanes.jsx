import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Badge from "react-bootstrap/Badge"
import { Button, Form, Row, Col } from "react-bootstrap";
import { sendError, sendSuccess, errorMessage } from "../../shared/components/NotificationManager";
import airportService from "../../shared/services/airport.service";
import airplaneService from "../../shared/services/airplane.service";


export default function Airplanes() {
    const [airports, setAirports] = useState([]);

    const [airplanes, setAirplanes] = useState([]);

    const [homeAirportId, setHomeAirportId] = useState("");
    const [joinedAt, setJoinedAt] = useState("");
    const [ageInYears, setAgeInYears] = useState("");

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
        airplaneService.getAll()
            .then(response => {
                setAirplanes(response.data);
            })
            .catch(() => {
                sendError(errorMessage);
            });
    }

    const reloadAirplanes = () => {
        airplaneService.getAllFiltered(homeAirportId, joinedAt, ageInYears)
            .then(response => {
                setAirplanes(response.data);
            })
            .catch(() => {
                sendError(errorMessage);
            });
    }

    const handleAirplaneDelete = (id) => {
        airplaneService.deleteById(id)
            .then(() => {
                sendSuccess("Airplane successfully deleted")
                reloadAirplanes();
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
            airplaneService.getAllFiltered(homeAirportId, joinedAt, ageInYears)
                .then(response => {
                    setAirplanes(response.data);
                })
                .catch(() => {
                    sendError(errorMessage);
                });
        }
    };

    const handleClear = () => {
        setHomeAirportId("");
        setJoinedAt("");
        setAgeInYears("");
    }

    return (
        <div className="content">
            <h1 className="text-uppercase mb-30">Airplanes</h1>
            <div>
                <Form noValidate onSubmit={handleSearch} onReset={handleClear} className="mb-30">
                    <Row className="mb-3">
                        <Form.Group as={Col}>
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
                <Link to="/airplanes/create" className="btn btn-success btn-lg mb-20" style={{ marginRight: 10 }}>
                    Create airplane
                </Link>
                <h4 className="mb-20">
                    <Badge bg="dark">Total: {airplanes.length}</Badge>
                </h4>
                <Table striped bordered hover variant="dark">
                    <thead >
                        <tr>
                            <th>Number</th>
                            <th>Airplane model</th>
                            <th>Created at</th>
                            <th>Joined at</th>
                            <th>Pilots brigade</th>
                            <th>Technicians brigade</th>
                            <th>Service brigade</th>
                            <th>Home airport</th>
                            <th>Home airport city</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            airplanes.map(airplane => (
                                <tr key={airplane.id}>
                                    <td>{airplane.id}</td>
                                    <td>{airplane.modelName}</td>
                                    <td>{airplane.createdAt}</td>
                                    <td>{airplane.joinedAt}</td>
                                    <td>{airplane.pilotsBrigadeName}</td>
                                    <td>{airplane.techniciansBrigadeName}</td>
                                    <td>{airplane.serviceBrigadeName}</td>
                                    <td>{airplane.homeAirportName}</td>
                                    <td>{airplane.homeAirportCityName}</td>
                                    <td>
                                        <Link className="btn btn-primary" style={{ marginRight: 10 }}
                                            to={`/airplanes/${airplane.id}/update`}>
                                            Update
                                        </Link>
                                        <Button variant="danger"
                                            onClick={(e) => { handleAirplaneDelete(airplane.id) }}>
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
