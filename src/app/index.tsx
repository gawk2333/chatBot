import React from "react";
import { createRoot } from "react-dom/client";
// import "react-toastify/dist/ReactToastify.css";
import { store } from "./store";
import { Provider } from "react-redux";
// import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import App from "./App";

const container = document.getElementById("root");
if (container !== null) {
  const root = createRoot(container as HTMLElement);
  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  );
}
