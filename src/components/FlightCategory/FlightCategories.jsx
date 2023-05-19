import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import Badge from 'react-bootstrap/Badge'
import { Button } from 'react-bootstrap';
import { sendError, sendSuccess, errorMessage } from '../NotificationManager';
import flightCategoryService from "../../services/flightCategory.service";

export default function FlightCategories() {
    const [flightCategories, setFlightCategories] = useState([]);

    useEffect(() => {
        init();
    }, []);

    const init = () => {
        flightCategoryService.getAll()
            .then(response => {
                setFlightCategories(response.data);
            })
            .catch(() => {
                sendError(errorMessage);
            });
    }

    const reloadFlightCategories = () => {
        flightCategoryService.getAll()
            .then(response => {
                setFlightCategories(response.data);
            })
            .catch(() => {
                sendError(errorMessage);
            });
    }

    const handleFlightCategoryDelete = (id) => {
        flightCategoryService.deleteById(id)
            .then(() => {
                sendSuccess("Flight category successfully deleted")
                reloadFlightCategories();
            })
            .catch(() => {
                sendError(errorMessage);
            });
    }

    return (
        <div className="content">
            <h1 className="text-uppercase mb-30">Flight categories</h1>
            <div className="d-flex flex-wrap">
                <Link to="/flights/categories/create" className="btn btn-success btn-lg mb-20" style={{ marginRight: 10 }}>
                    Create flight category
                </Link>
                <h4 className="mb-20">
                    <Badge bg="dark">Total: {flightCategories.length}</Badge>
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
                            flightCategories.map(flightCategory => (
                                <tr key={flightCategory.id}>
                                    <td>{flightCategory.name}</td>
                                    <td>
                                        <Link className="btn btn-primary" style={{ marginRight: 10 }}
                                            to={`/flights/categories/${flightCategory.id}/update`}>
                                            Update
                                        </Link>
                                        <Button variant="danger"
                                            onClick={(e) => { handleFlightCategoryDelete(flightCategory.id) }}>
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
