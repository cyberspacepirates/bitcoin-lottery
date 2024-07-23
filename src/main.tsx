import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import mwasm from "./wasm-bitcoin/wasm";

mwasm().then(() => {
  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
});
