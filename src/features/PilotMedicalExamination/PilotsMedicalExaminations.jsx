import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Badge from "react-bootstrap/Badge"
import { Button, Form, Row, Col } from "react-bootstrap";
import { sendError, sendSuccess, errorMessage } from "../../shared/components/NotificationManager";
import pilotMedicalExaminationService from "../../shared/services/pilotMedicalExamination.service";
import employeeService from "../../shared/services/employee.service";
import genderService from "../../shared/services/gender.service";


export default function PilotsMedicalExaminations() {
    const [genders, setGenders] = useState([]);

    const [pilots, setPilots] = useState([]);

    const [year, setYear] = useState("");
    const [genderId, setGenderId] = useState("");
    const [ageInYears, setAgeInYears] = useState("");
    const [salary, setSalary] = useState("");

    const [validated, setValidated] = useState(false);

    const [pilotsMedicalExaminations, setPilotsMedicalExaminations] = useState([]);

    useEffect(() => {
        init();
    }, []);

    const init = () => {
        genderService.getAll()
            .then(response => {
                setGenders(response.data);
            })
            .catch(() => {
                sendError(errorMessage);
            });
        pilotMedicalExaminationService.getAll()
            .then(response => {
                setPilotsMedicalExaminations(response.data);
            })
            .catch(() => {
                sendError(errorMessage);
            });
    }

    const handleSearch = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        if (form.checkValidity() === false) {
            event.stopPropagation();
            setValidated(true);
        } else {
            setValidated(false);
            employeeService.getAllPilotsBy(year, genderId, ageInYears, salary)
                .then(response => {
                    setPilots(response.data);
                })
                .catch(() => {
                    sendError(errorMessage);
                });
        }
    };

    const handleClear = () => {
        setYear("");
        setGenderId("");
        setAgeInYears("");
        setSalary("");
        setValidated(false);
        setPilots([]);
    }

    const reloadPilotsMedicalExaminations = () => {
        pilotMedicalExaminationService.getAllFiltered()
            .then(response => {
                setPilotsMedicalExaminations(response.data);
            })
            .catch(() => {
                sendError(errorMessage);
            });
    }

    const handlePilotMedicalExaminationDelete = (id) => {
        pilotMedicalExaminationService.deleteById(id)
            .then(() => {
                sendSuccess("Pilot medical examination successfully deleted")
                reloadPilotsMedicalExaminations();
            })
            .catch(() => {
                sendError(errorMessage);
            });
    }

    return (
        <div className="content">
            <h1 className="text-uppercase mb-30">Pilots medical examinations</h1>
            <div>
                <Form noValidate validated={validated} onSubmit={handleSearch} onReset={handleClear} className="mb-30">
                    <Row className="mb-3">
                        <Form.Group as={Col}>
                            <Form.Label>Year</Form.Label>
                            <Form.Control type="date" value={year} max={new Date().toLocaleDateString("fr-ca")}
                                placeholder="Year" onChange={(e) => {
                                    setYear(e.target.value);
                                }} required />
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>Gender</Form.Label>
                            <Form.Select value={genderId} onChange={(e) => {
                                setGenderId(e.target.value);
                            }}>
                                <option value="">Choose gender</option>
                                {
                                    genders.map(gender => (
                                        <option key={gender.id} value={gender.id}>{gender.name}</option>
                                    ))
                                }
                            </Form.Select>
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>Age in years</Form.Label>
                            <Form.Control value={ageInYears} type="number" min="0" max={Math.pow(2, 31) - 1}
                                placeholder="Enter age in years" onChange={(e) => {
                                    setAgeInYears(e.target.value);
                                }} />
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>Salary</Form.Label>
                            <Form.Control value={salary} type="number" min="0" max={Math.pow(2, 31) - 1}
                                placeholder="Enter salary" onChange={(e) => {
                                    setSalary(e.target.value);
                                }} />
                        </Form.Group>
                    </Row>
                    <Button style={{ marginRight: 10 }} variant="info" size="lg" type="submit">
                        Search
                    </Button>
                    <Button variant="warning" size="lg" type="reset">
                        Clear
                    </Button>
                </Form>
            </div>
            <div className="d-flex flex-wrap">
                <h4 className="mb-20">
                    <Badge bg="dark">Total: {pilots.length}</Badge>
                </h4>
                <Table striped bordered hover variant="dark">
                    <thead >
                        <tr>
                            <th>Pilot</th>
                            <th>Gender</th>
                            <th>Date of birth</th>
                            <th>Salary</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            pilots.map(pilot => (
                                <tr key={pilot.id}>
                                    <td>{pilot.firstName + " " + pilot.lastName}</td>
                                    <td>{pilot.genderName}</td>
                                    <td>{pilot.dateOfBirth}</td>
                                    <td>{pilot.salary}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>
            </div>
            <div className="d-flex flex-wrap">
                <Link to="/pilots-medical-examinations/create" className="btn btn-success btn-lg mb-20" style={{ marginRight: 10 }}>
                    Create pilot medical examination
                </Link>
                <h4 className="mb-20">
                    <Badge bg="dark">Total: {pilotsMedicalExaminations.length}</Badge>
                </h4>
                <Table striped bordered hover variant="dark">
                    <thead >
                        <tr>
                            <th>Pilot</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            pilotsMedicalExaminations.map(examination => (
                                <tr key={examination.id}>
                                    <td>{examination.pilotFirstName + " " + examination.pilotLastName}</td>
                                    <td>{examination.date}</td>
                                    <td>
                                        <Link className="btn btn-primary" style={{ marginRight: 10 }}
                                            to={`/pilots-medical-examinations/${examination.id}/update`}>
                                            Update
                                        </Link>
                                        <Button variant="danger"
                                            onClick={(e) => { handlePilotMedicalExaminationDelete(examination.id) }}>
                                            Delete
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>
            </div>
        </div >
    );
}
