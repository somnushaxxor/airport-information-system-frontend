import { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { sendError, sendSuccess, errorMessage } from "../../shared/components/NotificationManager";
import specializationService from "../../shared/services/specialization.service";
import attributeService from "../../shared/services/attribute.service";


export default function CreateAttribute() {
    const [specializations, setSpecializations] = useState([]);

    const [name, setName] = useState("");
    const [specializationId, setSpecializationId] = useState("");

    const [validated, setValidated] = useState(false);

    useEffect(() => {
        init();
    }, []);

    const init = () => {
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
            const attribute = { name, specializationId };
            attributeService.create(attribute)
                .then(() => {
                    sendSuccess("Attribute successfully created");
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
        setSpecializationId("");
    }


    return (
        <div className="content">
            <h1 className="text-uppercase mb-30">Create attribute</h1>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter name" onChange={(e) => {
                        setName(e.target.value);
                    }} required />
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