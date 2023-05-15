import React from 'react';
import { Link } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import Badge from 'react-bootstrap/Badge'
import { Button } from 'react-bootstrap';
import employeesService from '../../services/employee.service';
import { sendError, sendSuccess } from '../NotificationManager';

export default function Employees() {
    const [employees, setEmployees] = React.useState([]);

    React.useEffect(() => {
        init();
    }, []);

    const init = () => {
        employeesService.getAll()
            .then(response => {
                setEmployees(response.data);
            })
            .catch(() => {
                sendError("Failed to fetch employees");
            })
    }

    const handleDelete = id => {
        employeesService.deleteById(id)
            .then(() => {
                sendSuccess("Employee deleted successfully!")
                init();
            })
            .catch(error => {
                sendError(error.response.data.message);
            })
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
                                    <td>{employee.gender}</td>
                                    <td>{employee.dateOfBirth}</td>
                                    <td>{employee.joinedAt}</td>
                                    <td>{employee.numberOfChildren}</td>
                                    <td>{employee.salary}</td>
                                    <td>{employee.specialization}</td>
                                    <td>{employee.department}</td>
                                    <td>{employee.brigade}</td>
                                    <td>
                                        <Link className="btn btn-primary" to="/employees/update">Update</Link>
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
