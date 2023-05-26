import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Badge from "react-bootstrap/Badge"
import { Button, Form, Row, Col } from "react-bootstrap";
import { sendError, sendSuccess, errorMessage } from "../../shared/components/NotificationManager";
import attributeValueService from "../../shared/services/attributeValue.service";
import employeeService from "../../shared/services/employee.service";


export default function AttributeValues() {
    const [employees, setEmployees] = useState([]);

    const [employeeId, setEmployeeId] = useState("");

    const [validated, setValidated] = useState(false);

    const [attributeValues, setAttributeValues] = useState([]);

    useEffect(() => {
        init();
    }, []);

    const init = () => {
        employeeService.getAll()
            .then(response => {
                setEmployees(response.data);
            })
            .catch(() => {
                sendError(errorMessage);
            });
    }

    const reloadAttributeValues = () => {
        attributeValueService.getAllFiltered(employeeId)
            .then(response => {
                setAttributeValues(response.data);
            })
            .catch(() => {
                sendError(errorMessage);
            });
    }

    const handleAttributeValueDelete = (id) => {
        attributeValueService.deleteById(id)
            .then(() => {
                sendSuccess("Attribute value successfully deleted")
                reloadAttributeValues();
            })
            .catch(error => {
                if (error.response && error.response.status === 400) {
                    sendError(error.response.data.message);
                } else {
                    sendError(errorMessage);
                }
            });
    }

    const handleSearch = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        if (form.checkValidity() === false) {
            event.stopPropagation();
            setValidated(true);
        } else {
            setValidated(false);
            attributeValueService.getAllFiltered(employeeId)
                .then(response => {
                    setAttributeValues(response.data);
                })
                .catch(() => {
                    sendError(errorMessage);
                });
        }
    };

    const handleClear = () => {
        setEmployeeId("");
        setValidated(false);
        setAttributeValues([]);
    }

    return (
        <div className="content">
            <h1 className="text-uppercase mb-30">Attribute values</h1>
            <div>
                <Form noValidate validated={validated} onSubmit={handleSearch} onReset={handleClear} className="mb-30">
                    <Row className="mb-3">
                        <Form.Group as={Col}>
                            <Form.Label>Employee</Form.Label>
                            <Form.Select value={employeeId} onChange={(e) => {
                                setEmployeeId(e.target.value);
                            }} required>
                                <option value="">Choose employee</option>
                                {
                                    employees.map(employee => (
                                        <option key={employee.id} value={employee.id}>
                                            {employee.firstName + " " + employee.lastName}
                                        </option>
                                    ))
                                }
                            </Form.Select>
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
                <Link to="/employees/attributes/values/create" className="btn btn-success btn-lg mb-20" style={{ marginRight: 10 }}>
                    Create attribute value
                </Link>
                <h4 className="mb-20">
                    <Badge bg="dark">Total: {attributeValues.length}</Badge>
                </h4>
                <Table striped bordered hover variant="dark">
                    <thead >
                        <tr>
                            <th>Attribute</th>
                            <th>Employee</th>
                            <th>Value</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            attributeValues.map(attributeValue => (
                                <tr key={attributeValue.id}>
                                    <td>{attributeValue.attributeName}</td>
                                    <td>
                                        {attributeValue.employeeFirstName + " " + attributeValue.employeeLastName}
                                    </td>
                                    <td>{attributeValue.value}</td>
                                    <td>
                                        <Link className="btn btn-primary" style={{ marginRight: 10 }}
                                            to={`/employees/attributes/values/${attributeValue.id}/update`}>
                                            Update
                                        </Link>
                                        <Button variant="danger"
                                            onClick={(e) => { handleAttributeValueDelete(attributeValue.id) }}>
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
