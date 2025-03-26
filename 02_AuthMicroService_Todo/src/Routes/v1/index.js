const express = require("express");
const { PassportCon } = require("../../utlis/Passport");

const {
  deleteValidation,
  signupandSinginandValidation,
  roleValidation,
  hasRoleValidation,
  tokenVerifyValidation,
  changePassValidation,
  resetPassValidation,
  sendResetValidation,
  verifyResetValidation,
  sendLinkVerifyValidation,
  verifyValidation,
  verifyTokenMiddleware,
  verifyTokenBodyMiddleware
} = require("../../Middlewares/authMiddleare");

const {
  oAuthController,
  verifyController,
  resetController,
  authController,
} = require("../../Controllers/index");

const router = express.Router();

router.get("/info", (req, res) => {
  return res.json({ message: "Response from routes booking service" });
});

router.get(
  "/auth/google",
  PassportCon.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get(
  "/auth/google/callback",
  PassportCon.authenticate("google", {
    failureRedirect: "http://auth_microservice_todo:3003/api/v1/failed",
  }),
  async (req, res) => {
    const user = await req.user;
    await req.logout(() => {
      console.log("Logout success");
    });

    res.redirect("http://auth_microservice_todo:3003/api/v1/success?token=" + user);
  }
);

router.get("/failed", oAuthController.FailedController);
router.get("/success", oAuthController.SucessController);
router.get(
  "/protected",
  tokenVerifyValidation,
  oAuthController.ProtectedUrlController
);

router.post(
  "/verifyBodyToken",
  verifyTokenBodyMiddleware,
  oAuthController.VerifyTokenOauthController
);





router.post(
  "/signup",
  signupandSinginandValidation,
  authController.signupContro
);
router.post(
  "/signin",
  signupandSinginandValidation,
  authController.signinContro
);
router.post(
  "/authenticate",
  tokenVerifyValidation,
  authController.isAuthenticatedContrr
);
router.post("/checkRole", roleValidation, authController.checkRoleContro);
router.post("/addRole", roleValidation, authController.addRoleContro);

router.post(
  "/changepassword",
  verifyTokenMiddleware,
  changePassValidation,
  authController.changePassContro
);

router.get("/getAllRole", hasRoleValidation, authController.getAllRoleContro);
router.delete("/delete", deleteValidation, authController.deleteContro);

router.post("/publishMsg", authController.sendMsgToQueueContro);

//verification
// router.post("/createVerification", verifyController.createVerifyContro);
// router.post("/updateVerification", verifyController.updateVerifyContro);
// router.delete("/deleteVerification", verifyController.deleteVerifyContro);
// router.get("/getAllVerification", verifyController.readAllVerifyContro);

router.post(
  "/sendVerification",
  verifyTokenMiddleware,
  sendLinkVerifyValidation,
  verifyController.sendVerifyContro
);
router.get("/verify", verifyValidation, verifyController.verifyVerifyContro);

//RestToken
// router.post("/createRestToken", resetController.createResetContro);
// router.post("/updateRestToken", resetController.updateResetContro);
// router.get("/getAllRestToken", resetController.readAllResetContro);
// router.delete("/deleteRestToken", resetController.deleteResetContro);

router.post(  // send reset link 
  "/sendResetLink",
  
  sendResetValidation,
  resetController.sendResetLinkContro
);
router.post(  // reset the password or change the password
  "/resetPassword",
  resetPassValidation,
  resetController.ResetPasswordContro
);
router.get(  // verify the reset link is valid or not 
  "/reset-password",
  verifyResetValidation,
  resetController.verifyResetLinkContro
);

module.exports = router;
