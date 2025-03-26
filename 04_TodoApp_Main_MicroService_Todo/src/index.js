const express = require('express');
const bodyParser = require('body-parser');

const { PORT } = require('./config/serverConfig');
const ApiRoutes = require('./Routes/index');


const TaskRepository = require('./Repository/task-repository');
const curd = new TaskRepository;



const serverSetupStart = () => {
    const app = express();

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use('/api', ApiRoutes);
    

    app.listen(PORT, async () => {
        console.log(`Server Started at ${PORT}`);
        // curd.getTodo('8db921d1-f1b6-4854-a95a-09e4932f2f94');
        // curd.createTodos(data);
        // readTodosController();

        // curd.delete(2);
        // console.log( await curd.getById(1) );

        // curd.create(data);
        // curd.update(3, data);
        // const res = await curd.filter({startDate: "2022" , endDate:"2024"});
        // console.log(res);

    })
}


serverSetupStart();

