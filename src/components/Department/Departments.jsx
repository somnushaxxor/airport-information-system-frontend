import React from 'react';
import { Link } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import Badge from 'react-bootstrap/Badge'
import { Button } from 'react-bootstrap';
import departmentService from '../../services/department.service';
import { sendError } from '../NotificationManager';

export default function Departments() {
    const [departments, setDepartments] = React.useState([]);

    React.useEffect(() => {
        init();
    }, []);

    const init = () => {
        departmentService.getAll()
            .then(response => {
                setDepartments(response.data);
            })
            .catch(() => {
                sendError("Failed to fetch departments");
            })
    }

    const handleDelete = id => {
        // employeesService.deleteById(id)
        //     .then(() => {
        //         sendSuccess("Employee deleted successfully!")
        //         init();
        //     })
        //     .catch(error => {
        //         sendError(error.response.data.message);
        //     })
    }

    return (
        <div className="content p-40">
            <div className="align-left justify-between">
                <h1 className="text-uppercase" style={{ marginLeft: 40 }}>Departments</h1>
            </div>

            <div className="newsPanel d-flex flex-wrap">

                <Link to="/departments/create" className="btn btn-success btn-lg mb-2" style={{ marginLeft: 40, marginTop: 40 }}>Create department</Link>
                <Badge className="align-right mb-3" bg="dark" style={{ marginLeft: 40, marginTop: 40 }}><h5>Total: {departments.length}</h5></Badge>
                <Table style={{ marginTop: 20, marginRight: 40, marginLeft: 40 }} striped bordered hover variant="dark">
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
                                    <td>{department.chief}</td>
                                    <td>
                                        <Link className="btn btn-primary" to="/departments/update">Update</Link>
                                        <Button variant="danger" style={{ marginLeft: 5 }} onClick={(e) => { handleDelete(department.id) }}>Delete</Button>
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
