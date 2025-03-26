# API Gateway Microservice

This project is an API Gateway Microservice for the Authentication Service. It acts as a single entry point for all client requests.

## Features

### Rate Limiting

The API Gateway uses the `express-rate-limit` middleware to limit the number of requests a client can make within a specified time window. This helps to prevent abuse and ensure fair usage of the API.

```javascript
const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 2 * 60 * 1000, // 2 minutes
  max: 500, // Limit each IP to 500 requests per windowMs
});

app.use(limiter);
```

### Proxy Middleware

The API Gateway uses the `http-proxy-middleware` to proxy requests to the Authentication Service.

```javascript
const { createProxyMiddleware } = require("http-proxy-middleware");

const midle_proxy = createProxyMiddleware({
  target: "http://localhost:3003/api/v1/",
  changeOrigin: true,
  onProxyRes: function (proxyRes, req, res) {
    proxyRes.headers["Access-Control-Allow-Origin"] = "http://localhost:5173";
    proxyRes.headers["Access-Control-Allow-Credentials"] = "true";
  },
});

app.use("/authservice", midle_proxy);
```

### Logging

The API Gateway uses the `morgan` middleware to log HTTP requests.

```javascript
const morgan = require("morgan");

app.use(morgan("combined"));
```

### CORS

The API Gateway uses the `cors` middleware to enable Cross-Origin Resource Sharing. This allows the frontend application to make requests to the API Gateway from a different origin.

```javascript
const cors = require("cors");

app.use(
  cors({
    origin: "http://localhost:5173", // Replace with your frontend's origin
    credentials: true,
  })
);
```

## Getting Started

To start the API Gateway, run the following command:

```sh
npm start
```

The gateway will be running on [http://localhost:3000](http://localhost:3000).

## Packages Used

- `express`: Fast, unopinionated, minimalist web framework for Node.js
- `morgan`: HTTP request logger middleware for Node.js
- `http-proxy-middleware`: Node.js proxying made simple
- `express-rate-limit`: Basic rate-limiting middleware for Express
- `cors`: Node.js CORS middleware
- `nodemon`: Simple monitor script for use during development of a Node.js app

## Project Setup

- Clone the project on your local machine.
- Execute `npm install` in the root directory of the downloaded project.

## Contributing

Contributions to the API Gateway Microservice are welcome. If you find any issues or want to add new features, please open an issue or submit a pull request. Ensure that your code follows the established coding style and is well-documented.

## License

This project is licensed under the MIT License.

## Acknowledgments

We would like to acknowledge the following resources and libraries that contributed to the development of the API Gateway Microservice:

- Node.js: https://nodejs.org/
- Express: https://expressjs.com/
- Morgan: https://github.com/expressjs/morgan
- CORS: https://github.com/expressjs/cors
- HTTP Proxy Middleware: https://github.com/chimurai/http-proxy-middleware
- Express Rate Limit: https://github.com/nfriedly/express-rate-limit
- Nodemon: https://github.com/remy/nodemon