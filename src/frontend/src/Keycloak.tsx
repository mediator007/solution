import Keycloak from "keycloak-js";

const keycloak: Keycloak = new Keycloak({
  url: "http://localhost:3080",
  realm: "sovkombank",
  clientId: "sovkombank",
})

export default keycloak;