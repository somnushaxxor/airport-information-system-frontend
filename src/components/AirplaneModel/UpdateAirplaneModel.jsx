import { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { sendError, sendSuccess, errorMessage } from "../NotificationManager";
import { useNavigate, useParams } from "react-router-dom";
import airplaneModelService from '../../services/airplaneModel.service';

export default function UpdateAirplaneModel() {
    const [name, setName] = useState("");
    const [passengersCapacity, setPassengersCapacity] = useState("");

    const [validated, setValidated] = useState(false);

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        init();
    }, []);

    const init = () => {
        airplaneModelService.getById(id)
            .then(response => {
                setName(response.data.name);
                setPassengersCapacity(response.data.passengersCapacity);
            })
            .catch(error => {
                if (error.response && error.response.status === 404) {
                    navigate("/404");
                } else {
                    sendError(errorMessage);
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
            const airplaneModel = { id, name, passengersCapacity };
            airplaneModelService.update(airplaneModel)
                .then(() => {
                    sendSuccess("Airplane model successfully updated");
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
            <h1 className="text-uppercase mb-30">Update airplane model</h1>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter name" value={name}
                        onChange={(e) => {
                            setName(e.target.value);
                        }} required />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Passengers capacity</Form.Label>
                    <Form.Control type="number" min="0" max={Math.pow(2, 31) - 1} placeholder="Enter passengers capacity"
                        value={passengersCapacity} onChange={(e) => {
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