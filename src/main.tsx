import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

/**
 * PRERENDERING / SSG:
 * Quando vite-plugin-prerender for configurado, substitua createRoot por:
 *
 *   import { hydrateRoot } from "react-dom/client";
 *   const root = document.getElementById("root")!;
 *   if (root.hasChildNodes()) {
 *     hydrateRoot(root, <React.StrictMode><App /></React.StrictMode>);
 *   } else {
 *     createRoot(root).render(<React.StrictMode><App /></React.StrictMode>);
 *   }
 */
createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
