const { ClientErrorCode } = require("../utlis/https_codes");

const validateGetTask = (req, res, next) => {
    // console.log(req.body);
    
  if (!req.body.email) {
    return res.status(ClientErrorCode.BAD_REQUEST).json({
      message: "Invalid request for create Task",
      err: "Missing mandatory properties  ",
      data: {},
      success: false,
    });
  }

  next();
};

const validateUpdateTask = (req, res, next) => {
  const updateKeys = [
    "title",
    "description",
    "complete",
    "priority",
    "status",
    "dueDate",
    "startDate",
    "endDate",
    "createdAt",
    "completedAt",
  ];

  // console.log(req.query, req.body);
  
  if (
    !req.query.id ||
    !req.body.email ||
    !Object.keys(req.body).some((key) => updateKeys.includes(key))
  ) {
    return res.status(ClientErrorCode.BAD_REQUEST).json({
      message: "Invalid request for update Task",
      err: "Missing mandatory properties ",
      data: {},
      success: false,
    });
  }

  next();
};

const validateCreateTask = (req, res, next) => {
    // console.log(req.body);
    
  if (!req.body.title || !req.body.description || !req.body.email) {
    return res.status(ClientErrorCode.BAD_REQUEST).json({
      message: "Invalid request for create Todo",
      err: "Missing mandatory properties  ",
      data: {},
      success: false,
    });
  }

  next();
};

const validateDeleteTask = (req, res, next) => {
    // console.log("middleware => " , req.query, req.body);
    
  if (!req.query.id || !req.body.email) {
    return res.status(ClientErrorCode.BAD_REQUEST).json({
      message: "Invalid request for delete Task",
      err: "Missing mandatory properties to delete Task ",
      data: {},
      success: false,
    });
  }

  next();
};

const validateFilterTask = (req, res, next) => {
  const updateKeys = [
    "title",
    "description",
    "priority",
    "status",
    "dueDate",
    "startDate",
    "endDate",
    "createdAt",
    "completedAt",
  ];

  if (
    !req.body.email ||
    !Object.keys(req.body).some((key) => updateKeys.includes(key))
  ) {
    return res.status(ClientErrorCode.BAD_REQUEST).json({
      message: "Invalid request for Email Task",
      err: "Missing mandatory properties  ",
      data: {},
      success: false,
    });
  }

  next();
};

module.exports = {
  validateCreateTask,
  validateUpdateTask,
  validateDeleteTask,
  validateFilterTask,
  validateGetTask,
};
