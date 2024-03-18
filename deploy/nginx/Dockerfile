FROM nginx:stable-alpine

RUN rm -rf /etc/nginx/conf.d/*

COPY ./nginx.conf /etc/nginx/conf.d/

CMD [ "nginx", "-g", "daemon off;" ]
