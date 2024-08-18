#FROM node:18-alpine
#WORKDIR /app
#COPY public/ /app/public
#COPY src/ /app/src
#COPY package.json /app/
#RUN npm install
#EXPOSE 3000
#CMD ["npm", "start"]
# Usa una imagen base de Node.js
FROM node:18-alpine as build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
