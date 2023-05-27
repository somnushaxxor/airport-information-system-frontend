import { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { sendError, sendSuccess, errorMessage } from "../../shared/components/NotificationManager";
import departmentService from "../../shared/services/department.service";
import employeeService from "../../shared/services/employee.service";


export default function AppointDepartmentChief() {
    const [departments, setDepartments] = useState([]);
    const [employees, setEmployees] = useState([]);

    const [departmentId, setDepartmentId] = useState("");
    const [employeeId, setEmployeeId] = useState("");

    const [validated, setValidated] = useState(false);

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

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        if (form.checkValidity() === false) {
            event.stopPropagation();
            setValidated(true);
        } else {
            setValidated(false);
            const departmentChiefAppointment = { departmentId, employeeId };
            departmentService.appointDepartmentChief(departmentChiefAppointment)
                .then(() => {
                    sendSuccess("Department chief successfully appointed");
                    form.reset();
                    clearState();
                })
                .catch(() => {
                    sendError(errorMessage);
                });
        }
    };

    const clearState = () => {
        setDepartmentId("");
        setEmployeeId("");
    }

    const isEmployeeSelectionDisabled = () => {
        return !departmentId;
    }

    return (
        <div className="content">
            <h1 className="text-uppercase mb-30">Appoint department chief</h1>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Department</Form.Label>
                    <Form.Select onChange={(e) => {
                        setDepartmentId(e.target.value);
                        setEmployees([]);
                        setEmployeeId("");
                        if (e.target.value) {
                            employeeService.getAllFiltered("", e.target.value, "", "", "", "", "")
                                .then(response => {
                                    setEmployees(response.data);
                                })
                                .catch(() => {
                                    sendError(errorMessage);
                                });
                        }
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
                    <Form.Label>Employee</Form.Label>
                    <Form.Select disabled={isEmployeeSelectionDisabled()} onChange={(e) => {
                        setEmployeeId(e.target.value);
                    }} required>
                        <option value="">Choose employee</option>
                        {
                            employees.map(employee => (
                                <option key={employee.id} value={employee.id}>
                                    {employee.firstName + " " + employee.lastName}
                                </option>
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