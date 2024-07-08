import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/routes";
import { Provider } from "react-redux";
import store from "./store/store";
import { ThemeProvider } from "styled-components";
import { theme } from "./styledComponents/theme";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>

  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </ThemeProvider>
  // </React.StrictMode>
);
