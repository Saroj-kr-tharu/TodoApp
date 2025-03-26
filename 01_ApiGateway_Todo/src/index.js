const express = require("express");
const morgan = require("morgan");
const { createProxyMiddleware } = require("http-proxy-middleware");
const { default: rateLimit } = require("express-rate-limit");
const cors = require("cors");

const {AUTH_BACKEND_URL,FORTEND_URL,TODO_BACKEND_URL} = require("./serverConfig/serverConfig");

const app = express();
const PORT = 3000;

const limiter = rateLimit({
  windowMs: 2 * 60 * 1000,
  max: 50,
});

app.use(morgan("combined"));
app.use(limiter);



app.use(
  cors({
    origin: function (origin, callback) {
      const allowedOrigins = ['http://localhost:5173', 'http://fortend_todo_app:5173'];
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-access-token']
  })
);

const todo_midle_proxy = createProxyMiddleware({
  target: TODO_BACKEND_URL,
  changeOrigin: true,
  
});

const auth_midle_proxy = createProxyMiddleware({
  target: AUTH_BACKEND_URL,
  changeOrigin: true,
  onProxyRes: function (proxyRes, req, res) {
    proxyRes.headers["Access-Control-Allow-Origin"] = FORTEND_URL;
    proxyRes.headers["Access-Control-Allow-Credentials"] = "true";
  },
});



app.use("/authservice", auth_midle_proxy);
app.use("/todoService", todo_midle_proxy);

app.listen(PORT, () => {
  console.log(`Gateway running on http://localhost:${PORT}`);
});
