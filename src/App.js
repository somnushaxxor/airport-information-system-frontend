import Header from './components/Header';
import { Route, Routes } from 'react-router-dom';
import Employees from './components/Employee/Employees';
import CreateEmployee from './components/Employee/CreateEmployee';
import UpdateEmployee from './components/Employee/UpdateEmployee';
import NotificationManager from './components/NotificationManager';
import Home from './components/Home';
import Departments from './components/Department/Departments';
import Brigades from './components/Brigade/Brigades';
import NotFound from './components/NotFound';
import CreateDepartment from './components/Department/CreateDepartment';
import UpdateDepartment from './components/Department/UpdateDepartment';
import Specializations from './components/Specialization/Specializations';

export default function App() {

  return (
    <div className="wrapper">
      <Header />

      <Routes>
        <Route path="/" exact element={<Home />} />

        <Route path="/employees" exact element={<Employees />} />
        <Route path="/employees/create" exact element={<CreateEmployee />} />
        <Route path="/employees/:id/update" exact element={<UpdateEmployee />} />

        <Route path="/specializations" exact element={<Specializations />} />

        <Route path="/departments" exact element={<Departments />} />
        <Route path="/departments/create" exact element={<CreateDepartment />} />
        <Route path="/departments/:id/update" exact element={<UpdateDepartment />} />

        <Route path="/brigades" exact element={<Brigades />} />

        <Route path="*" element={<NotFound />} />
      </Routes>

      <NotificationManager />
    </div >
  );
}
