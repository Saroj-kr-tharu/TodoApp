const { TaskRepository } = require('../Repository/index');

const { formatDate } = require('../utlis/index');

const curd = new TaskRepository();

const createTaskService = (data) => {
    try {

        const datares = curd.create(data);
        return datares;

    } catch (error) {
        console.log('Something Went wrong in Service layer creating todo');
        throw error;
    }

}

const readTaskService = async (email) => {
    try {

        const data = await curd.getAll(email);
        return data;

    } catch (error) {
        console.log('Something Went wrong in Service layer (getAll) todo');
        throw error;
    }
}

const getTaskService = async (id, email) => {
    try {
        const data = await curd.getById(id, email);
        return data;

    } catch (error) {
        console.log('Something Went wrong in Service layer (getById)');
        throw error;
    }
}

const updateTaskService = async (id, email, data) => {
    try {

        const response = await curd.update(id, email, data);
        if (response) {
            const newTodo = await curd.getById(id, email);
            // console.log("upadte todo =>", newTodo);
            return newTodo;
        }
        return response;

    } catch (error) {
        console.log('Something Went wrong in Service layer (updating) ');
        throw error;
    }
}

const deleteTaskService = async (id, email) => {
    try {
        const response = await curd.delete(id, email);
        return response;

    } catch (error) {
        console.log('Something Went wrong in Service layer (delete)');
        throw error;
    }
}

const filterTaskService = async (data) => {
    try {
        const response = await curd.filter(data);
        return response;

    } catch (error) {
        console.log('Something Went wrong in Service layer (filter)');
        throw error;
    }
}
module.exports = {
    createTaskService,
    readTaskService,
    getTaskService,
    updateTaskService,
    deleteTaskService,
    filterTaskService
}