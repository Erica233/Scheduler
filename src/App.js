import { Route } from "react-router-dom";
import React from "react";

import Home from "./pages/Home";
import EditedTable from "./pages/EditedTable";

function App() {
  return (
    <div>
      <Route path="/home">
        <Home />
      </Route>
      <Route path="/edited">
        <EditedTable />
      </Route>
    </div>
  );
}

export default App;
