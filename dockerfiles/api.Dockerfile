FROM ubuntu:18.04

LABEL mainteiner="Leonardo B. Castro <leonardo_carvalho@outlook.com>"
LABEL description="Base API"

RUN apt-get update && apt-get install vim -y
RUN apt-get install -y software-properties-common python
RUN apt-get install curl -y && curl -sSL https://deb.nodesource.com/setup_8.x | sh
RUN apt-get install -y nodejs && apt-get install -y build-essential
RUN mkdir /var/www && mkdir /var/www/api
RUN apt-get clean && apt-get autoremove


### Uncomment to use dockerfile only ###
# COPY . /var/www/api/
# EXPOSE 3000
# WORKDIR /var/www/api/
# RUN chmod +x /var/www/api/init.sh
# ENTRYPOINT ["/bin/bash"]
# CMD ["/var/www/api/init.sh"]
