import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import CombineProviders from "@utils/CombineProviders";

const theme = createTheme({});
const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));

const providers = [
  <BrowserRouter />,
  <QueryClientProvider client={queryClient} />,
  <ThemeProvider theme={theme} />,
];

root.render(
  <React.StrictMode>
    <CombineProviders providers={providers}>
      <CssBaseline />
      <App />
      {process.env.NODE_ENV === 'development' && <ReactQueryDevtools initialIsOpen={false} />}
    </CombineProviders>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
