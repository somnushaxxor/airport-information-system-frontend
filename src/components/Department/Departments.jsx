import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import Badge from 'react-bootstrap/Badge'
import { Button } from 'react-bootstrap';
import { sendError, sendSuccess, errorMessage } from '../NotificationManager';
import departmentService from '../../services/department.service';

export default function Departments() {
    const [departments, setDepartments] = useState([]);

    useEffect(() => {
        init();
    }, []);

    const init = () => {
        departmentService.getAll()
            .then(response => {
                setDepartments(response.data);
            })
            .catch(() => {
                sendError(errorMessage);
            });
    }

    const reloadDepartments = () => {
        departmentService.getAll()
            .then(response => {
                setDepartments(response.data);
            })
            .catch(() => {
                sendError(errorMessage);
            });
    }

    const handleDepartmentDelete = (id) => {
        departmentService.deleteById(id)
            .then(() => {
                sendSuccess("Department successfully deleted")
                reloadDepartments();
            })
            .catch(() => {
                sendError(errorMessage);
            });
    }

    return (
        <div className="content">
            <h1 className="text-uppercase mb-30">Departments</h1>
            <div className="d-flex flex-wrap">
                <Link to="/departments/create" className="btn btn-success btn-lg mb-20" style={{ marginRight: 10 }}>
                    Create department
                </Link>
                <h4 className="mb-20">
                    <Badge bg="dark">Total: {departments.length}</Badge>
                </h4>
                <Table striped bordered hover variant="dark">
                    <thead >
                        <tr>
                            <th>Name</th>
                            <th>Chief</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            departments.map(department => (
                                <tr key={department.id}>
                                    <td>{department.name}</td>
                                    <td>{department.chiefName}</td>
                                    <td>
                                        <Link className="btn btn-primary" style={{ marginRight: 10 }}
                                            to={`/departments/${department.id}/update`}>
                                            Update
                                        </Link>
                                        <Button variant="danger"
                                            onClick={(e) => { handleDepartmentDelete(department.id) }}>
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
