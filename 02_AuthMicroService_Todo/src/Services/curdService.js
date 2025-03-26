class curdService {
  constructor(repo) {
    this.repo = repo;
  }

  async createService(data) {
    try {
      const res = await this.repo.create(data);
      return res;
    } catch (error) {
      console.log("Something went wrong in service layer (createService)");
      throw error;
    }
  }

  async deleteService(id) {
    try {
      const result = await this.repo.delete(id);
      return result;
    } catch (error) {
      console.error(
        "Something went wrong in service layer (deleteService):",
        error
      );
    }
  }

  async getAllService() {
    try {
      const res = await this.repo.getAll();
      return res;
    } catch (error) {
      console.log("Something went wrong in service layer (getAllService)");
      throw error;
    }
  }
  
  async getByidService(id) {
    try {
      const res = await this.repo.getByid(id);
      return res;
    } catch (error) {
      console.log("Something went wrong in service layer (getAllService)");
      throw error;
    }
  }

 



  async updateService(id, data) {
    try {
      const res = await this.repo.update(id, data);
      return res;
    } catch (error) {
      console.log("Something went wrong in service layer (delete service)");
      throw error;
    }
  }
}

module.exports = curdService;
