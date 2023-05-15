import { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import employeesService from "../../services/employee.service";
import genderService from "../../services/gender.service";
import { sendError } from "../NotificationManager";
import departmentService from "../../services/department.service";
import specializationService from "../../services/specialization.service";

export default function CreateEmployee() {
    const [genders, setGenders] = useState([]);
    const [specializations, setSpecializations] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [brigades, setBrigades] = useState([]);

    const [validated, setValidated] = useState(false);

    const history = useHistory();

    let { id } = useParams();

    useEffect(() => {
        init();
    }, []);

    const init = () => {
        genderService.getAll()
            .then(response => {
                setGenders(response.data);
            })
            .catch(() => {
                sendError("Failed to fetch genders");
            });
        specializationService.getAll()
            .then(response => {
                setSpecializations(response.data);
            })
            .catch(() => {
                sendError("Failed to fetch specializations");
            });
        departmentService.getAll()
            .then(response => {
                setDepartments(response.data);
            })
            .catch(() => {
                sendError("Failed to fetch departments");
            });
    }

    // const createEmployee = (e) => {
    //     e.preventDefault();

    //     const employee = { id, firstName, lastName };

    //     employeesService.create(employee)
    //         .then(response => {
    //             console.log('Employee data added', response.data);
    //             history.push('/employees');
    //         })
    //         .catch(error => {
    //             console.log('Something went wrong', error);
    //         });

    // }

    const getDepartmentBrigades = (departmentValue) => {
        if (departmentValue === "") {
            setBrigades([]);
        } else {
            departmentService.getBrigadesByDepartmentId(departmentValue)
                .then(response => {
                    setBrigades(response.data);
                })
                .catch(() => {
                    sendError("Failed to fetch brigades");
                });
        }
    }

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            console.log("Submit failed");
        } else {
            console.log("Submit success");
        }
        setValidated(true);
    };


    return (
        <div className="container">
            <h1 className="text-uppercase" style={{ marginTop: 20, marginBottom: 20 }}>Create employee</h1>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>First name</Form.Label>
                    <Form.Control type="text" placeholder="Enter first name" required />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Last name</Form.Label>
                    <Form.Control type="text" placeholder="Enter last name" required />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Gender</Form.Label>
                    <Form.Select required>
                        <option value="">Choose gender</option>
                        {
                            genders.map(gender => (
                                <option value={gender.id}>{gender.name}</option>
                            ))
                        }
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Date of birth</Form.Label>
                    <Form.Control type="date" max={new Date().toISOString().split('T')[0]} placeholder="Date of birth" required />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Number of children</Form.Label>
                    <Form.Control type="number" min="0" placeholder="Enter number of children" required />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Salary</Form.Label>
                    <Form.Control type="number" min="0" placeholder="Enter salary" required />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Specialization</Form.Label>
                    <Form.Select required>
                        <option value="">Choose specialization</option>
                        {
                            specializations.map(specialization => (
                                <option value={specialization.id}>{specialization.name}</option>
                            ))
                        }
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Department</Form.Label>
                    <Form.Select onChange={e => getDepartmentBrigades(e.currentTarget.value)} required>
                        <option value="">Choose department</option>
                        {
                            departments.map(department => (
                                <option value={department.id}>{department.name}</option>
                            ))
                        }
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Brigade</Form.Label>
                    <Form.Select>
                        <option value="">Choose brigade</option>
                        {
                            brigades.map(brigade => (
                                <option value={brigade.id}>{brigade.name}</option>
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