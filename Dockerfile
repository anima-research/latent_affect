FROM nginx:alpine
COPY nginx.conf /etc/nginx/templates/default.conf.template
# Only the site goes under the web root: pages, styles, scripts, and the two
# asset directories. Nothing else from the build context is copied.
COPY *.html *.css *.js /usr/share/nginx/html/
COPY css /usr/share/nginx/html/css
COPY exports /usr/share/nginx/html/exports
