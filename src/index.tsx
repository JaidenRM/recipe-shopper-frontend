import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { ModalProvider } from "./providers/modal";
import { MyRouter } from "./MyRouter";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <React.StrictMode>
    <ModalProvider>
      <MyRouter />
    </ModalProvider>
  </React.StrictMode>,
);
