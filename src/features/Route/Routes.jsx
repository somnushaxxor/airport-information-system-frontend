import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Badge from "react-bootstrap/Badge"
import { Button } from "react-bootstrap";
import { sendError, sendSuccess, errorMessage } from "../../shared/components/NotificationManager";
import routeService from "../../shared/services/route.service";


export default function Routes() {
    const [routes, setRoutes] = useState([]);

    useEffect(() => {
        init();
    }, []);

    const init = () => {
        routeService.getAll()
            .then(response => {
                setRoutes(response.data);
            })
            .catch(() => {
                sendError(errorMessage);
            });
    }

    const reloadRoutes = () => {
        routeService.getAll()
            .then(response => {
                setRoutes(response.data);
            })
            .catch(() => {
                sendError(errorMessage);
            });
    }

    const handleRouteDelete = (id) => {
        routeService.deleteById(id)
            .then(() => {
                sendSuccess("Route successfully deleted")
                reloadRoutes();
            })
            .catch(() => {
                sendError(errorMessage);
            });
    }

    return (
        <div className="content">
            <h1 className="text-uppercase mb-30">Routes</h1>
            <div className="d-flex flex-wrap">
                <Link to="/routes/create" className="btn btn-success btn-lg mb-20" style={{ marginRight: 10 }}>
                    Create route
                </Link>
                <h4 className="mb-20">
                    <Badge bg="dark">Total: {routes.length}</Badge>
                </h4>
                <Table striped bordered hover variant="dark">
                    <thead >
                        <tr>
                            <th>Departure airport</th>
                            <th>Departure city</th>
                            <th>Transfer airport</th>
                            <th>Transfer city</th>
                            <th>Arrival airport</th>
                            <th>Arrival city</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            routes.map(route => (
                                <tr key={route.id}>
                                    <td>{route.departureAirportName}</td>
                                    <td>{route.departureCityName}</td>
                                    <td>{route.transferAirportName}</td>
                                    <td>{route.transferCityName}</td>
                                    <td>{route.arrivalAirportName}</td>
                                    <td>{route.arrivalCityName}</td>
                                    <td>
                                        <Link className="btn btn-primary" style={{ marginRight: 10 }}
                                            to={`/routes/${route.id}/update`}>
                                            Update
                                        </Link>
                                        <Button variant="danger"
                                            onClick={(e) => { handleRouteDelete(route.id) }}>
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
