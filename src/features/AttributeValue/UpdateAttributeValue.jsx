import { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { sendError, sendSuccess, errorMessage } from "../../shared/components/NotificationManager";
import attributeValueService from "../../shared/services/attributeValue.service";
import attributeService from "../../shared/services/attribute.service";
import employeeService from "../../shared/services/employee.service";


export default function UpdateAttributeValue() {
    const [attributes, setAttributes] = useState([]);
    const [employees, setEmployees] = useState([]);

    const [attributeId, setAttributeId] = useState("");
    const [employeeId, setEmployeeId] = useState("");
    const [value, setValue] = useState("");

    const [validated, setValidated] = useState(false);

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        init();
    }, []);

    const init = () => {
        attributeValueService.getById(id)
            .then(response => {
                setAttributeId(response.data.attributeId);
                setEmployeeId(response.data.employeeId)
                setValue(response.data.value);
            })
            .catch(error => {
                if (error.response && error.response.status === 404) {
                    navigate("/404");
                } else {
                    sendError(errorMessage);
                }
            });
        attributeService.getAll()
            .then(response => {
                setAttributes(response.data);
            })
            .catch(() => {
                sendError(errorMessage);
            });
        employeeService.getAll()
            .then(response => {
                setEmployees(response.data);
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
            const attributeValue = { id, attributeId, employeeId, value };
            attributeValueService.update(attributeValue)
                .then(() => {
                    sendSuccess("Attribute value successfully updated");
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

    return (
        <div className="content">
            <h1 className="text-uppercase mb-30">Update attribute value</h1>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Attribute</Form.Label>
                    <Form.Select value={attributeId} onChange={(e) => {
                        setAttributeId(e.target.value);
                    }} disabled>
                        <option value="">Choose attribute</option>
                        {
                            attributes.map(attribute => (
                                <option key={attribute.id} value={attribute.id}>{attribute.name}</option>
                            ))
                        }
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Employee</Form.Label>
                    <Form.Select value={employeeId} onChange={(e) => {
                        setEmployeeId(e.target.value);
                    }} disabled>
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
                <Form.Group className="mb-3">
                    <Form.Label>Value</Form.Label>
                    <Form.Control type="text" placeholder="Enter value" value={value}
                        onChange={(e) => {
                            setValue(e.target.value);
                        }} required />
                </Form.Group>
                <Button className="mb-3" variant="primary" type="submit">
                    Submit
                </Button>
            </Form>

        </div >
    );
}