import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Badge from "react-bootstrap/Badge"
import { Button } from "react-bootstrap";
import { sendError, sendSuccess, errorMessage } from "../../shared/components/NotificationManager";
import airplaneModelService from "../../shared/services/airplaneModel.service";


export default function AirplaneModels() {
    const [airplaneModels, setAirplaneModels] = useState([]);

    useEffect(() => {
        init();
    }, []);

    const init = () => {
        airplaneModelService.getAll()
            .then(response => {
                setAirplaneModels(response.data);
            })
            .catch(() => {
                sendError(errorMessage);
            });
    }

    const reloadAirplaneModels = () => {
        airplaneModelService.getAll()
            .then(response => {
                setAirplaneModels(response.data);
            })
            .catch(() => {
                sendError(errorMessage);
            });
    }

    const handleAirplaneModelDelete = (id) => {
        airplaneModelService.deleteById(id)
            .then(() => {
                sendSuccess("Airplane model successfully deleted")
                reloadAirplaneModels();
            })
            .catch(() => {
                sendError(errorMessage);
            });
    }

    return (
        <div className="content">
            <h1 className="text-uppercase mb-30">Airplane models</h1>
            <div className="d-flex flex-wrap">
                <Link to="/airplanes/models/create" className="btn btn-success btn-lg mb-20" style={{ marginRight: 10 }}>
                    Create airplane model
                </Link>
                <h4 className="mb-20">
                    <Badge bg="dark">Total: {airplaneModels.length}</Badge>
                </h4>
                <Table striped bordered hover variant="dark">
                    <thead >
                        <tr>
                            <th>Name</th>
                            <th>Passengers capacity</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            airplaneModels.map(airplaneModel => (
                                <tr key={airplaneModel.id}>
                                    <td>{airplaneModel.name}</td>
                                    <td>{airplaneModel.passengersCapacity}</td>
                                    <td>
                                        <Link className="btn btn-primary" style={{ marginRight: 10 }}
                                            to={`/airplanes/models/${airplaneModel.id}/update`}>
                                            Update
                                        </Link>
                                        <Button variant="danger"
                                            onClick={(e) => { handleAirplaneModelDelete(airplaneModel.id) }}>
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
