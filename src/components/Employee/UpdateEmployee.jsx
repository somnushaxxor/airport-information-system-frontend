import { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import employeesService from "../../services/employee.service";
import genderService from "../../services/gender.service";
import { sendError, sendSuccess, errorMessage } from "../NotificationManager";
import departmentService from "../../services/department.service";
import specializationService from "../../services/specialization.service";
import brigadeService from "../../services/brigade.service";
import { useNavigate, useParams } from "react-router-dom";

export default function UpdateEmployee() {
    const [genders, setGenders] = useState([]);
    const [specializations, setSpecializations] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [brigades, setBrigades] = useState([]);

    const [brigadeSelectionCheckboxChecked, setBrigadeSelectionCheckboxChecked] = useState(false);
    const [brigadeSelectionDisabled, setBrigadeSelectionDisabled] = useState(true);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [genderId, setGenderId] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [joinedAt, setJoinedAt] = useState("");
    const [numberOfChildren, setNumberOfChildren] = useState("");
    const [salary, setSalary] = useState("");
    const [specializationId, setSpecializationId] = useState("");
    const [departmentId, setDepartmentId] = useState("");
    const [brigadeId, setBrigadeId] = useState("");

    const [validated, setValidated] = useState(false);

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        init();
    }, []);

    const init = () => {
        employeesService.getById(id)
            .then(response => {
                setFirstName(response.data.firstName);
                setLastName(response.data.lastName);
                setGenderId(response.data.genderId);
                setDateOfBirth(response.data.dateOfBirth);
                setJoinedAt(response.data.joinedAt);
                setNumberOfChildren(response.data.numberOfChildren);
                setSalary(response.data.salary);
                setSpecializationId(response.data.specializationId);
                setDepartmentId(response.data.departmentId);
                if (response.data.brigadeId) {
                    setBrigadeSelectionCheckboxChecked(true);
                    setBrigadeSelectionDisabled(false);
                    brigadeService.getAllFiltered(response.data.specializationId, response.data.departmentId)
                        .then(response => {
                            setBrigades(response.data);
                        })
                        .catch(() => {
                            sendError(errorMessage);
                        });
                    setBrigadeId(response.data.brigadeId);
                }
            })
            .catch(error => {
                if (error.response && error.response.status === 404) {
                    navigate("/404");
                } else {
                    sendError(errorMessage);
                }
            });

        genderService.getAll()
            .then(response => {
                setGenders(response.data);
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
        departmentService.getAll()
            .then(response => {
                setDepartments(response.data);
            })
            .catch(() => {
                sendError(errorMessage);
            });
    }

    const isBrigadeSelectionCheckboxDisabled = () => {
        return !specializationId || !departmentId;
    }

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        if (form.checkValidity() === false) {
            event.stopPropagation();
            setValidated(true);
        } else {
            setValidated(false);
            const employee = {
                id, firstName, lastName, genderId, dateOfBirth, joinedAt, numberOfChildren,
                salary, specializationId, departmentId, brigadeId
            };
            employeesService.update(employee)
                .then(() => {
                    sendSuccess("Employee successfully updated");
                })
                .catch(() => {
                    sendError(errorMessage);
                });
        }
    };

    return (
        <div className="content">
            <h1 className="text-uppercase mb-30">Update employee</h1>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>First name</Form.Label>
                    <Form.Control type="text" placeholder="Enter first name" value={firstName}
                        onChange={(e) => {
                            setFirstName(e.target.value);
                        }} required />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Last name</Form.Label>
                    <Form.Control type="text" placeholder="Enter last name" value={lastName}
                        onChange={(e) => {
                            setLastName(e.target.value);
                        }} required />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Gender</Form.Label>
                    <Form.Select value={genderId} onChange={(e) => {
                        setGenderId(e.target.value);
                    }} required>
                        <option value="">Choose gender</option>
                        {
                            genders.map(gender => (
                                <option key={gender.id} value={gender.id}>{gender.name}</option>
                            ))
                        }
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Date of birth</Form.Label>
                    <Form.Control type="date" max={new Date().toLocaleDateString("fr-ca")} value={dateOfBirth}
                        placeholder="Date of birth" onChange={(e) => {
                            setDateOfBirth(e.target.value);
                        }} required />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Joined at</Form.Label>
                    <Form.Control type="date" max={new Date().toLocaleDateString("fr-ca")} value={joinedAt}
                        placeholder="Joined at" onChange={(e) => {
                            setJoinedAt(e.target.value);
                        }} required />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Number of children</Form.Label>
                    <Form.Control type="number" min="0" max={Math.pow(2, 31) - 1} value={numberOfChildren}
                        placeholder="Enter number of children" onChange={(e) => {
                            setNumberOfChildren(e.target.value);
                        }} required />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Salary</Form.Label>
                    <Form.Control type="number" min="0" max={Math.pow(2, 31) - 1} value={salary}
                        placeholder="Enter salary" onChange={(e) => {
                            setSalary(e.target.value);
                        }} required />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Specialization</Form.Label>
                    <Form.Select value={specializationId} onChange={(e) => {
                        setSpecializationId(e.target.value);
                        setBrigadeSelectionCheckboxChecked(false);
                        setBrigadeSelectionDisabled(true);
                        setBrigades([]);
                        setBrigadeId("");
                    }} required>
                        <option value="">Choose specialization</option>
                        {
                            specializations.map(specialization => (
                                <option key={specialization.id} value={specialization.id}>
                                    {specialization.name}
                                </option>
                            ))
                        }
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Department</Form.Label>
                    <Form.Select value={departmentId} onChange={(e) => {
                        setDepartmentId(e.target.value);
                        setBrigadeSelectionCheckboxChecked(false);
                        setBrigadeSelectionDisabled(true);
                        setBrigades([]);
                        setBrigadeId("");
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
                    <Form.Check
                        type="checkbox"
                        label="Choose brigade?"
                        checked={brigadeSelectionCheckboxChecked}
                        disabled={isBrigadeSelectionCheckboxDisabled()}
                        onChange={(e) => {
                            if (e.target.checked) {
                                brigadeService.getAllFiltered(specializationId, departmentId)
                                    .then(response => {
                                        setBrigades(response.data);
                                    })
                                    .catch(() => {
                                        sendError(errorMessage);
                                    });
                            } else {
                                setBrigades([]);
                                setBrigadeId("");
                            }
                            setBrigadeSelectionCheckboxChecked(e.target.checked);
                            setBrigadeSelectionDisabled(!e.target.checked);
                        }}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Brigade</Form.Label>
                    <Form.Select disabled={brigadeSelectionDisabled} value={brigadeId} onChange={(e) => {
                        setBrigadeId(e.target.value);
                    }} required>
                        <option value="">Choose brigade</option>
                        {
                            brigades.map(brigade => (
                                <option key={brigade.id} value={brigade.id}>{brigade.name}</option>
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