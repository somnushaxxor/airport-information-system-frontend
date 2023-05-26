import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Badge from "react-bootstrap/Badge"
import { Button } from "react-bootstrap";
import { sendError, sendSuccess, errorMessage } from "../../shared/components/NotificationManager";
import attributeService from "../../shared/services/attribute.service";


export default function Attributes() {
    const [attributes, setAttributes] = useState([]);

    useEffect(() => {
        init();
    }, []);

    const init = () => {
        attributeService.getAll()
            .then(response => {
                setAttributes(response.data);
            })
            .catch(() => {
                sendError(errorMessage);
            });
    }

    const reloadAttributes = () => {
        attributeService.getAll()
            .then(response => {
                setAttributes(response.data);
            })
            .catch(() => {
                sendError(errorMessage);
            });
    }

    const handleAttributesDelete = (id) => {
        attributeService.deleteById(id)
            .then(() => {
                sendSuccess("Attribute successfully deleted")
                reloadAttributes();
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
            <h1 className="text-uppercase mb-30">Attributes</h1>
            <div className="d-flex flex-wrap">
                <Link to="/employees/attributes/create" className="btn btn-success btn-lg mb-20" style={{ marginRight: 10 }}>
                    Create attribute
                </Link>
                <h4 className="mb-20">
                    <Badge bg="dark">Total: {attributes.length}</Badge>
                </h4>
                <Table striped bordered hover variant="dark">
                    <thead >
                        <tr>
                            <th>Name</th>
                            <th>Specialization</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            attributes.map(attribute => (
                                <tr key={attribute.id}>
                                    <td>{attribute.name}</td>
                                    <td>{attribute.specializationName}</td>
                                    <td>
                                        <Link className="btn btn-primary" style={{ marginRight: 10 }}
                                            to={`/employees/attributes/${attribute.id}/update`}>
                                            Update
                                        </Link>
                                        <Button variant="danger"
                                            onClick={(e) => { handleAttributesDelete(attribute.id) }}>
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
