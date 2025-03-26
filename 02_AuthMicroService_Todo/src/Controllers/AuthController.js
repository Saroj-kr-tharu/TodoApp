const { authService } = require("../Services/index");

class AuthController {
  async signupContro(req, res) {
    try {
      const datares = req?.body;
      // console.log(datares);

      const response = await authService.createService(datares);
      return res.status(201).json({
        message: "Successfully to Signup",
        success: true,
        data: response,
        err: {},
      });
    } catch (error) {
      console.log("Something went wrong in controller level (creating)");
      return res.status(501).json({
        message: "Failed to Signup",
        success: false,
        data: {},
        err: error.message || error,
      });
    }
  }

  async deleteContro(req, res) {
    try {
      const datares = req?.body;

      const response = await authService.deleteService(datares);

      let msg = "Successfully delete User";
      if (response === 0) mes = "No any user is delete";

      return res.status(201).json({
        message: msg,
        success: true,
        data: response,
        err: {},
      });
    } catch (error) {
      console.log("Something went wrong in controller level (deleting)");
      return res.status(501).json({
        message: "Failed to Signup",
        success: false,
        data: {},
        err: error.message || error,
      });
    }
  }

  async signinContro(req, res) {
    try {
      const datares = req?.body;

      const response = await authService.loginService(datares);
      return res.status(201).json({
        message: "Successfully to Signup",
        success: true,
        data: response,
        err: {},
      });
    } catch (error) {
      console.log("Something went wrong in controller level (login)");
      return res.status(401).json({
        message: "Failed to Signup",
        success: false,
        data: {},
        err: error.message || error,
      });
    }
  }

  async isAuthenticatedContrr(req, res) {
    try {
      const token = req?.header("x-access-token");
      if (!token) throw "token is not present";
      // console.log("token => ",token);
      console.log('Token veriffication ');

      const response = await authService.verityUsertokenService(token);
      console.log('response => ', response);

      return res.status(201).json({
        message: "Successfully Authenticated",
        success: true,
        data: response,
        err: {},
      });
    } catch (error) {
      console.log("Something went wrong in controller level (login)");
      return res.status(401).json({
        message: "Unable to autheticated",
        success: false,
        data: {},
        err: error.message || error,
      });
    }
  }

  async changePassContro(req, res) {
    try {
      const newPassword = req.body?.newPassword;
      const oldPassword = req.body?.oldPassword;
      const email = req?.body?.email;


      // console.log(datares);

      const response = await authService.updatePasswordService(
        email,
        oldPassword,
        newPassword
      );
      return res.status(201).json({
        message: "Successfully to change Password",
        success: true,
        data: response,
        err: {},
      });
    } catch (error) {
      console.log(
        "Something went wrong in controller level (updating password)"
      );
      return res.status(501).json({
        message: "Failed to  change Password",
        success: false,
        data: {},
        err: error.message || error,
      });
    }
  }

  async checkRoleContro(req, res) {
    try {
      const data = req.body;
      const msg = await authService.checkRoleService(data);
      let response = ` Check The role of ${data.role} of   ${data.email} has  ${msg}   `;
      return res.status(201).json({
        message: "Successfully Check the Role",
        success: true,
        data: response,
        err: {},
      });
    } catch (error) {
      console.log("Something went wrong in controller level (check role)");
      return res.status(401).json({
        message: "Unable to check Role",
        success: false,
        data: {},
        err: error.message || error,
      });
    }
  }

  async addRoleContro(req, res) {
    try {
      const data = req.body;
      const msg = await authService.addRoleService(data);
      let response = ` Set The role of ${data.role} of   ${data.email} has  ${msg}   `;

      return res.status(201).json({
        message: "Successfully Check the Role",
        success: true,
        data: response,
        err: {},
      });
    } catch (error) {
      console.log("Something went wrong in controller level (add role)");
      return res.status(401).json({
        message: "Unable to check Role",
        success: false,
        data: {},
        err: error.message || error,
      });
    }
  }

  async getAllRoleContro(req, res) {
    try {
      const data = req.body;
      const response = await authService.getAllRoleService(data);

      return res.status(201).json({
        message: "Successfully get All Role",
        success: true,
        data: response,
        err: {},
      });
    } catch (error) {
      console.log("Something went wrong in controller level (get all role)");
      return res.status(401).json({
        message: "Unable to get all  Role",
        success: false,
        data: {},
        err: error.message || error,
      });
    }
  }

  async sendMsgToQueueContro(req, res) {
    try {
      const data = req.body;
      // console.log(data);

      const response = await authService.sendMessageToQueueService(data);

      return res.status(201).json({
        message: "Successfully publish Message to Queue",
        success: true,
        data: {},
        err: {},
      });
    } catch (error) {
      console.log(
        "Something went wrong in controller level (publish Message to Queue)"
      );
      return res.status(401).json({
        message: "Unable to publish Message to Queue",
        success: false,
        data: {},
        err: error.message || error,
      });
    }
  }
}

const authController = new AuthController();
module.exports = authController;
