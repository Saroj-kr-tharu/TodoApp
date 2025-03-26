const bcrypt = require("bcrypt");

const { salt } = require("../config/serverConfig");

class Bcrypt_helper_class {
  async checkPasswordService(plainpasword, hash) {
    try {
      const match = bcrypt.compareSync(plainpasword, hash);
      if (!match) throw "Password is not match";
      return match;
    } catch (error) {
      console.log(
        "Something went wrong in bcrypt helper layer (checkPasswordService)"
      );
      throw error;
    }
  }

  async generatePasswordService(password) {
    try {
      const hash = bcrypt.hashSync(password, salt);
      return hash;
    } catch (error) {
      console.log(
        "Something went wrong in bcrypt helper layer (generatePasswordService)"
      );
      throw error;
    }
  }
}

const bcryptHelper = new Bcrypt_helper_class();

module.exports = bcryptHelper;
