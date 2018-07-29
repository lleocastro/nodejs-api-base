FROM ubuntu:18.04

LABEL mainteiner "Leonardo B. Castro <leonardo_carvalho@outlook.com>"
LABEL description="Database API"

RUN apt-get update && apt-get install gnupg2 -y && apt-get install vim -y

RUN apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 2930ADAE8CAF5059EE73BB4B58712A2291FA4AD5

RUN touch /etc/apt/sources.list.d/mongodb-org-3.6.list
RUN echo "deb http://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/3.6 multiverse" >> /etc/apt/sources.list.d/mongodb-org-3.6.list

RUN apt-get update && apt-get install -y mongodb-org

RUN mkdir data && mkdir data/db
RUN mongod --dbpath /data/db

VOLUME ["/home/leo/Workspace/volumes/mongodb/db /data/db"]

EXPOSE 27017

ENTRYPOINT ["/bin/bash"]
CMD ["mongod"]
