import Header from './components/Header';
import { Route } from 'react-router-dom';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Employees from './components/Employee/Employees';
import CreateEmployee from './components/Employee/CreateEmployee';
import NotificationManager from './components/NotificationManager';
import Home from './components/Home/Home';
import Departments from './components/Department/Departments';
import Brigades from './components/Brigade/Brigades';

// import Home from './pages/Home';
// import Actors from './pages/Actors';
// import Performances from './pages/Performances';
// import Authors from './pages/Authors';
// import ConcertTours from './pages/ConcertTours';
// import Tickets from './pages/Tickets';
// import StageDirectors from './pages/StageDirectors';
// import Musicians from './pages/Musicians';

// import AddPerformance from './components/Performance/AddPerformance';
// import UpdatePerformance from './components/Performance/UpdatePerformance';

// import AddAuthor from './components/Authors/AddAuthor';
// import UpdateAuthor from './components/Authors/UpdateAuthor';

// import AddTicket from './components/Tickets/AddTicket';
// import UpdateTicket from './components/Tickets/UpdateTicket';

// import AddMusician from './components/Musicians/AddMusician';
// import UpdateMusician from './components/Musicians/UpdateMusician';
// import AddStageDirector from './components/StageDirectors/AddStageDirector';
// import UpdateStageDirector from './components/StageDirectors/UpdateStageDirector';
// import AddActor from './components/Actors/AddActor';
// import UpdateActor from './components/Actors/UpdateActor';

export default function App() {

  return (
    <div className="wrapper clear">
      <Header />

      <Route path="/" exact component={Home} />

      <Route path="/employees" exact component={Employees} />
      <Route path="/employees/create" exact component={CreateEmployee} />

      <Route path="/departments" exact component={Departments} />

      <Route path="/brigades" exact component={Brigades} />

      <NotificationManager />

      {/* <Route path="/performances" exact>
        <Performances
        />
      </Route>
      <Route path="/performances/add" component={AddPerformance} />
      <Route path="/performances/edit/:id" component={UpdatePerformance} />



      <Route path="/authors" exact>
        <Authors />
      </Route>
      <Route path="/authors/add" component={AddAuthor} />
      <Route path="/authors/edit/:id" component={UpdateAuthor} />


      <Route path="/concerttours" exact>
        <ConcertTours />
      </Route>

      <Route path="/tickets" exact>
        <Tickets />
      </Route>
      <Route path="/tickets/add" component={AddTicket} />
      <Route path="/tickets/edit/:id" component={UpdateTicket} />

      <Route path="/stagedirectors" exact>
        <StageDirectors />
      </Route>
      <Route path="/stagedirectors/add" component={AddStageDirector} />
      <Route path="/stagedirectors/edit/:id" component={UpdateStageDirector} />


      <Route path="/musicians" exact>
        <Musicians />
      </Route>
      <Route path="/musicians/add" component={AddMusician} />
      <Route path="/musicians/edit/:id" component={UpdateMusician} />

      <Route path="/actors" exact>
        <Actors />
      </Route>
      <Route path="/actors/add" component={AddActor} />
      <Route path="/actors/edit/:id" component={UpdateActor} /> */}
    </div >
  );
}
