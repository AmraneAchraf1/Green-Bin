import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "./store";
import { RouterProvider } from "react-router-dom";
import router from "./routes/router";
import { ThemeProvider } from "@emotion/react";
import theme from "./theme/appTheme";
import { CssBaseline } from "@mui/material";
import FadeTransition from "./components/FadeTransition";
// styles
import "../src/styles/index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <FadeTransition>
        <RouterProvider router={router} />
      </FadeTransition>
    </ThemeProvider>
  </Provider>
);
