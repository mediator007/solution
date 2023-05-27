FROM camunda/camunda-bpm-platform:latest
COPY ./config/bpm-platform.xml /camunda/conf/
COPY ./config/server.xml /camunda/conf/

USER 0
RUN chmod a+r /camunda/conf/bpm-platform.xml
RUN chmod a+r /camunda/conf/server.xml