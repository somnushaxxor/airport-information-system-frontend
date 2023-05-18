import { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { sendError, sendSuccess, errorMessage } from "../NotificationManager";
import departmentService from "../../services/department.service";

export default function RemoveDepartmentChief() {
    const [departments, setDepartments] = useState([]);

    const [departmentId, setDepartmentId] = useState("");

    const [validated, setValidated] = useState(false);

    useEffect(() => {
        init();
    }, []);

    const init = () => {
        departmentService.getAll()
            .then(response => {
                setDepartments(response.data);
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
            departmentService.removeDepartmentChief(departmentId)
                .then(() => {
                    sendSuccess("Department chief successfully removed");
                    form.reset();
                    clearState();
                })
                .catch(() => {
                    sendError(errorMessage);
                });
        }
    };

    const clearState = () => {
        setDepartmentId("");
    }

    return (
        <div className="content">
            <h1 className="text-uppercase mb-30">Remove department chief</h1>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Department</Form.Label>
                    <Form.Select onChange={(e) => {
                        setDepartmentId(e.target.value);
                    }} required>
                        <option value="">Choose department</option>
                        {
                            departments.map(department => (
                                <option key={department.id} value={department.id}>{department.name}</option>
                            ))
                        }
                    </Form.Select>
                </Form.Group>
                <Button className="mb-3" variant="primary" type="submit">
                    Submit
                </Button>
            </Form>

        </div >
    );
}