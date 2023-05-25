import { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { sendError, sendSuccess, errorMessage } from "../../shared/components/NotificationManager";
import pilotMedicalExaminationService from "../../shared/services/pilotMedicalExamination.service";
import employeeService from "../../shared/services/employee.service";


export default function UpdatePilotMedicalExamination() {
    const [pilots, setPilots] = useState([]);

    const [pilotId, setPilotId] = useState("");
    const [date, setDate] = useState("");

    const [validated, setValidated] = useState(false);

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        init();
    }, []);

    const init = () => {
        pilotMedicalExaminationService.getById(id)
            .then(response => {
                setPilotId(response.data.pilotId);
                setDate(response.data.date);
            })
            .catch(error => {
                if (error.response && error.response.status === 404) {
                    navigate("/404");
                } else {
                    sendError(errorMessage);
                }
            });

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
            const examination = { id, pilotId, date };
            pilotMedicalExaminationService.update(examination)
                .then(() => {
                    sendSuccess("Pilot medical examination successfully updated");
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
            <h1 className="text-uppercase mb-30">Update pilot medical examination</h1>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Pilot</Form.Label>
                    <Form.Select value={pilotId} disabled onChange={(e) => {
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
                    <Form.Control type="date" value={date} max={new Date().toLocaleDateString("fr-ca")}
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