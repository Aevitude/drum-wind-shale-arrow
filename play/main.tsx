import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { SnakeApp } from "@/game/SnakeApp";
import "@/styles.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SnakeApp search={window.location.search} />
  </StrictMode>,
);
