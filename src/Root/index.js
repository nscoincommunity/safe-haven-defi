import React from "react";
import App from "./App";
import { HashRouter } from "react-router-dom";

function Root() {
    const app = () => (
        <HashRouter>
            <App />
        </HashRouter>
    );

    return app();
}

export default Root;
