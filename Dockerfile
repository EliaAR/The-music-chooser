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
COPY node_modules /app/node_modules 
RUN npm run build
EXPOSE 3000
COPY .next /app/.next 
CMD ["npm", "start"]