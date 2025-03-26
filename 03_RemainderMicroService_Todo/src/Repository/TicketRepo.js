const { NotificationTickets } = require("../models/index");
const { Op, where } = require("sequelize");

class TicketRepo {
  async create(data) {
    try {
      // console.log("repo ", data);

      const res = await NotificationTickets.create(data);
      return res;
    } catch (error) {
      console.log("Something went wrong in Repo level (create) ");
      throw error;
    }
  }

  async delete(id) {
    try {
      const res = await NotificationTickets.destroy({
        where: {
          id,
        },
      });
      return res;
    } catch (error) {
      console.log("Something went wrong in Repo level (delete) ");
      throw error;
    }
  }

  async findById(id) {
    try {
      const res = await NotificationTickets.findOne({
        where: {
          id,
        },
      });
      return res;
    } catch (error) {
      console.log("Something went wrong in Repo level (findByid) ");
      throw error;
    }
  }

  async findPendingMail() {
    try {
      const res = await NotificationTickets.findAll({
        where: {
          status: "PENDING",
          notificationTime: {
            [Op.lte]: new Date(),
          },
        },
      });
      return res;
    } catch (error) {
      console.log("Something went wrong in Repo level (findPending) ");
      throw error;
    }
  }

  async filterByDateRange(firstDate, endDate) {
    try {
      const res = await NotificationTickets.findAll({
        where: {
          notificationTime: { [Op.between]: [firstDate, endDate] },
        },
      });
      return res;
    } catch (error) {
      console.log("Something went wrong in Repo level (create) ");
      throw error;
    }
  }

  async update(id, data) {
    try {
      // console.log("repo ", id, data);

      const user = await this.findById(id);
      if (!user) throw new Error("User not found");
      user.set(data);
      const res = await user.save();
      // console.log("user", user);

      return res;
    } catch (error) {
      console.log("Something went wrong in Repo level (create) ");
      throw error;
    }
  }

  async updateNotification(id, dataStatus) {
    try {
      // console.log("repo ", id, data);

      const res = NotificationTickets.update(
        { status: dataStatus },
        {
          where: {
            id,
          },
        }
      );

      return res;
    } catch (error) {
      console.log("Something went wrong in Repo level (create) ");
      throw error;
    }
  }
}

const ticketRepo = new TicketRepo();
module.exports = ticketRepo;
