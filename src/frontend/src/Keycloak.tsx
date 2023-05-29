import Keycloak from "keycloak-js";


const keycloak: Keycloak = new Keycloak({
  url: "http://" + window.location.hostname + ":3080",
  realm: "sovkombank",
  clientId: "sovkombank",
})

export default keycloak;