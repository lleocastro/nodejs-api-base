FROM debian
MAINTAINER Leonardo B. Castro

RUN sudo apt-get install -y software-properties-common python
RUN sudo curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -

RUN sudo apt-get update

RUN sudo apt-get install -y nodejs
RUN sudo apt-get install -y build-essential

RUN mkdir /var/www
ADD . /var/www/

# ...

CMD ["node", "./src/public/index.js"]