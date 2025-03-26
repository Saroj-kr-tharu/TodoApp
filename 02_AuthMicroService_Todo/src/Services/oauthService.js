const oauthRepo = require("../Repository/oauthReposiotry");
const curdService = require("./curdService");

const {jwt_helper} = require("../utlis/jwtHelps");


class OauthServices extends curdService {
  constructor() {
    super(oauthRepo);
  }

  async createOauthService(data) {
    try {
      // const res = await oauthRepo.createOAuth(data);
      // console.log('service ', data);

      // if (!res) throw error("error while action in  db");
      const token = await jwt_helper.createToken(data);
      return token;
    } catch (error) {
      console.log("Something went wrong in service layer (create)");
      throw error;
    }
  }

  async deleteOauthService(data) {
    try {
      const result = await new Promise((resolve, reject) => {
        if (!data.session) {
          return reject(new Error("No session found"));
        }

        data.session.destroy((err) => {
          if (err) {
            console.error("Error destroying the session:", err);
            return reject(err);
          }
          console.log("Successfully destroyed session");
          resolve("Successfully destroyed session");
        });
      });

      return result;
    } catch (error) {
      console.error(
        "Something went wrong in service layer (deleteOauthService):",
        error
      );
      throw error; // Re-throw the error so controller can catch it
    }
  }
}

const oauthService = new OauthServices();
module.exports = oauthService;
