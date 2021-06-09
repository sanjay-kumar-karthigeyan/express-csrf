const express = require("express");
const app = express();
const csrf = require("csurf");
const cookieParser = require("cookie-parser");

app.use(cookieParser());
app.use(
  csrf({
    cookie: true,
  })
);
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization, Airport"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.get("/api/getToken", (req, res, next) => {
  try {
    const csrfTokenToSendToFrontEnd = req.csrfToken();
    console.log("csrfTokenToSendToFrontEnd:", csrfTokenToSendToFrontEnd);
    res.cookie("XSRF-TOKEN", csrfTokenToSendToFrontEnd, {
      httpOnly: false,
      secure: false,
    });
    res.status(200).json({
      token: csrfTokenToSendToFrontEnd,
      message: "get token from server",
    });
  } catch (error) {
    res.status(400);
  }
});

app.post("/api/checkToken", (req, res, next) => {
  try {
      console.log("req",req.cookies)
    res.status(200).json({
      token: req.cookies,
      message: "get token from server",
    });
  } catch (error) {
    res.status(400);
  }
});

app.listen("3000", () => {
  console.log("server connection established");
});
