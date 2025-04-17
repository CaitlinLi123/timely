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

FROM nginx:1.25.4-alpine3.18

COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /var/www/html/

EXPOSE 5173

# Starting our application
ENTRYPOINT ["nginx","-g","daemon off;"]