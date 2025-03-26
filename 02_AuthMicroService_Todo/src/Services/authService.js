const { REMINDER_BINDING_KEY } = require("../config/serverConfig");

const authRepo = require("../Repository/authRepository");
const { createChannel, publishMessage } = require("../utlis/messageQueue");

const { jwt_helper } = require("../utlis/jwtHelps");
const bcryptHelper = require("../utlis/bcrypt_helper");

class AuthService {

  async createService(data) {
    try {
      const email = data?.email;
      const res = await authRepo?.create(data);

      const Username = email.split("@")[0];
      const payload = {
        subject: "Welcome To AuthService",
        content: "Reset",
        recepientEmail: email,
        notificationTime: new Date(),
        typeMail: "WELCOME",
        username: Username,
        token: "",
      };
      await this.sendMessageToQueueService(payload);

      return res;
    } catch (error) {
      console.log("Something went wrong in service layer (create)");
      throw error;
    }
  }

  async deleteService(email) {
    try {
      const res = await authRepo.Delete(email);
      return res;
    } catch (error) {
      console.log("Something went wrong in service layer (delete service)");
      throw error;
    }
  }

  async updateService(id, data) {
    try {
      const user = await authRepo.update(id, data);

      return user;
    } catch (error) {
      console.log("Something went wrong in service layer (updateService)");
      throw error;
    }
  }

  async updatePasswordService(email, oldPassword, newPassword) {
    try {
      // 1. get email , old password, new password
      console.log(email, oldPassword, newPassword);

      // 2. get the user by email
      let user = await this.getUserByEmailService(email);

      if (!user) throw new error("user is not present ");
      // console.log(user);

      // const pass = user.password;
      // console.log(pass);

      // 3. veriry the old password and user password
      let res = await bcryptHelper.checkPasswordService(
        oldPassword,
        user.password
      );
      if (!res) return "Incorrect passwrod ";

      // 4. hash the new password
      const hash = await bcryptHelper.generatePasswordService(newPassword);

      // 5. update the hash password in db
      user = await authRepo.updatePassword(email, hash);

      return user;
    } catch (error) {
      console.log("Something went wrong in service layer (updateService)");
      throw error;
    }
  }

  async verityUsertokenService(token) {
    try {
      const response = await jwt_helper.verifyToken(token);
      console.log('response of verify => ', response.email);
      
      const email = response.data.email;
      const user = await authRepo.getByEmail(email);
      if (!user) throw "Email is not present";

      return {
        id: user.id,
        email: user.email,
      };
    } catch (error) {
      console.log("Something went wrong in service layer (verify token)");
      throw error;
    }
  }

  async loginService(data) {
    try {
      const user = await this.getUserByEmailService(data.email);
      // console.log(user);

      const checkPass = await bcryptHelper.checkPasswordService(
        data.password,
        user.password
      );
      if (!checkPass) return "password is not match";
      // console.log(checkPass);
      // const token = await jwt_helper.createToken(email);

      const token = await jwt_helper.createToken(data);

      // console.log(token);
      const response = {
        email: data.email,
        token,
        isVerified: user.isVerified
      }
      console.log(response);
      
      return response;
    } catch (error) {
      console.log("Something went wrong in service layer (login service)");
      throw error;
    }
  }

  async getUserByEmailService(email) {
    try {
      const user = await authRepo.getByEmail(email);
      if (!user) throw "Email is not present";
      return user;
    } catch (error) {
      console.log(
        "Something went wrong in service layer (geting user by email service)"
      );
      throw error;
    }
  }

  async getByUserIdService(id) {
    try {
      const user = await authRepo.getByUserId(id);
      if (!user) throw "User is not present";
      return user;
    } catch (error) {
      console.log(
        "Something went wrong in service layer (geting user by Id service)"
      );
      throw error;
    }
  }

  async addRoleService(data) {
    try {
      const res = await authRepo.addRole(data);
      return res;
    } catch (error) {
      console.log("Something went wrong in service layer (addRoleService)");
      throw error;
    }
  }

  async checkRoleService(data) {
    try {
      const res = await authRepo.checkRole(data);
      return res;
    } catch (error) {
      console.log("Something went wrong in service layer (checkRoleService)");
      throw error;
    }
  }

  async getAllRoleService(data) {
    try {
      const res = await authRepo.getAllRole(data);
      return res;
    } catch (error) {
      console.log("Something went wrong in service layer (getAllRole)");
      throw error;
    }
  }

  async sendMessageToQueueService(data) {
    try {
      const channel = await createChannel();
      const payload = {
        data: {
          ...data,
          // subject: 'Welcome Bro ',
          // content: 'Hellow bro ',
          // recepientEmail: 'sarojc11345@gmail.com',
          // notificationTime: '2024-12-26 10:16:00'
          // typeMail: "VERIFY",
          // username: "Saroj",
        },
        service: "CREATE_TICKET",
      };

      // console.log("Sending data to publish ", payload);

      publishMessage(channel, REMINDER_BINDING_KEY, JSON.stringify(payload));

      return true;

      
    } catch (error) {
      console.log(
        "Something went wrong in service layer (publish Message to Queue)"
      );
      throw error;
    }
  }
}

const authService = new AuthService();

module.exports = authService;
