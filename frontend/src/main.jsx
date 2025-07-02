import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import "./index.css";
import store from "./store/store.js";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <div
        dir="rtl"
        style={{ fontFamily: "Vazirmatn" }}
        className="text-text-primary bg-background pt-[4.5rem] md:pt-0"
      >
        <App />
      </div>
    </Provider>
  </StrictMode>
);
