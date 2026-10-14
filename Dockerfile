FROM nginx:alpine
COPY . /usr/share/nginx/html
COPY nginx.conf /etc/nginx/templates/default.conf.template
# nginx.conf must stay in the build context for the COPY above, so it is not in
# .dockerignore; take it back out of the web root.
RUN rm -f /usr/share/nginx/html/nginx.conf
