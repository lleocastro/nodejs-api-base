FROM ubuntu

LABEL mainteiner "Leonardo B. Castro <leonardo_carvalho@outlook.com>"

RUN apt-get update

RUN apt install -y software-properties-common python

RUN apt install curl -y
RUN curl -sSL https://deb.nodesource.com/setup_8.x | sh

RUN apt install -y nodejs
RUN apt install -y build-essential

RUN mkdir /var/www
RUN mkdir /var/www/api
COPY . /var/www/api/

WORKDIR /var/www/api/

EXPOSE 3000

# RUN chmod +x /var/www/api/init.sh
# CMD ["/var/www/api/init.sh"]
