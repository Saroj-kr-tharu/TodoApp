const resetService = require("../Services/resetService");

class RestTokenController {
  async createResetContro(req, res) {
    try {
      const data = req.body;
      console.log("controller => ", data);

      // const result = await resetService.createService(data);
      const result = await resetService.createService(data);

      return res.status(201).json({
        message: "Successfully create RestToken db",
        success: true,
        data: result,
        err: {},
      });
    } catch (error) {
      console.log(
        "Something went wrong in controller level (createRestTokenController)"
      );
      return res.status(401).json({
        message: "Unable to create RestToken ",
        success: false,
        data: {},
        err: error.message || error,
      });
    }
  }

  async updateResetContro(req, res) {
    try {
      const id = req.query?.id;
      const data = req.body;
      console.log(id, data);

      const result = await resetService.updateService(id, data);

      return res.status(201).json({
        message: "Successfully update RestToken db",
        success: true,
        data: result,
        err: {},
      });
    } catch (error) {
      console.log(
        "Something went wrong in controller level (updateRestTokenController)"
      );
      return res.status(401).json({
        message: "Unable to update RestToken ",
        success: false,
        data: {},
        err: error.message || error,
      });
    }
  }

  async deleteResetContro(req, res) {
    try {
      const id = req.body?.id;

      const result = await resetService.deleteService(id);

      return res.status(201).json({
        message: "Successfully delete RestToken db",
        success: true,
        data: result,
        err: {},
      });
    } catch (error) {
      console.log(
        "Something went wrong in controller level (deleteRestTokenController)"
      );
      return res.status(401).json({
        message: "Unable to delete RestToken ",
        success: false,
        data: {},
        err: error.message || error,
      });
    }
  }

  async readAllResetContro(req, res) {
    try {
      const result = await resetService.getAllService();

      return res.status(201).json({
        message: "Successfully get All  RestToken db",
        success: true,
        data: result,
        err: {},
      });
    } catch (error) {
      console.log(
        "Something went wrong in controller level (getAllRestTokenController)"
      );
      return res.status(401).json({
        message: "Unable to create RestToken ",
        success: false,
        data: {},
        err: error.message || error,
      });
    }
  }

  async sendResetLinkContro(req, res) {
    try {
      const email = req.body?.email;

      const result = await resetService.sendResetLink(email);

      return res.status(201).json({
        message: "Successfully send Reset Link ",
        success: true,
        data: result,
        err: {},
      });
    } catch (error) {
      console.log(
        "Something went wrong in controller level (sendResetLinkContro)"
      );
      return res.status(401).json({
        message: "Unable to send link  RestToken ",
        success: false,
        data: {},
        err: error.message || error,
      });
    }
  }

  async ResetPasswordContro(req, res) {
    try {
      const token = req.query?.token;
      const password = req.body?.password;

      const result = await resetService.ResetPasswordLink(token, password);

      return res.status(201).json({
        message: "Successfully Reset Password ",
        success: true,
        data: result,
        err: {},
      });
    } catch (error) {
      console.log(
        "Something went wrong in controller level (ResetPasswordContro)"
      );
      return res.status(401).json({
        message: "Unable to  Reset Password ",
        success: false,
        data: {},
        err: error.message || error,
      });
    }
  }

  async verifyResetLinkContro(req, res) {
    try {
      const token = req.query?.token;
      console.log(token);

      const result = await resetService.verifyResetLink(token);

        const Url = `http://localhost:5173/resetform/${result}`;
        console.log(Url);
        res.redirect(Url);
       


    } catch (error) {
      console.log(
        "Something went wrong in controller level (verifyResetLinkContro)"
      );

      return res.status(401).json({
        message: "Unable to send link  RestToken ",
        success: false,
        data: {},
        err: error.message || error,
      });
    }
  }
}

const resetController = new RestTokenController();
module.exports = resetController;
