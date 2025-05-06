import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ThemeContextProvider } from "./lib/ThemeContext.tsx";
import ErrorBoundary from "./components/ErrorBoundary.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary>
      <ThemeContextProvider>
        <App />
      </ThemeContextProvider>
    </ErrorBoundary>
  </StrictMode>
);
