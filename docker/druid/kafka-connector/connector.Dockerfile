FROM confluentinc/cp-server-connect-base:7.6.0
USER root
RUN confluent-hub install --no-prompt mongodb/kafka-connect-mongodb:1.9.0 \
    && confluent-hub install --no-prompt confluentinc/kafka-connect-jdbc:10.7.6 \
    && confluent-hub install --no-prompt debezium/debezium-connector-postgresql:2.5.3 \