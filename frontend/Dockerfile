# Fetching the latest node image on alpine linux
FROM node:20.11.1-alpine3.19 AS build
# Setting up the work directory
WORKDIR /app
# Installing dependencies
COPY ./package*.json ./
RUN npm install
ENV PATH=/app/node_modules/.bin:$PATH
# Copying all the files in our project
COPY . .
RUN npm run build

FROM nginx
EXPOSE 3000
COPY ./default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

# Starting our application
ENTRYPOINT ["nginx","-g","daemon off;"]