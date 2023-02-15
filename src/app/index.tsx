import React from "react";
import {createRoot} from "react-dom/client";
// import "react-toastify/dist/ReactToastify.css";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "./index.css";
import App from "./App";
// console.log(App)
const container = document.getElementById("root");
if (container !== null) {
  const root = createRoot(container as HTMLElement); 
  root.render(
      <App/>
  );
}
