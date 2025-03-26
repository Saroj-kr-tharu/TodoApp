const { ResetTokens } = require("../models/index");

const CURDRepo = require("./curdRepo");

class RestLinkRepo extends CURDRepo {
  constructor() {
    super(ResetTokens);
  }

  async deleteAllResetTokensByUserId(userid) {
    try {
      const result = await ResetTokens.destroy({
        where: {
          userId: userid,
        },
      });

      return result;
    } catch (error) {
      console.log(
        "Something went wrong with repo level (findAllVerificationByUserId) "
      );
    }
  }

}

const restLinkRepo = new RestLinkRepo();

module.exports = { restLinkRepo };
