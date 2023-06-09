#FROM quay.io/keycloak/keycloak:latest as builder
FROM quay.io/keycloak/keycloak:21.1 as builder

# Enable health and metrics support
ENV KC_HEALTH_ENABLED=true
ENV KC_METRICS_ENABLED=true

# Configure a database vendor
ENV KC_DB=postgres

WORKDIR /opt/keycloak

# for demonstration purposes only, please make sure to use proper certificates in production instead
RUN keytool -genkeypair -storepass password -storetype PKCS12 -keyalg RSA -keysize 2048 -dname "CN=server" -alias server -ext "SAN:c=DNS:localhost,IP:127.0.0.1" -keystore conf/server.keystore
RUN /opt/keycloak/bin/kc.sh build

#FROM quay.io/keycloak/keycloak:latest
FROM quay.io/keycloak/keycloak:21.1
COPY --from=builder /opt/keycloak/ /opt/keycloak/
COPY ./certs/* /opt/keycloak/

USER 0
RUN chmod a+r /opt/keycloak/*.pem


# Start container in dev mode
ENTRYPOINT ["/opt/keycloak/bin/kc.sh", "start-dev", "--https-certificate-file=/opt/keycloak/keycloak-server.crt.pem", "--https-certificate-key-file=/opt/keycloak/keycloak-server.key.pem"]
