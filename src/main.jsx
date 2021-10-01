import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import { ReadListProvider } from "./contexts/ReadListProvider";

ReactDOM.render(
  <ReadListProvider>
    <BrowserRouter>
      <Auth0Provider
        domain={import.meta.env.VITE_DOMAIN}
        clientId={import.meta.env.VITE_CLIENT_ID}
        redirectUri={window.location.origin}
        audience={import.meta.env.VITE_AUDIENCE}
        scope={import.meta.env.VITE_SCOPE}
      >
        <App />
      </Auth0Provider>
    </BrowserRouter>
  </ReadListProvider>,
  document.getElementById("root")
);
