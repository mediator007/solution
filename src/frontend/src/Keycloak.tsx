import Keycloak from "keycloak-js";


const keycloak: Keycloak = new Keycloak({
  url: "https://localhost:3443",
  realm: "sovkombank",
  clientId: "sovkombank",
})

export default keycloak;