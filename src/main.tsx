import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

console.log("Environment:", import.meta.env.MODE);
console.log("Client ID:", import.meta.env.VITE_BLACKBOX_CLIENT_ID);
console.log("Redirect URI:", import.meta.env.VITE_BLACKBOX_REDIRECT_URI);
console.log("🚀 Running New BlackBox Auth System V2.0");
console.log("✅ Codebase Updated: 2025-12-10");

createRoot(document.getElementById("root")!).render(<App />);
