FROM node
# from the base image node 

WORKDIR /todo_app/developer/backend_nodejs/auth_microservice
# working directory define 

COPY . .
#copy all the file for the host to working directory 

RUN npm ci
#clean install

CMD [ "npm", "start" ]
# cmd when container is on 
