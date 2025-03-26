const cron = require("node-cron");
const {
  getPendingMailService,
  updateNotificationService,
  deleteService,
} = require("../Services/remainderService");
const { Sender } = require("../Config/EmailConfig");

const {
  welcomeEmail,
  forgetEmail,
  verifyEmail,
} = require("../utlis/emailTemplate/index");

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const setUptask = () => {
  cron.schedule("*/1 * * * * ", async () => {
    // every one minute

    try {
      const response = await getPendingMailService();
      let link;
      let emailType;

      for (const email of response) {
        if (email.typeMail == "FORGET") { 
          link = `http://localhost:3000/authservice/reset-password?token=${email.token}`;
          emailType = forgetEmail(email.username, link);
        }

        if (email.typeMail == "VERIFY") {
          link = ` http://localhost:3000/authservice/verify?token=${email.token}`;
          emailType = verifyEmail(email.username, link);
        }

        if (email.typeMail == "WELCOME") {
          emailType = welcomeEmail(email.username);
        }

        let mailoption = {
          from: "sarojc11345@gmail.com",
          to: email.recepientEmail,
          subject: email.subject,
          // html: emailTemplate(email.username, link),
          html: emailType,
        };

        // console.log("mailOption is = > ", mailoption);
        Sender.sendMail(mailoption, async (error, data) => {
          if (error) {
            console.error("Error sending email: ", error);
          } else {
            console.log("Email sent: ", data);
          }

          await updateNotificationService(email.id, "SUCCESS");
        });
        
        // Delay between sending emails to avoid rate limiting
        await delay(1000); // 1 second delay
        // await deleteService(email.id)
      }
    } catch (error) {
      console.log("Something Went wrong in job schedule");
      throw error;
    }
  });
};

module.exports = setUptask;
