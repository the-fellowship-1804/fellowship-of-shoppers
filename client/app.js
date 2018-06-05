import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter
} from "react-router-dom";
// import { Navbar } from "./components";
import Routes from "./routes";
import AllProducts from "./components/AllProducts"

const App = () => {
  return (
    <div>
      {/* <Navbar /> */}
      <div id="body-root">
        <Switch>
          <Route path="/products" component={AllProducts} />
          {/* <Route exact path="/" component={WinterJokes} />
          <Route exact path="/campuses" component={AllCampuses} />
          <Route exact path="/campuses/add" component={AddCampus} />
          <Route exact path="/campuses/edit/:campusId" component={EditCampus} />
          <Route exact path="/campuses/:campusId" component={SingleCampus} />
          <Route exact path="/students" component={AllStudents} />
          <Route exact path="/students/add" component={AddStudent} />
          <Route
            exact
            path="/students/edit/:studentId"
            component={EditStudent}
          />
          <Route exact path="/students/:studentId" component={SingleStudent} />
          <Route component={Raven} /> */}
        </Switch>
        {/* <FootBar /> */}
      </div>
    </div>
  );
};

export default App;
