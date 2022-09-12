ARG PGHOST
ARG PGUSER
ARG PGDATABASE
ARG PGPASSWORD
ARG PGPORT
ARG PORT
FROM node:16 as builder
RUN apt-get update || : && apt-get install python -y
WORKDIR /app
COPY package*.json /app
RUN npm install
COPY . /app
COPY --from=builder /app/node_modules node_modules
RUN npm run build
EXPOSE 3000
COPY --from=builder /app/.next .next
CMD ["npm", "start"]