

const CURDRepo = require("./curdRepo");
const { VerificationTokens } = require("../models/index");

class verificationRepository extends CURDRepo {
  constructor() {
    super(VerificationTokens);
  }

  async deleteAllVerificationByUserId(userid) {
    try {
      const result = await VerificationTokens.destroy({
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

const verificationRepo = new verificationRepository();

module.exports = verificationRepo;
