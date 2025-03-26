const {
  createService,
  deleteService,
  filterByDateService,
  getByIdService,
  updateService,
  getPendingMailService,
  updateNotificationService,
} = require("../Services/remainderService");

const createController = async (req, res) => {
  try {
    const datares = req.body;

    const response = await createService(datares);
    return res.status(201).json({
      message: "Successfully to Create a Ticket",
      success: true,
      data: response,
      err: {},
    });
  } catch (error) {
    console.log("Something went wrong in controller level (creating)");
    return res.status(501).json({
      message: "Failed to Create a Ticket",
      success: false,
      data: {},
      err: error.message || error,
    });
  }
};

const updateNotificationController = async (req, res) => {
  try {
    const datares = req.body.status;
    const id = req.query.id;

    const response = await updateNotificationService(id, datares);
    return res.status(201).json({
      message: "Successfully to Update a Ticket",
      success: true,
      data: response,
      err: {},
    });
  } catch (error) {
    console.log("Something went wrong in controller level (creating)");
    return res.status(501).json({
      message: "Failed to update a Ticket",
      success: false,
      data: {},
      err: error.message || error,
    });
  }
};
const updateController = async (req, res) => {
  try {
    const datares = req.body;
    const id = req.query.id;

    const response = await updateService(id, datares);
    return res.status(201).json({
      message: "Successfully to Update a Ticket",
      success: true,
      data: response,
      err: {},
    });
  } catch (error) {
    console.log("Something went wrong in controller level (creating)");
    return res.status(501).json({
      message: "Failed to update a Ticket",
      success: false,
      data: {},
      err: error.message || error,
    });
  }
};

const getByIdController = async (req, res) => {
  try {
    const datares = req.query.id;
    // console.log(datares);

    const response = await getByIdService(datares);
    return res.status(201).json({
      message: "Successfully to get  a Ticket by id ",
      success: true,
      data: response,
      err: {},
    });
  } catch (error) {
    console.log(
      "Something went wrong in controller level (getingByIdController)"
    );
    return res.status(501).json({
      message: "Failed to get  a Ticket By Id",
      success: false,
      data: {},
      err: error.message || error,
    });
  }
};

const getPendingMailController = async (req, res) => {
  try {
    const response = await getPendingMailService();
    return res.status(201).json({
      message: "Successfully to get Pending Ticket  ",
      success: true,
      data: response,
      err: {},
    });
  } catch (error) {
    console.log("Something went wrong in controller level (getingPendingMail)");
    return res.status(501).json({
      message: "Failed to get  Pending Ticket",
      success: false,
      data: {},
      err: error.message || error,
    });
  }
};
const deleteController = async (req, res) => {
  try {
    const id = req.body.id;

    const response = await deleteService(id);
    return res.status(201).json({
      message: "Successfully to delete a Ticket",
      success: true,
      data: response,
      err: {},
    });
  } catch (error) {
    console.log("Something went wrong in controller level (deleting)");
    return res.status(501).json({
      message: "Failed to delete a Ticket",
      success: false,
      data: {},
      err: error.message || error,
    });
  }
};

const getByDateRangeController = async (req, res) => {
  try {
    const datares = req.body;
    const response = await filterByDateService(datares);
    return res.status(201).json({
      message: "Successfully to delete a Ticket",
      success: true,
      data: response,
      err: {},
    });
  } catch (error) {
    console.log("Something went wrong in controller level (deleting)");
    return res.status(501).json({
      message: "Failed to delete a Ticket",
      success: false,
      data: {},
      err: error.message || error,
    });
  }
};

module.exports = {
  createController,
  updateController,
  deleteController,
  getByIdController,
  getByDateRangeController,
  getPendingMailController,
  updateNotificationController
};
