import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import Badge from 'react-bootstrap/Badge'
import { Button } from 'react-bootstrap';
import { sendError, sendSuccess, errorMessage } from '../NotificationManager';
import specializationService from "../../services/specialization.service";

export default function Specializations() {
    const [specializations, setSpecializations] = useState([]);

    useEffect(() => {
        init();
    }, []);

    const init = () => {
        specializationService.getAll()
            .then(response => {
                setSpecializations(response.data);
            })
            .catch(() => {
                sendError(errorMessage);
            });
    }

    const reloadSpecializations = () => {
        specializationService.getAll()
            .then(response => {
                setSpecializations(response.data);
            })
            .catch(() => {
                sendError(errorMessage);
            });
    }

    const handleSpecializationDelete = (id) => {
        specializationService.deleteById(id)
            .then(() => {
                sendSuccess("Specialization successfully deleted")
                reloadSpecializations();
            })
            .catch(error => {
                if (error.response && error.response.status === 400) {
                    sendError(error.response.data.message);
                } else {
                    sendError(errorMessage);
                }
            });
    }

    return (
        <div className="content">
            <h1 className="text-uppercase mb-30">Specializations</h1>
            <div className="d-flex flex-wrap">
                <Link to="/specializations/create" className="btn btn-success btn-lg mb-20" style={{ marginRight: 10 }}>
                    Create specialization
                </Link>
                <h4 className="mb-20">
                    <Badge bg="dark">Total: {specializations.length}</Badge>
                </h4>
                <Table striped bordered hover variant="dark">
                    <thead >
                        <tr>
                            <th>Name</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            specializations.map(specialization => (
                                <tr key={specialization.id}>
                                    <td>{specialization.name}</td>
                                    <td>
                                        <Link className="btn btn-primary" style={{ marginRight: 10 }}
                                            to={`/specializations/${specialization.id}/update`}>
                                            Update
                                        </Link>
                                        <Button variant="danger"
                                            onClick={(e) => { handleSpecializationDelete(specialization.id) }}>
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
