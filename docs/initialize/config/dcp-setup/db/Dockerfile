FROM postgres:12
RUN  rm -rf /docker-entrypoint-initdb.d
RUN  rm -rf /var/lib/postgresql/data/*

#COPY *.sql /docker-entrypoint-initdb.d/
WORKDIR  /docker-entrypoint-initdb.d/