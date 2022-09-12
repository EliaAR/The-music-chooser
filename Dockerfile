ARG PGHOST
ARG PGUSER
ARG PGDATABASE
ARG PGPASSWORD
ARG PGPORT
ARG PORT
FROM node:16
RUN apt-get update || : && apt-get install python -y
WORKDIR /app
COPY package*.json /app
RUN npm install
COPY . /app
EXPOSE 3000
CMD ["npm", "run", "build"]