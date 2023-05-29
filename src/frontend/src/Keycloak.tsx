import Keycloak from "keycloak-js";


const keycloak: Keycloak = new Keycloak({
  url: "https://" + window.location.hostname + ":3443",
  realm: "sovkombank",
  clientId: "sovkombank",
})

export default keycloak;