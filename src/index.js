import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { MoralisProvider } from "react-moralis";
import "./index.css";
import QuickStart from "components/QuickStart";
import MediaQuery from 'react-responsive'
import { MoralisDappProvider } from "./providers/MoralisDappProvider/MoralisDappProvider";


const APP_ID = process.env.REACT_APP_MORALIS_APPLICATION_ID
const SERVER_URL = process.env.REACT_APP_MORALIS_SERVER_URL

const Application = () => {
  if (MoralisProvider)
    return (
      <MoralisProvider  appId={APP_ID}
      serverUrl={SERVER_URL}>
        <MoralisDappProvider>
        <MediaQuery minWidth={50}>
           <App/>
    </MediaQuery>
        </MoralisDappProvider>
      </MoralisProvider>
    );
  else {
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <QuickStart/>
      </div>
    );
  }
};

ReactDOM.render(
  <React.StrictMode>
  <MoralisProvider  appId={APP_ID}
  serverUrl={SERVER_URL}>
      <Application />,
    </MoralisProvider>
   </React.StrictMode>,
  document.getElementById("root")
);
