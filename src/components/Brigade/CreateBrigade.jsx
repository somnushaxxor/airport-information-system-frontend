import { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { sendError, sendSuccess, errorMessage } from "../NotificationManager";
import specializationService from "../../services/specialization.service";
import departmentService from '../../services/department.service';
import brigadeService from '../../services/brigade.service';

export default function CreateBrigade() {
    const [departments, setDepartments] = useState([]);
    const [specializations, setSpecializations] = useState([]);

    const [name, setName] = useState("");
    const [departmentId, setDepartmentId] = useState("");
    const [specializationId, setSpecializationId] = useState("");

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
        specializationService.getAll()
            .then(response => {
                setSpecializations(response.data);
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
            const brigade = { name, departmentId, specializationId };
            brigadeService.create(brigade)
                .then(() => {
                    sendSuccess("Brigade successfully created");
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
        setName("");
    }


    return (
        <div className="content">
            <h1 className="text-uppercase mb-30">Create brigade</h1>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter name" onChange={(e) => {
                        setName(e.target.value);
                    }} required />
                </Form.Group>
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
                <Form.Group className="mb-3">
                    <Form.Label>Specialization</Form.Label>
                    <Form.Select onChange={(e) => {
                        setSpecializationId(e.target.value);
                    }} required>
                        <option value="">Choose specialization</option>
                        {
                            specializations.map(specialization => (
                                <option key={specialization.id} value={specialization.id}>{specialization.name}</option>
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