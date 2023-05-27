import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Badge from "react-bootstrap/Badge"
import { Button } from "react-bootstrap";
import { sendError, sendSuccess, errorMessage } from "../../shared/components/NotificationManager";
import airplaneMaintenanceOperationService from "../../shared/services/airplaneMaintenanceOperation.service";

export default function AirplaneMaintenanceOperations() {
    const [airplaneMaintenanceOperations, setAirplaneMaintenanceOperations] = useState([]);

    useEffect(() => {
        init();
    }, []);

    const init = () => {
        airplaneMaintenanceOperationService.getAll()
            .then(response => {
                setAirplaneMaintenanceOperations(response.data);
            })
            .catch(() => {
                sendError(errorMessage);
            });
    }

    const reloadAirplaneMaintenanceOperations = () => {
        airplaneMaintenanceOperationService.getAllFiltered()
            .then(response => {
                setAirplaneMaintenanceOperations(response.data);
            })
            .catch(() => {
                sendError(errorMessage);
            });
    }

    const handleAirplaneMaintenanceOperationDelete = (id) => {
        airplaneMaintenanceOperationService.deleteById(id)
            .then(() => {
                sendSuccess("Airplane maintenance operation successfully deleted")
                reloadAirplaneMaintenanceOperations();
            })
            .catch(() => {
                sendError(errorMessage);
            });
    }

    return (
        <div className="content">
            <h1 className="text-uppercase mb-30">Airplane maintenance operations</h1>
            <div className="d-flex flex-wrap">
                <Link to="/airplane-maintenance-operations/create" className="btn btn-success btn-lg mb-20" style={{ marginRight: 10 }}>
                    Create airplane maintenance operation
                </Link>
                <h4 className="mb-20">
                    <Badge bg="dark">Total: {airplaneMaintenanceOperations.length}</Badge>
                </h4>
                <Table striped bordered hover variant="dark">
                    <thead >
                        <tr>
                            <th>Done at</th>
                            <th>Repair required</th>
                            <th>Airplane number</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            airplaneMaintenanceOperations.map(operation => (
                                <tr key={operation.id}>
                                    <td>{operation.doneAt}</td>
                                    <td>{operation.repairRequired.toString()}</td>
                                    <td>{operation.airplaneNumber}</td>
                                    <td>
                                        <Button variant="danger"
                                            onClick={(e) => { handleAirplaneMaintenanceOperationDelete(operation.id) }}>
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
