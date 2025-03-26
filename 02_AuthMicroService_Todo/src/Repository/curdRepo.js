class CURDRepo {
  constructor(model) {
    this.model = model;
  }

  async create(data) {
    try {
      const res = await this.model.create(data);
      return res;
    } catch (error) {
      console.log("Something went wrong in Repo level (create) ");
      throw error;
    }
  }

  async update(id, data) {
    try {
      const res = await this.model.update(data, {
        where: {
          id,
        },
      });

      return res;
    } catch (error) {
      console.log("Something went wrong in Repo level (create) ");
      throw error;
    }
  }

  async delete(id) {
    try {
      const res = await this.model.destroy({
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

  async getAll() {
    try {
      const user = await this.model.findAll();

      return user;
    } catch (error) {
      console.log("Something went wrong in Repo level (getAll) ");
      throw error;
    }
  }

  async getByid(id) {
    try {
      const user = await this.model.findOne({
        where: { id },
      });

      return user;
    } catch (error) {
      console.log("Something went wrong in Repo level (getAll) ");
      throw error;
    }
  }
}

module.exports = CURDRepo;
