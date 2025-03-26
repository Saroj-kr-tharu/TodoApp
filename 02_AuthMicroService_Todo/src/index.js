const express = require("express");
const { PassportCon } = require("./utlis/Passport");
const session = require("express-session");
const GoogleProvider = require("./utlis/GoogleStragy");
const appRoutes = require("./Routes/index");
const bodyParser = require("body-parser");
const db = require("./models/index");
const cors = require("cors");

const { PORT, DBSYNC, SESSION_SECRET } = require("./config/serverConfig");

const serverSetupAndStart = async () => {
  const app = express();
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  //   start of google Auth
  app.use(
    session({
      secret: SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
    })
  );
  app.use(
    cors({
      origin: "http://localhost:5173", // Replace with your frontend's origin
      credentials: true,
    })
  );

  app.use(PassportCon.initialize());
  app.use(PassportCon.session());
  PassportCon.use(GoogleProvider);

  app.use("/api", appRoutes);

  app.listen(PORT, async () => {
    console.log(`Server Started at ${PORT}`);

    // if (DBSYNC) {
    //   db.sequelize
    //     .sync({ alter: true })
    //     .then(() => console.log("Database synchronized successfully"))
    //     .catch((err) => console.error("Database synchronization failed:", err));
    // }
  });
};

serverSetupAndStart();
