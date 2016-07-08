FROM ubuntu:16.04
RUN apt-get update && apt-get install -y \
        nodejs npm
RUN ln -s /usr/bin/nodejs /usr/bin/node
WORKDIR /var/www/html
CMD npm install && npm rebuild node-sass && npm run build