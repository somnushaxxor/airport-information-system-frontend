import { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { sendError, sendSuccess, errorMessage } from "../../shared/components/NotificationManager";
import pilotMedicalExaminationService from "../../shared/services/pilotMedicalExamination.service";
import employeeService from "../../shared/services/employee.service";


export default function CreatePilotMedicalExamination() {
    const [pilots, setPilots] = useState([]);

    const [pilotId, setPilotId] = useState("");
    const [date, setDate] = useState("");

    const [validated, setValidated] = useState(false);

    useEffect(() => {
        init();
    }, []);

    const init = () => {
        employeeService.getAllPilots()
            .then(response => {
                setPilots(response.data);
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
            const pilotMedicalExamination = { pilotId, date };
            pilotMedicalExaminationService.create(pilotMedicalExamination)
                .then(() => {
                    sendSuccess("Pilot medical examination successfully created");
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
        setPilotId("");
        setDate("");
    }


    return (
        <div className="content">
            <h1 className="text-uppercase mb-30">Create pilot medical examination</h1>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Pilot</Form.Label>
                    <Form.Select onChange={(e) => {
                        setPilotId(e.target.value);
                    }} required>
                        <option value="">Choose pilot</option>
                        {
                            pilots.map(pilot => (
                                <option key={pilot.id} value={pilot.id}>
                                    {pilot.firstName + " " + pilot.lastName}
                                </option>
                            ))
                        }
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Date</Form.Label>
                    <Form.Control type="date" max={new Date().toLocaleDateString("fr-ca")}
                        placeholder="Date" onChange={(e) => {
                            setDate(e.target.value);
                        }} required />
                </Form.Group>
                <Button className="mb-3" variant="primary" type="submit">
                    Submit
                </Button>
            </Form>

        </div >
    );
}