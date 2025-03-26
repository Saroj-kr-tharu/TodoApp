const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    FORTEND_URL: process.env.FORTEND_URL,
    AUTH_BACKEND_URL: process.env.AUTH_BACKEND_URL,
    TODO_BACKEND_URL: process.env.TODO_BACKEND_URL,
}