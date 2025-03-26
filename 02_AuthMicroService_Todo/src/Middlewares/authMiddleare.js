const { jwt_helper } = require("../utlis/jwtHelps")

const deleteSessionValidation = (req, res, next) => {
  if (!req.session) {
    console.log("Something went wrong in Oauth middleware");
    return res.status(400).json({
      data: {},
      err: "Session is missing",
      message: "Session  is missing  ",
      success: false,
    });
  }
  console.log(req.session);

  // next();
};

const signupandSinginandValidation = (req, res, next) => {
  if (!req.body.email || !req.body.password) {
    console.log("Something went wrong in auth middleware");
    return res.status(400).json({
      data: {},
      // err: error || error.message,
      message: "Email or Password is missing  ",
      success: false,
    });
  }

  next();
};

const deleteValidation = (req, res, next) => {
  if (!req.body.email) {
    console.log("Something went wrong in auth middleware");
    return res.status(400).json({
      data: {},
      err: "Email is missing",
      message: "Email  is missing  ",
      success: false,
    });
  }

  next();
};

const roleValidation = (req, res, next) => {
  if (!req.body.email || !req.body.role) {
    console.log("Something went wrong in role or Role middleware");
    return res.status(400).json({
      data: {},
      err: "Email or Role is missing",
      message: "Email or Role  is missing  ",
      success: false,
    });
  }

  next();
};

const hasRoleValidation = (req, res, next) => {
  if (!req.body.email) {
    console.log("Something went wrong in hasRole");
    return res.status(400).json({
      data: {},
      err: "Email  is missing",
      message: "Email   is missing  ",
      success: false,
    });
  }

  next();
};

const tokenVerifyValidation = (req, res, next) => {
  // const token = req.header("x-access-token");
  // console.log(req.header("x-access-token"));
  
  if (!req.header("x-access-token")) {
    console.log("Something went wrong in VerifyToken");
    return res.status(400).json({
      data: {},
      err: "Token is missing",
      message: "Token   is missing  ",
      success: false,
    });
  }
  next();
};

const verifyTokenMiddleware = async(req, res, next) => {
  try {
    const token = req?.query?.token;
    console.log('token => ', token);

    if (!token) {
      console.log("Something went wrong in reset token validation");
      return res.status(400).json({
        data: {},
        err: "Required token is missing",
        message: "Required token is missing",
        success: false,
      });
    }

    const response = await jwt_helper.verifyToken(token);

    if (!response) {
      return res.status(400).json({
        data: {},
        err: "Invalid token",
        message: "Invalid token",
        success: false,
      });
    }

    next();
  } catch (error) {
    console.log("Error in verifyTokenMiddleware:", error);
    return res.status(500).json({
      data: {},
      err: error.message,
      message: "Internal server error",
      success: false,
    });
  }
};

const verifyTokenBodyMiddleware = async(req, res, next) => {
  try {
    const token = req?.body?.token;
    console.log('token => ', token);

    if (!token) {
      console.log("Something went wrong in reset token validation");
      return res.status(400).json({
        data: {},
        err: "Required token is missing",
        message: "Required token is missing",
        success: false,
      });
    }

    const response = await jwt_helper.verifyToken(token);

    if (!response) {
      return res.status(400).json({
        data: {},
        err: "Invalid token",
        message: "Invalid token",
        success: false,
      });
    }

    next();
  } catch (error) {
    console.log("Error in verifyTokenMiddleware:", error);
    return res.status(500).json({
      data: {},
      err: error.message,
      message: "Internal server error",
      success: false,
    });
  }
};


const changePassValidation = (req, res, next) => {
  if (!req.body.email || !req.body.newPassword || !req.body.oldPassword) {
    console.log("Something went wrong in change Pass validation ");
    return res.status(400).json({
      data: {},
      err: "Required parameter is missing",
      message: "Required parameter  is missing  ",
      success: false,
    });
  }
  next();
};

const resetPassValidation = (req, res, next) => {
  if (!req.query.token || !req.body.password) {
    console.log("Something went wrong in reset Pass validation ");
    return res.status(400).json({
      data: {},
      err: "Required parameter is missing",
      message: "Required parameter  is missing  ",
      success: false,
    });
  }
  next();
};

const sendResetValidation = (req, res, next) => {
  if (!req.body.email) {
    console.log("Something went wrong in reset sendResetLink validation ");
    return res.status(400).json({
      data: {},
      err: "Required parameter is missing",
      message: "Required parameter  is missing  ",
      success: false,
    });
  }
  next();
};

const sendLinkVerifyValidation = (req, res, next) => {
  if (!req.body.email) {
    console.log("Something went wrong in reset sendLinkVerifyValidation validation ");
    return res.status(400).json({
      data: {},
      err: "Required parameter is missing",
      message: "Required parameter  is missing  ",
      success: false,
    });
  }
  next();
};

const verifyResetValidation = (req, res, next) => {
  if (!req.query.token) {
    console.log("Something went wrong in reset verifyResetLink validation ");
    return res.status(400).json({
      data: {},
      err: "Required parameter is missing",
      message: "Required parameter  is missing  ",
      success: false,
    });
  }
  next();
};

const verifyValidation = (req, res, next) => {
  if (!req.query.token) {
    console.log("Something went wrong in reset verifyValidation validation ");
    return res.status(400).json({
      data: {},
      err: "Required parameter is missing",
      message: "Required parameter  is missing  ",
      success: false,
    });
  }
  next();
};

module.exports = {
  signupandSinginandValidation,
  deleteValidation,
  roleValidation,
  hasRoleValidation,
  deleteSessionValidation,
  tokenVerifyValidation,
  changePassValidation,
  resetPassValidation,
  sendResetValidation,
  verifyResetValidation,
  sendLinkVerifyValidation,
  verifyValidation,
  verifyTokenMiddleware,
  verifyTokenBodyMiddleware
};
