import { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { sendError, sendSuccess, errorMessage } from "../../shared/components/NotificationManager";
import airplaneService from "../../shared/services/airplane.service";
import airplaneMaintenanceOperationService from "../../shared/services/airplaneMaintenanceOperation.service";


export default function CreateAirplaneMaintenanceOperation() {
    const [airplanes, setAirplanes] = useState([]);

    const [doneAt, setDoneAt] = useState("");
    const [repairRequired, setRepairRequired] = useState(false);
    const [airplaneId, setAirplaneId] = useState("");

    const [repairRequiredCheckboxChecked, setRepairRequiredCheckboxChecked] = useState(false);

    const [validated, setValidated] = useState(false);

    useEffect(() => {
        init();
    }, []);

    const init = () => {
        airplaneService.getAll()
            .then(response => {
                setAirplanes(response.data);
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
            const airplaneMaintenanceOperation = { doneAt, repairRequired, airplaneId };
            airplaneMaintenanceOperationService.create(airplaneMaintenanceOperation)
                .then(() => {
                    sendSuccess("Airplane maintenance operation successfully created");
                    form.reset();
                    setRepairRequiredCheckboxChecked(false);
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
        setDoneAt("");
        setRepairRequired(false);
        setAirplaneId("");
    }


    return (
        <div className="content">
            <h1 className="text-uppercase mb-30">Create airplane maintenance operation</h1>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Done at</Form.Label>
                    <Form.Control type="date" max={new Date().toLocaleDateString("fr-ca")}
                        placeholder="Done at" onChange={(e) => {
                            setDoneAt(e.target.value);
                        }} required />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Check
                        type="checkbox"
                        label="Is repair required?"
                        checked={repairRequiredCheckboxChecked}
                        onChange={(e) => {
                            setRepairRequiredCheckboxChecked(e.target.checked);
                            setRepairRequired(e.target.checked);
                        }}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Airplane</Form.Label>
                    <Form.Select onChange={(e) => {
                        setAirplaneId(e.target.value);
                    }} required>
                        <option value="">Choose airplane</option>
                        {
                            airplanes.map(airplane => (
                                <option key={airplane.id} value={airplane.id}>{airplane.id}</option>
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