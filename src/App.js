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
import CreateSpecialization from './components/Specialization/CreateSpecialization';
import UpdateSpecialization from './components/Specialization/UpdateSpecialization';
import AirplaneModels from './components/AirplaneModel/AirplaneModels';
import CreateAirplaneModel from './components/AirplaneModel/CreateAirplaneModel';
import UpdateAirplaneModel from './components/AirplaneModel/UpdateAirplaneModel';
import AppointDepartmentChief from './components/Department/AppointDepartmentChief';
import RemoveDepartmentChief from './components/Department/RemoveDepartmentChief';

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
        <Route path="/specializations/create" exact element={<CreateSpecialization />} />
        <Route path="/specializations/:id/update" exact element={<UpdateSpecialization />} />

        <Route path="/departments" exact element={<Departments />} />
        <Route path="/departments/create" exact element={<CreateDepartment />} />
        <Route path="/departments/:id/update" exact element={<UpdateDepartment />} />
        <Route path="/departments/chief-appointment" exact element={<AppointDepartmentChief />} />
        <Route path="/departments/chief-removal" exact element={<RemoveDepartmentChief />} />

        <Route path="/brigades" exact element={<Brigades />} />

        <Route path="/airplanes/models" exact element={<AirplaneModels />} />
        <Route path="/airplanes/models/create" exact element={<CreateAirplaneModel />} />
        <Route path="/airplanes/models/:id/update" exact element={<UpdateAirplaneModel />} />

        <Route path="*" element={<NotFound />} />
      </Routes>

      <NotificationManager />
    </div >
  );
}
