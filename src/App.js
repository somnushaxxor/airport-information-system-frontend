import { Route, Routes as RouterRoutes } from 'react-router-dom';
import Employees from './features/Employee/Employees';
import CreateEmployee from './features/Employee/CreateEmployee';
import UpdateEmployee from './features/Employee/UpdateEmployee';
import PilotsMedicalExaminations from './features/PilotMedicalExamination/PilotsMedicalExaminations';
import CreatePilotMedicalExamination from './features/PilotMedicalExamination/CreatePilotMedicalExamination';
import UpdatePilotMedicalExamination from './features/PilotMedicalExamination/UpdatePilotMedicalExamination';
import Specializations from './features/Specialization/Specializations';
import CreateSpecialization from './features/Specialization/CreateSpecialization';
import UpdateSpecialization from './features/Specialization/UpdateSpecialization';
import Departments from './features/Department/Departments';
import CreateDepartment from './features/Department/CreateDepartment';
import UpdateDepartment from './features/Department/UpdateDepartment';
import AppointDepartmentChief from './features/Department/AppointDepartmentChief';
import RemoveDepartmentChief from './features/Department/RemoveDepartmentChief';
import Brigades from './features/Brigade/Brigades';
import CreateBrigade from './features/Brigade/CreateBrigade';
import UpdateBrigade from './features/Brigade/UpdateBrigade';
import AirplaneModels from './features/AirplaneModel/AirplaneModels';
import CreateAirplaneModel from './features/AirplaneModel/CreateAirplaneModel';
import UpdateAirplaneModel from './features/AirplaneModel/UpdateAirplaneModel';
import Airplanes from './features/Airplane/Airplanes';
import CreateAirplane from './features/Airplane/CreateAirplane';
import UpdateAirplane from './features/Airplane/UpdateAirplane';
import Routes from './features/Route/Routes';
import CreateRoute from './features/Route/CreateRoute';
import UpdateRoute from './features/Route/UpdateRoute';
import FlightCategories from './features/FlightCategory/FlightCategories';
import CreateFlightCategory from './features/FlightCategory/CreateFlightCategory';
import UpdateFlightCategory from './features/FlightCategory/UpdateFlightCategory';
import Flights from './features/Flight/Flights';
import Header from './shared/components/Header';
import Home from './shared/components/Home';
import NotFound from './shared/components/NotFound';
import NotificationManager from './shared/components/NotificationManager';

export default function App() {

  return (
    <div className="wrapper">
      <Header />

      <RouterRoutes>
        <Route path="/" exact element={<Home />} />

        <Route path="/employees" exact element={<Employees />} />
        <Route path="/employees/create" exact element={<CreateEmployee />} />
        <Route path="/employees/:id/update" exact element={<UpdateEmployee />} />

        <Route path="/pilots-medical-examinations" exact element={<PilotsMedicalExaminations />} />
        <Route path="/pilots-medical-examinations/create" exact element={<CreatePilotMedicalExamination />} />
        <Route path="/pilots-medical-examinations/:id/update" exact element={<UpdatePilotMedicalExamination />} />

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
        <Route path="/routes/create" exact element={<CreateRoute />} />
        <Route path="/routes/:id/update" exact element={<UpdateRoute />} />

        <Route path="/flights/categories" exact element={<FlightCategories />} />
        <Route path="/flights/categories/create" exact element={<CreateFlightCategory />} />
        <Route path="/flights/categories/:id/update" exact element={<UpdateFlightCategory />} />

        <Route path="/flights" exact element={<Flights />} />

        <Route path="*" element={<NotFound />} />
      </RouterRoutes>

      <NotificationManager />
    </div >
  );
}
