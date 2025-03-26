const { oAuthProvider } = require("../models/index");

const CURDRepo = require("./curdRepo");

class OauthRepository extends CURDRepo {
  constructor() {
    super(oAuthProvider);
  }

  async createOAuth(data) {
    try {
      // console.log('repo level', data);
      const user = await this.getByProviderId(
        data.provider,
        data.providerUserId
      );
      if (user) {
        // console.log("User is already in db ", user);
        return user;
      }
      const res = await oAuthProvider.create(data);
      return res;
    } catch (error) {
      console.log("Something went wrong in Repo level (create) ");
      throw error;
    }
  }

  async getByProviderId(provider, id) {
    try {
      const user = await oAuthProvider.findOne({
        where: {
          provider,
          providerUserId: id,
        },
      });
      return user;
    } catch (error) {
      console.log("Something went wrong in Repo level (get by email) ");
      throw error;
    }
  }
}

const oauthRepo = new OauthRepository();

module.exports = oauthRepo;
