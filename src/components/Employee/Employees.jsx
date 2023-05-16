import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import Badge from 'react-bootstrap/Badge'
import { Button } from 'react-bootstrap';
import employeesService from '../../services/employee.service';
import { sendError, sendSuccess } from '../NotificationManager';
import genderService from '../../services/gender.service';
import specializationService from '../../services/specialization.service';
import departmentService from '../../services/department.service';
import brigadeService from '../../services/brigade.service';

export default function Employees() {
    const [genders, setGenders] = useState([]);
    const [specializations, setSpecializations] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [brigades, setBrigades] = useState([]);

    const [employees, setEmployees] = React.useState([]);

    const errorAttribute = "ERROR";
    const nullAttribute = "-";

    React.useEffect(() => {
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
        employeesService.getAll()
            .then(response => {
                setEmployees(response.data);
            })
            .catch(() => {
                sendError("Failed to fetch employees");
            });
        brigadeService.getAll()
            .then(response => {
                setBrigades(response.data);
            })
            .catch(() => {
                sendError("Failed to fetch employees");
            })
    }

    const handleDelete = id => {
        employeesService.deleteById(id)
            .then(() => {
                sendSuccess("Employee successfully deleted")
                init();
            })
            .catch(error => {
                sendError(error.response.data.message);
            })
    }

    const getGenderName = (genderId) => {
        const gender = genders.find(gender => {
            return gender.id === genderId;
        });
        if (gender) {
            return gender.name;
        }
        return errorAttribute;
    }

    const getSpecializationName = (specializationId) => {
        const specialization = specializations.find(specialization => {
            return specialization.id === specializationId;
        });
        if (specialization) {
            return specialization.name;
        }
        return errorAttribute;
    }

    const getDepartmentName = (departmentId) => {
        const department = departments.find(department => {
            return department.id === departmentId;
        });
        if (department) {
            return department.name;
        }
        return errorAttribute;
    }

    const getBrigadeName = (brigadeId) => {
        if (!brigadeId) {
            return nullAttribute;
        }
        const brigade = brigades.find(brigade => {
            return brigade.id === brigadeId;
        });
        if (brigade) {
            return brigade.name;
        }
        return errorAttribute;
    }

    return (
        <div className="content p-40">
            <div className="align-left justify-between">
                <h1 className="text-uppercase" style={{ marginLeft: 40 }}>Employees</h1>
            </div>

            <div className="newsPanel d-flex flex-wrap">
                <Link to="/employees/create" className="btn btn-success btn-lg mb-2" style={{ marginLeft: 40, marginTop: 40 }}>Create employee</Link>
                <Badge className="align-right mb-3" bg="dark" style={{ marginLeft: 40, marginTop: 40 }}><h5>Total: {employees.length}</h5></Badge>
                <Table style={{ marginTop: 20, marginRight: 40, marginLeft: 40 }} striped bordered hover variant="dark">
                    <thead >
                        <tr>
                            <th>First name</th>
                            <th>Last name</th>
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
                                    <td>{employee.firstName}</td>
                                    <td>{employee.lastName}</td>
                                    <td>{getGenderName(employee.genderId)}</td>
                                    <td>{employee.dateOfBirth}</td>
                                    <td>{employee.joinedAt}</td>
                                    <td>{employee.numberOfChildren}</td>
                                    <td>{employee.salary}</td>
                                    <td>{getSpecializationName(employee.specializationId)}</td>
                                    <td>{getDepartmentName(employee.departmentId)}</td>
                                    <td>{getBrigadeName(employee.brigadeId)}</td>
                                    <td>
                                        <Link className="btn btn-primary" to={`/employees/${employee.id}/update`}>Update</Link>
                                        <Button variant="danger" style={{ marginLeft: 5 }} onClick={(e) => { handleDelete(employee.id) }}>Delete</Button>
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
