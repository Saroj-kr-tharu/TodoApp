const { verficationService } = require("../Services/index");

class verificationController {
  async createVerifyContro(req, res) {
    try {
      const data = req.body;
      // console.log("controller => ", data);

      const result = await verficationService.createService(data);

      return res.status(201).json({
        message: "Successfully create Verification db",
        success: true,
        data: result,
        err: {},
      });
    } catch (error) {
      console.log(
        "Something went wrong in controller level (createVerificationController)"
      );
      return res.status(401).json({
        message: "Unable to create Verification ",
        success: false,
        data: {},
        err: error.message || error,
      });
    }
  }

  async sendVerifyContro(req, res) {
    try {
      const email = req.body?.email;
      // const {id} = data;
      // console.log("controller => ", email);

      const result = await verficationService.createVerificationLink(email);

      return res.status(201).json({
        message: "Successfully send Verification Link",
        success: true,
        data: result,
        err: {},
      });
    } catch (error) {
      console.log(
        "Something went wrong in controller level (sendVerificationController)"
      );
      return res.status(401).json({
        message: "Unable to send Verification Link ",
        success: false,
        data: {},
        err: error.message || error,
      });
    }
  }

  async verifyVerifyContro(req, res) {
    try {
      // Extract the token from the query parameters
      const token = req.query?.token;
      // console.log("Extracted token => ", token);

      // Verify the token
      const result = await verficationService.verifyVerificationLink(token);
      const email = result?.data;
      
      const Url = `http://localhost:5173/sucessVerify/${email}`;
      console.log(Url);
      res.redirect(Url);

      // return res.status(200).json({
      //   message: "Email verified successfully",
      //   success: true,
      //   data: result,
      //   err: {},
      // });
      
    } catch (error) {
      console.log(
        "Something went wrong in controller level (verifyVerificationLink)"
      );
      return res.status(400).json({
        message: "Invalid or expired token",
        success: false,
        data: {},
        err: error.message || error,
      });
    }
  }

  async updateVerifyContro(req, res) {
    try {
      const data = req.body?.id;

      // console.log(id, data);

      const result = await verficationService.updateService(id, data);

      return res.status(201).json({
        message: "Successfully update Verification db",
        success: true,
        data: result,
        err: {},
      });
    } catch (error) {
      console.log(
        "Something went wrong in controller level (updateVerificationController)"
      );
      return res.status(401).json({
        message: "Unable to update Verification ",
        success: false,
        data: {},
        err: error.message || error,
      });
    }
  }

  async deleteVerifyContro(req, res) {
    try {
      const id = req.body?.id;

      const result = await verficationService.deleteService(id);

      return res.status(201).json({
        message: "Successfully delete Verification db",
        success: true,
        data: result,
        err: {},
      });
    } catch (error) {
      console.log(
        "Something went wrong in controller level (deleteVerificationController)"
      );
      return res.status(401).json({
        message: "Unable to delete Verification ",
        success: false,
        data: {},
        err: error.message || error,
      });
    }
  }

  async readAllVerifyContro(req, res) {
    try {
      const result = await verficationService.getAllService();

      return res.status(201).json({
        message: "Successfully get All  Verification db",
        success: true,
        data: result,
        err: {},
      });
    } catch (error) {
      console.log(
        "Something went wrong in controller level (getAllVerificationController)"
      );
      return res.status(401).json({
        message: "Unable to create Verification ",
        success: false,
        data: {},
        err: error.message || error,
      });
    }
  }
}

const verifyController = new verificationController();
module.exports = verifyController;
