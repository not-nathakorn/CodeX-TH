import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

console.log("Environment:", import.meta.env.MODE);
console.log("Environment:", import.meta.env.MODE);
console.log("✅ Codebase Updated: 2025-12-10");

createRoot(document.getElementById("root")!).render(<App />);
