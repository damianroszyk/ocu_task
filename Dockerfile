FROM nginx

#COPY ./.server/docker/app/default.conf /etc/nginx/conf.d/default.conf
COPY ./dist /usr/share/nginx/html
