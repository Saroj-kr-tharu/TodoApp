const ticketRepo = require("../Repository/TicketRepo");

const subscribeEvent = async (payload) => {
  try {
    let service = payload.service;
    let data = payload.data;

    // console.log(`service => ${service} '\n' data => ${data}`);

    switch (service) {
      case "CREATE_TICKET":
        await createService(data);
        break;

      default:
        console.log("No  valid event recevied");
        break;
    }

    // return res;
  } catch (error) {
    console.log("Something went wrong in service layer (subscribeEvent)");
    throw error;
  }
};

const createService = async (data) => {
  try {
    // console.log('Service => ', data);

    const res = await ticketRepo.create(data);
    return res;
  } catch (error) {
    console.log("Something went wrong in service layer (create)");
    throw error;
  }
};

const deleteService = async (id) => {
  try {
    const res = await ticketRepo.delete(id);
    return res;
  } catch (error) {
    console.log("Something went wrong in service layer (delete)");
    throw error;
  }
};

const updateService = async (id, data) => {
  try {
    // console.log(id, " data => ", data);

    const res = await ticketRepo.update(id, data);
    return res;
  } catch (error) {
    console.log("Something went wrong in service layer (update)");
    throw error;
  }
};

const updateNotificationService = async (id, data) => {
  try {
    // console.log(id, " data => ", data);

    const res = await ticketRepo.updateNotification(id, data);
    return res;
  } catch (error) {
    console.log("Something went wrong in service layer (update)");
    throw error;
  }
};

const getByIdService = async (data) => {
  try {
    const res = await ticketRepo.findById(data);
    return res;
  } catch (error) {
    console.log("Something went wrong in service layer (getByIdService)");
    throw error;
  }
};

const getPendingMailService = async () => {
  try {
    const res = await ticketRepo.findPendingMail();
    return res;
  } catch (error) {
    console.log("Something went wrong in service layer (getByIdService)");
    throw error;
  }
};

const filterByDateService = async (data) => {
  try {
    // console.log(data.startDate, data.endDate);

    const res = await ticketRepo.filterByDateRange(
      data.startDate,
      data.endDate
    );
    return res;
  } catch (error) {
    console.log("Something went wrong in service layer (getByIdService)");
    throw error;
  }
};

module.exports = {
  updateService,
  createService,
  getByIdService,
  filterByDateService,
  deleteService,
  getPendingMailService,
  updateNotificationService,
  subscribeEvent,
};
