import { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { sendError, sendSuccess, errorMessage } from "../../shared/components/NotificationManager";
import attributeValueService from "../../shared/services/attributeValue.service";
import attributeService from "../../shared/services/attribute.service";
import employeeService from "../../shared/services/employee.service";


export default function CreateAttributeValue() {
    const [attributes, setAttributes] = useState([]);
    const [employees, setEmployees] = useState([]);

    const [attributeId, setAttributeId] = useState("");
    const [employeeId, setEmployeeId] = useState("");
    const [value, setValue] = useState("");

    const [validated, setValidated] = useState(false);

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
            const attributeValue = { attributeId, employeeId, value };
            attributeValueService.create(attributeValue)
                .then(() => {
                    sendSuccess("Attribute value successfully created");
                    form.reset();
                    clearState();
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

    const clearState = () => {
        setAttributeId("");
        setEmployeeId("");
        setValue("");
    }


    return (
        <div className="content">
            <h1 className="text-uppercase mb-30">Create attribute value</h1>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Attribute</Form.Label>
                    <Form.Select onChange={(e) => {
                        setAttributeId(e.target.value);
                    }} required>
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
                    <Form.Select onChange={(e) => {
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
                <Form.Group className="mb-3">
                    <Form.Label>Value</Form.Label>
                    <Form.Control type="text" placeholder="Enter value" onChange={(e) => {
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