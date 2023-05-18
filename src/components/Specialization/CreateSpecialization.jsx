import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { sendError, sendSuccess, errorMessage } from "../NotificationManager";
import specializationService from "../../services/specialization.service";

export default function CreateSpecialization() {
    const [name, setName] = useState("");

    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        if (form.checkValidity() === false) {
            event.stopPropagation();
            setValidated(true);
        } else {
            setValidated(false);
            const specialization = { name };
            specializationService.create(specialization)
                .then(() => {
                    sendSuccess("Specialization successfully created");
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
            <h1 className="text-uppercase mb-30">Create specialization</h1>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter name" onChange={(e) => {
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