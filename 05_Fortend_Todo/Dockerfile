FROM node
# from the base image node 

WORKDIR /todo_app/developer/fortend/todoapp_fortend
# working directory define 

COPY . .
#copy all the file for the host to working directory 

RUN npm ci
#clean install

CMD [ "npm", "run", "dev" ]
# cmd when container is on 
