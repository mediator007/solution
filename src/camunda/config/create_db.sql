create user ${CAMUNDA_USER} with password ${CAMUNDA_PASSWORD};
create database ${CAMUNDA_DB} owner ${CAMUNDA_USER};
grant all privileges on database ${CAMUNDA_DB} to ${CAMUNDA_USER};