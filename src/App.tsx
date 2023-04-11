import React from 'react';
import {useRoutes} from "react-router-dom";
import routes from "./utils/router/routes";

function App() {
  console.log(routes())
  return useRoutes(routes())
}

export default App;
