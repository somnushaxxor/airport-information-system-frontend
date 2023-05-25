import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { sendError, sendSuccess, errorMessage } from "../../shared/components/NotificationManager";
import airplaneModelService from "../../shared/services/airplaneModel.service";


export default function CreateAirplaneModel() {
    const [name, setName] = useState("");
    const [passengersCapacity, setPassengersCapacity] = useState("");

    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        if (form.checkValidity() === false) {
            event.stopPropagation();
            setValidated(true);
        } else {
            setValidated(false);
            const airplaneModel = { name, passengersCapacity };
            airplaneModelService.create(airplaneModel)
                .then(() => {
                    sendSuccess("Airplane model successfully created");
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
            <h1 className="text-uppercase mb-30">Create airplane model</h1>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter name" onChange={(e) => {
                        setName(e.target.value);
                    }} required />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Passengers capacity</Form.Label>
                    <Form.Control type="number" min="0" max={Math.pow(2, 31) - 1} placeholder="Enter passengers capacity"
                        onChange={(e) => {
                            setPassengersCapacity(e.target.value);
                        }} required />
                </Form.Group>
                <Button className="mb-3" variant="primary" type="submit">
                    Submit
                </Button>
            </Form>

        </div >
    );
}