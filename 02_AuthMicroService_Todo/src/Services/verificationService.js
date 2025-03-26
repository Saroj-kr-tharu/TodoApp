const curdService = require("./curdService");
const verificationRepo = require("../Repository/verificationRepo");

const { jwt_helper } = require("../utlis/jwtHelps");
const authService = require("./authService");

class verificationServiceClass extends curdService {
  constructor() {
    super(verificationRepo);
  }

  async createVerificationLink(email) {
    try {
      // `https://example.com/verify?token=${token}
      // http://localhost:3003/api/v1/verify?token=${token}

      // 1. create token with  email data
      console.log(email);

      // const user = await authService.getByUserIdService(id);
      const user = await authService.getUserByEmailService(email);

      if (!user) throw error;

      const id = user.id;
     
      const token = await jwt_helper.createToken(email);

      const expiresAt = new Date(Date.now() + 2 * 60 * 1000);

      // 2. make link
      const link = `http://localhost:3000/authservice/verify?token=${token}`;
      console.log(link);

      // 3. update db
      await this.createService({
        token: token,
        userId: id,
        expiresAt: expiresAt,
      });

      // 4. publish to queuque
      const Username = email.split("@")[0];
      let datares = {
        subject: "Verification Mail",
        content: "Verify",
        recepientEmail: email,
        notificationTime: new Date(),
        typeMail: "VERIFY",
        username: Username,
        token: token,
      };

      await authService.sendMessageToQueueService(datares);
      // console.log(res);

      // 5. return link
      return link;
    } catch (error) {
      console.log(
        "Something went wrong in service layer (creating VerificationLink)"
      );
      throw error;
    }
  }

  async verifyVerificationLink(token) {
    try {
      //1. link get
      // 2. extract token
      // const token = data.token;

      // 3. verify the token
      const result = await jwt_helper.verifyToken(token);
      // console.log(result);
      const email = result.data;

      const user = await authService.getUserByEmailService(email);
      if (!user) throw "Email is not present";
      const userId = user.id;

      // 4. delete link from db
      await verificationRepo.deleteAllVerificationByUserId(userId);

      // 5. user isveried = true in user table in db
      await authService.updateService(userId, { isVerified: true });

      // 6. return user and say verief
      return result;
    } catch (error) {
      console.log(
        "Something went wrong in service layer (creating VerificationLink)"
      );
      throw error;
    }
  }
}

const verficationService = new verificationServiceClass();
module.exports = verficationService;
