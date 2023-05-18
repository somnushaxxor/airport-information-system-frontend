import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import Badge from 'react-bootstrap/Badge'
import { Button } from 'react-bootstrap';
import { sendError, sendSuccess, errorMessage } from '../NotificationManager';
import brigadeService from '../../services/brigade.service';

export default function Brigades() {
    const [brigades, setBrigades] = useState([]);

    useEffect(() => {
        init();
    }, []);

    const init = () => {
        brigadeService.getAll()
            .then(response => {
                setBrigades(response.data);
            })
            .catch(() => {
                sendError(errorMessage);
            });
    }

    const reloadBrigades = () => {
        brigadeService.getAll()
            .then(response => {
                setBrigades(response.data);
            })
            .catch(() => {
                sendError(errorMessage);
            });
    }

    const handleBrigadeDelete = (id) => {
        brigadeService.deleteById(id)
            .then(() => {
                sendSuccess("Brigade successfully deleted")
                reloadBrigades();
            })
            .catch(error => {
                sendError(error.response.data.message);
            })
    }

    return (
        <div className="content">
            <h1 className="text-uppercase mb-30">Brigades</h1>
            <div className="d-flex flex-wrap">
                <Link to="/departments/create" className="btn btn-success btn-lg mb-20" style={{ marginRight: 10 }}>
                    Create brigade
                </Link>
                <h4 className="mb-20">
                    <Badge bg="dark">Total: {brigades.length}</Badge>
                </h4>
                <Table striped bordered hover variant="dark">
                    <thead >
                        <tr>
                            <th>Name</th>
                            <th>Department</th>
                            <th>Specialization</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            brigades.map(brigade => (
                                <tr key={brigade.id}>
                                    <td>{brigade.name}</td>
                                    <td>{brigade.departmentName}</td>
                                    <td>{brigade.specializationName}</td>
                                    <td>
                                        <Link className="btn btn-primary" style={{ marginRight: 10 }}
                                            to={`/brigades/${brigade.id}/update`}>
                                            Update
                                        </Link>
                                        <Button variant="danger"
                                            onClick={(e) => { handleBrigadeDelete(brigade.id) }}>
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
