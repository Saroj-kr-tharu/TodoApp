
const { oauthService } = require("../Services/index");
const { jwt_helper } = require("../utlis/jwtHelps");

class OauthController {
  async LoginWithControllter(profile, done) {
    try {
      // console.log(profile);;
      const data = {
        email: profile?._json?.email,
        verified: profile?._json?.email_verified,
        // provider: profile?.provider,
        // providerUserId: profile?.id,
        // providerUserName: profile?.displayName,
        // providerPhoto: profile?._json.picture || null,
      };
      console.log("controller => ", data);
      const token = await jwt_helper.createToken(data);
      
      const finaltoken = await oauthService.createOauthService({...data, token});
      return done(null, finaltoken);
    } catch (error) {
      console.error("Error in Google Strategy:", error);
      return done(error);
    }
  }

  async FailedController(req, res) {
    try {
      // return res.status(201).json({
      //   message: "Failed to Login with Oauth",
      //   success: true,
      //   data: {},
      //   err: {},
      // });

      let Url = `http://localhost:5173/goggle/verify/failed/`;
      console.log(Url);
      res.redirect(Url);


    } catch (error) {
      console.log("Something went wrong in controller level (Failed Oauth)");
      // return res.status(201).json({
      //   message: "Failed to route ",
      //   success: false,
      //   data: {},
      //   err: {},
      // });

      let Url = `http://localhost:5173/goggle/verify/failed/`;
      console.log(Url);
      res.redirect(Url);

    }
  }

  async SucessController(req, res) {
    try {
      const token = req.query?.token;
      console.log(req.body);

      // res.status(200).json({
      //   message: "Sucessfull login with Oauth",
      //   success: true,
      //   data: token,
      //   err: {},
      // });

      // const data = {
      //   message: "Sucessfull login with Oauth",
      //   success: true,
      //   data: token,
      //   err: {},

      let Url = `http://localhost:5173/goggle/verify/${token}`;
      console.log(Url);
      res.redirect(Url);
    }

    catch (error) {
      console.log("Something went wrong in controller level (Sucess Oauth)");
      // return res.status(201).json({
      //   message: "Failed to route ",
      //   success: false,
      //   data: {},
      //   err: {},
      // });

      let Url = `http://localhost:5173/goggle/verify/failed/`;
      console.log(Url);
      res.redirect(Url);
    }
  }

  async ProtectedUrlController(req, res) {
    try {
      res.status(200).json({
        message: "Welcome to ProtectedUrlController",
        success: true,
        data: {},
        err: {},
      });
    } catch (error) {
      console.log(
        "Something went wrong in controller level (ProtectedUrlController)"
      );
      return res.status(201).json({
        message: "Failed to route ",
        success: false,
        data: {},
        err: {},
      });
    }
  }

  async VerifyTokenOauthController(req, res) {
    try {
      const token = req?.body?.token;
      const resonse = await jwt_helper.verifyToken(token);

      console.log('response => ', resonse);
      
      res.status(200).json({
        message: "Successfully Verified oauth token",
        success: true,
        data: resonse,
        err: {},
      });
    } catch (error) {
      console.log(
        "Something went wrong in controller level (ProtectedUrlController)"
      );
      return res.status(201).json({
        message: "Failed to route ",
        success: false,
        data: {},
        err: {},
      });
    }
  }
}

const oAuthController = new OauthController();
module.exports = oAuthController;
