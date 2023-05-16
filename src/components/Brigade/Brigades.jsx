import React from 'react';
import { Link } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import Badge from 'react-bootstrap/Badge'
import { Button } from 'react-bootstrap';
import brigadeService from '../../services/brigade.service';
import { sendError } from '../NotificationManager';

export default function Brigades() {
    const [brigades, setBrigades] = React.useState([]);

    React.useEffect(() => {
        init();
    }, []);

    const init = () => {
        brigadeService.getAll()
            .then(response => {
                setBrigades(response.data);
            })
            .catch(() => {
                sendError("Failed to fetch brigades");
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
                <h1 className="text-uppercase" style={{ marginLeft: 40 }}>Brigades</h1>
            </div>

            <div className="newsPanel d-flex flex-wrap">

                <Link to="/brigades/create" className="btn btn-success btn-lg mb-2" style={{ marginLeft: 40, marginTop: 40 }}>Create brigade</Link>
                <Badge className="align-right mb-3" bg="dark" style={{ marginLeft: 40, marginTop: 40 }}><h5>Total: {brigades.length}</h5></Badge>
                <Table style={{ marginTop: 20, marginRight: 40, marginLeft: 40 }} striped bordered hover variant="dark">
                    <thead >
                        <tr>
                            <th>Name</th>
                            <th>Department</th>
                            <th>Specialization</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            brigades.map(brigade => (
                                <tr key={brigade.id}>
                                    <td>{brigade.name}</td>
                                    <td>{brigade.department}</td>
                                    <td>{brigade.specialization}</td>
                                    <td>
                                        <Link className="btn btn-primary" to="/brigades/update">Update</Link>
                                        <Button variant="danger" style={{ marginLeft: 5 }} onClick={(e) => { handleDelete(brigade.id) }}>Delete</Button>
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
