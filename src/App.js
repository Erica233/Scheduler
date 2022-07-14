import { Route, Redirect, Switch } from "react-router-dom";
import React from "react";

import Home from "./pages/Home";
import EditedTable from "./pages/EditedTable";

function App() {
  return (
    <div>
      <Switch>
        <Route path="/" exact>
          <Redirect to="/home" />
        </Route>
        <Route path="/home" component={Home} />
        <Route path="/edited" component={EditedTable} />
      </Switch>
    </div>
  );
}

export default App;
