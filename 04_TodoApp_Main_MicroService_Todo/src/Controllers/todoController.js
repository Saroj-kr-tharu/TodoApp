const {
  readTaskService,
  createTaskService,
  getTaskService,
  updateTaskService,
  deleteTaskService,
  filterTaskService,
} = require("../Services/TodoService");

const {
  SuccessCode,
  ClientErrorCode,
  ServerErrorCode,
} = require("../utlis/https_codes");

const readTaskController = async (req, res) => {
  try {
    const email = req.body?.email;

    const datas = await readTaskService(email);
    return res.status(SuccessCode.OK).json({
      message: "Successfully feteched the data",
      success: true,
      data: datas,
      err: {},
    });
  } catch (error) {
    console.log("Something went wrong in controller level in reading ");

    return res.status(ServerErrorCode.INTERNAL_SERVER).json({
      message: "Failed to feteched the data",
      success: false,
      data: {},
      err: {},
    });
  }
};

const createTaskController = async (req, res) => {
  try {
    const data = req.body;
    // console.log(' create task =>  ', data);
    
    const response = await createTaskService(data);

    return res.status(SuccessCode.CREATED).json({
      message: "Successfully created the data",
      success: true,
      data: response,
      err: {},
    });
  } catch (error) {
    console.log("Something went wrong in controller level in (create) ");

    return res.status(ServerErrorCode.NOT_IMPLEMENT).json({
      message: "Failed to create new task",
      success: false,
      data: {},
      err: error.message || error,
    });
  }
};

const getTaskController = async (req, res) => {
  try {
    const id = req.query?.id;
    const email = req.body?.email;
    // console.log(id,email);

    const response = await getTaskService(id, email);

    let msg = "Successfully fetch  data";
    if (!response) msg = "data is not present ";

    return res.status(SuccessCode.OK).json({
      message: msg,
      success: true,
      data: response,
      err: {},
    });
  } catch (error) {
    console.log("Something went wrong in controller level in get task  ");

    return res.status(ServerErrorCode.INTERNAL_SERVER).json({
      message: "Failed to fetch  task",
      success: false,
      data: {},
      err: error.message || error,
    });
  }
};

const updateTaskController = async (req, res) => {
  try {
    const id = req.query?.id;
    const email = req.body?.email;
    const data = req?.body;

    const response = await updateTaskService(id, email, data);
    return res.status(SuccessCode.OK).json({
      message: "Successfully update task",
      success: true,
      data: response,
      err: {},
    });
  } catch (error) {
    console.log("Something went wrong in controller level in update todo  ");

    return res.status(ServerErrorCode.INTERNAL_SERVER).json({
      message: "Failed to fetch  task from controller",
      success: false,
      data: {},
      err: error.message || error,
    });
  }
};

const deleteTaskController = async (req, res) => {
  try {
    const id = req.query.id;
    const email = req.body?.email;

    const response = await deleteTaskService(id, email);

    let msg = "Successfully delete task";
    if (!response) msg = "id is not present";

    return res.status(SuccessCode.OK).json({
      message: msg,
      success: true,
      data: response,
      err: {},
    });
  } catch (error) {
    console.log("Something went wrong in controller level in deleting task  ");

    return res.status(ServerErrorCode.INTERNAL_SERVER).json({
      message: "Failed to delete  todo from controller",
      success: false,
      data: {},
      err: error.message || error,
    });
  }
};

const filterTaskController = async (req, res) => {
  try {
    const data = req.body;
    console.log(data);
    
    const response = await filterTaskService(data);

    let msg = "Successfully Fetched filter task";
    if (!response) msg = "data  is not present";

    return res.status(SuccessCode.OK).json({
      message: msg,
      success: true,
      data: response,
      err: {},
    });
  } catch (error) {
    console.log("Something went wrong in controller level in deleting task  ");

    return res.status(ServerErrorCode.INTERNAL_SERVER).json({
      message: "Failed to delete  todo from controller",
      success: false,
      data: {},
      err: error.message || error,
    });
  }
};

module.exports = {
  readTaskController,
  createTaskController,
  getTaskController,
  updateTaskController,
  deleteTaskController,
  filterTaskController,
};
