import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter
} from "react-router-dom";
// import { Navbar } from "./components";
import Routes from "./routes";
import AllProducts from "./components/AllProducts";
import SingleProduct from "./components/SingleProduct";
import Landing from "./components/Landing";
import { Navbar, SingleUser } from "./components";
import { Signup, Login } from "./components/auth-form";

const App = () => {
  return (
    <div>
      {/* <Navbar /> */}
      <div id="body-root">
        <Navbar />
        <Switch>
          <Route exact path="/products" component={AllProducts} />
          <Route exact path="/products/:productId" component={SingleProduct} />
          <Route exact path="/" component={Landing} />
          <Route exact path="/user" component={SingleUser} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/login" component={Login} />
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
