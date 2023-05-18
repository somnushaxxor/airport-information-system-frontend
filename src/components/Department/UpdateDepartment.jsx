import { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { sendError, sendSuccess, errorMessage } from "../NotificationManager";
import departmentService from "../../services/department.service";
import { useNavigate, useParams } from "react-router-dom";

export default function UpdateDepartment() {
    const [name, setName] = useState("");

    const [validated, setValidated] = useState(false);

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        init();
    }, []);

    const init = () => {
        departmentService.getById(id)
            .then(response => {
                setName(response.data.name);
            })
            .catch(error => {
                if (!error.response) {
                    sendError(errorMessage);
                } else {
                    navigate("/404");
                }
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
            const department = { id, name };
            departmentService.update(department)
                .then(() => {
                    sendSuccess("Department successfully updated.");
                })
                .catch(error => {
                    if (!error.response) {
                        sendError(errorMessage);
                    } else {
                        sendError(error.response.data.message);
                    }
                });
        }
    };

    return (
        <div className="content">
            <h1 className="text-uppercase mb-30">Update department</h1>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter name" value={name}
                        onChange={(e) => {
                            setName(e.target.value);
                        }} required />
                </Form.Group>
                <Button className="mb-3" variant="primary" type="submit">
                    Submit
                </Button>
            </Form>

        </div >
    );
}