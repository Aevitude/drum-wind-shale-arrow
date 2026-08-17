import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { StudioPage } from "@/site/StudioPage";
import "@/styles.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <StudioPage search={window.location.search} />
  </StrictMode>,
);
