import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./store/index.js";
import { SettingsProvider } from "./context/useSettings.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <SettingsProvider>
        <App />
      </SettingsProvider>
    </Provider>
  </StrictMode>
);
