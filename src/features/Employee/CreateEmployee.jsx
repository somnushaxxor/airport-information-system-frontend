import { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { sendError, sendSuccess, errorMessage } from "../../shared/components/NotificationManager";
import brigadeService from "../../shared/services/brigade.service";
import specializationService from "../../shared/services/specialization.service";
import departmentService from "../../shared/services/department.service";
import employeeService from "../../shared/services/employee.service";
import genderService from "../../shared/services/gender.service";


export default function CreateEmployee() {
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
    const [numberOfChildren, setNumberOfChildren] = useState("");
    const [salary, setSalary] = useState("");
    const [specializationId, setSpecializationId] = useState("");
    const [departmentId, setDepartmentId] = useState("");
    const [brigadeId, setBrigadeId] = useState("");

    const [validated, setValidated] = useState(false);

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
                firstName, lastName, genderId, dateOfBirth, numberOfChildren,
                salary, specializationId, departmentId, brigadeId
            };
            employeeService.create(employee)
                .then(() => {
                    sendSuccess("Employee successfully created");
                    setBrigadeSelectionCheckboxChecked(false);
                    form.reset();
                    clearState();
                })
                .catch(() => {
                    sendError(errorMessage);
                });
        }
    };

    const clearState = () => {
        setFirstName("");
        setLastName("");
        setGenderId("");
        setDateOfBirth("");
        setNumberOfChildren("");
        setSalary("");
        setSpecializationId("");
        setDepartmentId("");
        setBrigadeId("");
    }


    return (
        <div className="content">
            <h1 className="text-uppercase mb-30">Create employee</h1>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>First name</Form.Label>
                    <Form.Control type="text" placeholder="Enter first name" onChange={(e) => {
                        setFirstName(e.target.value);
                    }} required />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Last name</Form.Label>
                    <Form.Control type="text" placeholder="Enter last name" onChange={(e) => {
                        setLastName(e.target.value);
                    }} required />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Gender</Form.Label>
                    <Form.Select onChange={(e) => {
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
                    <Form.Control type="date" max={new Date().toLocaleDateString("fr-ca")}
                        placeholder="Date of birth" onChange={(e) => {
                            setDateOfBirth(e.target.value);
                        }} required />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Number of children</Form.Label>
                    <Form.Control type="number" min="0" max={Math.pow(2, 31) - 1}
                        placeholder="Enter number of children" onChange={(e) => {
                            setNumberOfChildren(e.target.value);
                        }} required />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Salary</Form.Label>
                    <Form.Control type="number" min="0" max={Math.pow(2, 31) - 1} placeholder="Enter salary"
                        onChange={(e) => {
                            setSalary(e.target.value);
                        }} required />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Specialization</Form.Label>
                    <Form.Select onChange={(e) => {
                        setSpecializationId(e.target.value);
                        setBrigadeSelectionCheckboxChecked(false);
                        setBrigadeSelectionDisabled(true);
                        setBrigades([]);
                        setBrigadeId("");
                    }} required>
                        <option value="">Choose specialization</option>
                        {
                            specializations.map(specialization => (
                                <option key={specialization.id} value={specialization.id}>{specialization.name}</option>
                            ))
                        }
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Department</Form.Label>
                    <Form.Select onChange={(e) => {
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
                    <Form.Select disabled={brigadeSelectionDisabled} onChange={(e) => {
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