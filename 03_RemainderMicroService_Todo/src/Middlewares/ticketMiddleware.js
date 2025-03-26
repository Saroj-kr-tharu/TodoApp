const createValidator = (req, res, next) => {
  if (
    !req.body.subject ||
    !req.body.content ||
    !req.body.recepientEmail ||
    !req.body.notificationTime
  ) {
    return res.status(400).json({
      message: "Required Parameter is Missing",
      success: false,
      data: {},
      err: "Parameter is Missing",
    });
  }

  next();
};

const getByIdValidator = (req, res, next) => {
  if (!req.query.id) {
    return res.status(400).json({
      message: "Id Parameter is Missing",
      success: false,
      data: {},
      err: "Id Parameter is Missing",
    });
  }

  next();
};

const deleteValidator = (req, res, next) => {
  if (!req.body.id) {
    return res.status(400).json({
      message: "Id Parameter is Missing",
      success: false,
      data: {},
      err: "Id Parameter is Missing",
    });
  }

  next();
};

const updateValidator = (req, res, next) => {
  if (!req.query.id) {
    return res.status(400).json({
      message: "Id Parameter is Missing",
      success: false,
      data: {},
      err: "Id Parameter is Missing",
    });
  }

  next();
};

const rangeValidator = (req, res, next) => {
  if (!req.body.startDate || !req.body.endDate) {
    return res.status(400).json({
      message: "Date Parameter is Missing",
      success: false,
      data: {},
      err: "Date Parameter is Missing",
    });
  }

  next();
};

module.exports = {
  createValidator,
  getByIdValidator,
  deleteValidator,
  updateValidator,
  rangeValidator
};
