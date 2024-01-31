import ReactDOM from "react-dom/client";
import { ThemeProvider } from "styled-components";
import App from "./App.tsx";

import "./styled.d.ts";
import "normalize.css";
import "./styles/global.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ThemeProvider theme={{}}>
    <App />
  </ThemeProvider>,
);
