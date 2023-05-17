import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import Badge from 'react-bootstrap/Badge'
import { Button, Form, Row, Col } from 'react-bootstrap';
import employeesService from '../../services/employee.service';
import { sendError, sendSuccess } from '../NotificationManager';
import genderService from '../../services/gender.service';
import departmentService from '../../services/department.service';
import brigadeService from '../../services/brigade.service';

export default function Employees() {
    const [genders, setGenders] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [brigades, setBrigades] = useState([]);

    const [employees, setEmployees] = useState([]);

    const [genderId, setGenderId] = useState("");
    const [departmentId, setDepartmentId] = useState("");
    const [brigadeId, setBrigadeId] = useState("");
    const [workExperienceInYears, setWorkExperienceInYears] = useState("");
    const [ageInYears, setAgeInYears] = useState("");
    const [numberOfChildren, setNumberOfChildren] = useState("");
    const [salary, setSalary] = useState("");

    const errorMessage = "Something went wrong. Please try again a bit later.";

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
        departmentService.getAll()
            .then(response => {
                setDepartments(response.data);
            })
            .catch(() => {
                sendError(errorMessage);
            });
        brigadeService.getAll()
            .then(response => {
                setBrigades(response.data);
            })
            .catch(() => {
                sendError(errorMessage);
            });
        employeesService.getAllFiltered(genderId, departmentId, brigadeId, workExperienceInYears, ageInYears,
            numberOfChildren, salary)
            .then(response => {
                setEmployees(response.data);
            })
            .catch(() => {
                sendError(errorMessage);
            });
    }

    const reloadEmployees = () => {
        employeesService.getAllFiltered(genderId, departmentId, brigadeId, workExperienceInYears, ageInYears,
            numberOfChildren, salary)
            .then(response => {
                setEmployees(response.data);
            })
            .catch(() => {
                sendError(errorMessage);
            });
    }

    const handleEmployeeDelete = id => {
        employeesService.deleteById(id)
            .then(() => {
                sendSuccess("Employee successfully deleted.")
                reloadEmployees();
            })
            .catch(error => {
                sendError(error.response.data.message);
            })
    }

    const handleSearch = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        if (form.checkValidity() === false) {
            event.stopPropagation();
        } else {
            employeesService.getAllFiltered(genderId, departmentId, brigadeId, workExperienceInYears, ageInYears,
                numberOfChildren, salary)
                .then(response => {
                    setEmployees(response.data);
                })
                .catch(() => {
                    sendError(errorMessage);
                });
        }
    };

    const handleClear = () => {
        setGenderId("");
        setDepartmentId("");
        setBrigadeId("");
        setWorkExperienceInYears("");
        setAgeInYears("");
        setNumberOfChildren("");
        setSalary("");
        setBrigades([]);
        brigadeService.getAll()
            .then(response => {
                setBrigades(response.data);
            })
            .catch(() => {
                sendError(errorMessage);
            });
    }

    return (
        <div className="content">
            <h1 className="text-uppercase mb-30">Employees</h1>
            <div>
                <Form noValidate onSubmit={handleSearch} onReset={handleClear} className="mb-30">
                    <Row className="mb-3">
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
                            <Form.Label>Department</Form.Label>
                            <Form.Select value={departmentId} onChange={(e) => {
                                setDepartmentId(e.target.value);
                                setBrigadeId("");
                                setBrigades([]);
                                brigadeService.getAllBy("", e.target.value)
                                    .then(response => {
                                        setBrigades(response.data);
                                    })
                                    .catch(() => {
                                        sendError(errorMessage);
                                    });
                            }}>
                                <option value="">Choose department</option>
                                {
                                    departments.map(department => (
                                        <option key={department.id} value={department.id}>
                                            {department.name}
                                        </option>
                                    ))
                                }
                            </Form.Select>
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>Brigade</Form.Label>
                            <Form.Select value={brigadeId} onChange={(e) => {
                                setBrigadeId(e.target.value);
                            }}>
                                <option value="">Choose brigade</option>
                                {
                                    brigades.map(brigade => (
                                        <option key={brigade.id} value={brigade.id}>{brigade.name}</option>
                                    ))
                                }
                            </Form.Select>
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col}>
                            <Form.Label>Work experience in years</Form.Label>
                            <Form.Control value={workExperienceInYears} type="number" min="0"
                                max={Math.pow(2, 31) - 1} placeholder="Enter work experience in years"
                                onChange={(e) => {
                                    setWorkExperienceInYears(e.target.value);
                                }} />
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>Age in years</Form.Label>
                            <Form.Control value={ageInYears} type="number" min="0" max={Math.pow(2, 31) - 1}
                                placeholder="Enter age in years" onChange={(e) => {
                                    setAgeInYears(e.target.value);
                                }} />
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>Number of children</Form.Label>
                            <Form.Control value={numberOfChildren} type="number" min="0" max={Math.pow(2, 31) - 1}
                                placeholder="Enter number of children" onChange={(e) => {
                                    setNumberOfChildren(e.target.value);
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
                <Link to="/employees/create" className="btn btn-success btn-lg mb-20" style={{ marginRight: 10 }}>
                    Create employee
                </Link>
                <h4 className="mb-20">
                    <Badge bg="dark">Total: {employees.length}</Badge>
                </h4>
                <Table striped bordered hover variant="dark">
                    <thead >
                        <tr>
                            <th>Name</th>
                            <th>Gender</th>
                            <th>Data of birth</th>
                            <th>Joined at</th>
                            <th>Number of children</th>
                            <th>Salary</th>
                            <th>Specialization</th>
                            <th>Department</th>
                            <th>Brigade</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            employees.map(employee => (
                                <tr key={employee.id}>
                                    <td>{employee.name}</td>
                                    <td>{employee.genderName}</td>
                                    <td>{employee.dateOfBirth}</td>
                                    <td>{employee.joinedAt}</td>
                                    <td>{employee.numberOfChildren}</td>
                                    <td>{employee.salary}</td>
                                    <td>{employee.specializationName}</td>
                                    <td>{employee.departmentName}</td>
                                    <td>{employee.brigadeName}</td>
                                    <td>
                                        <Link className="btn btn-primary" style={{ marginRight: 10 }}
                                            to={`/employees/${employee.id}/update`}>
                                            Update
                                        </Link>
                                        <Button variant="danger"
                                            onClick={(e) => { handleEmployeeDelete(employee.id) }}>
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
