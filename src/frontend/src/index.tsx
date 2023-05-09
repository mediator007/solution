import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import { ReactKeycloakProvider } from '@react-keycloak/web';
import keycloak from "./Keycloak";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

/*const onKeycloakEvent = (event:any, error:any) => {
    console.log('onKeycloakEvent', event, error)
    console.log(`Keycloak Event ${event}`);
    if(event && event === 'onReady'){
      setState({keycloakReady: true})
    }
}*/

/*const onKeycloakTokens = (tokens:any) => {
    console.log('onKeycloakTokens', tokens)
}*/

root.render(
  <ReactKeycloakProvider 
      authClient={keycloak} 
      initOptions={{ onLoad: 'login-required' }}      
//      onEvent={onKeycloakEvent}
//      onTokens={onKeycloakTokens}
  >        
      <App />
  </ReactKeycloakProvider>       
);
