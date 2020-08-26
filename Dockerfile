FROM nginx:alpine
COPY /dist/searcher /usr/share/nginx/html
EXPOSE 80
