const { Task } = require("../models/index");

const CURDRepo = require('./curd-repository');

class TaskRepository extends CURDRepo{
    constructor(){
        super(Task);
    }

}

module.exports = TaskRepository; 