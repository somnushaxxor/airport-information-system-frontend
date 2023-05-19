import Header from './components/Header';
import { Route, Routes as RouterRoutes } from 'react-router-dom';
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
import CreateBrigade from './components/Brigade/CreateBrigade';
import UpdateBrigade from './components/Brigade/UpdateBrigade';
import Routes from './components/Route/Routes';
import FlightCategories from './components/FlightCategory/FlightCategories';
import UpdateFlightCategory from './components/FlightCategory/UpdateFlightCategory';
import CreateFlightCategory from './components/FlightCategory/CreateFlightCategory';
import Airplanes from './components/Airplane/Airplanes';
import CreateAirplane from './components/Airplane/CreateAirplane';
import UpdateAirplane from './components/Airplane/UpdateAirplane';

export default function App() {

  return (
    <div className="wrapper">
      <Header />

      <RouterRoutes>
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
        <Route path="/brigades/create" exact element={<CreateBrigade />} />
        <Route path="/brigades/:id/update" exact element={<UpdateBrigade />} />

        <Route path="/airplanes/models" exact element={<AirplaneModels />} />
        <Route path="/airplanes/models/create" exact element={<CreateAirplaneModel />} />
        <Route path="/airplanes/models/:id/update" exact element={<UpdateAirplaneModel />} />

        <Route path="/airplanes" exact element={<Airplanes />} />
        <Route path="/airplanes/create" exact element={<CreateAirplane />} />
        <Route path="/airplanes/:id/update" exact element={<UpdateAirplane />} />

        <Route path="/routes" exact element={<Routes />} />

        <Route path="/flights/categories" exact element={<FlightCategories />} />
        <Route path="/flights/categories/create" exact element={<CreateFlightCategory />} />
        <Route path="/flights/categories/:id/update" exact element={<UpdateFlightCategory />} />

        <Route path="*" element={<NotFound />} />
      </RouterRoutes>

      <NotificationManager />
    </div >
  );
}
