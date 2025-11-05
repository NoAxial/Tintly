import React from "react";
import { createRoot } from "react-dom/client";
import App from "./app/App";
import "./styles/globals.css";

const container = document.getElementById("root");
if (!container) {
	throw new Error("Root container with id 'root' not found");
}

const root = createRoot(container);
root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);

// Register basic service worker (PWA)
if ("serviceWorker" in navigator) {
	window.addEventListener("load", () => {
		navigator.serviceWorker.register("/sw.js").catch(() => {});
	});
}


