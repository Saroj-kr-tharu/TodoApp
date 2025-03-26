const express = require("express");
const router = express.Router();

const {
  createController,
  deleteController,
  getByDateRangeController,
  getByIdController,
  updateController,
  getPendingMailController,
  updateNotificationController,
} = require("../../Controllers/remainderController");

const {
  createValidator,
  getByIdValidator,
  deleteValidator,
  updateValidator,
  rangeValidator,
} = require("../../Middlewares/ticketMiddleware");

router.post("/createTicket", createValidator, createController);
router.post("/deleteTicket", deleteValidator, deleteController);
router.post("/updateTicket", updateValidator, updateController);
router.post("/updateNotificationTicket", updateNotificationController);

router.get("/getTicketById", getByIdValidator, getByIdController);
router.get("/filterByRange", rangeValidator, getByDateRangeController);
router.get("/filterByRange", rangeValidator, getByDateRangeController);
router.get("/getPendingMail", getPendingMailController);

module.exports = router;
