import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { HashRouter } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import { Provider } from "react-redux";
import store from "./store/store";

ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <Auth0Provider
        domain={import.meta.env.VITE_DOMAIN}
        clientId={import.meta.env.VITE_CLIENT_ID}
        redirectUri={window.location.origin}
        audience={import.meta.env.VITE_AUDIENCE}
        scope={import.meta.env.VITE_SCOPE}
      >
        <App />
      </Auth0Provider>
    </HashRouter>
  </Provider>,
  document.getElementById("root")
);
