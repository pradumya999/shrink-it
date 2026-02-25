require("dotenv").config();
const express = require("express");
const path = require("path");
const cors = require("cors");
const helmet = require("helmet");
const signUp = require("./server/routes/signup.js");
const landing = require("./server/routes/landing.js");
const login = require("./server/routes/login.js");
const user = require("./server/routes/user.js");
const shrink = require("./server/url/shrink.js");
const redirect =require("./server/url/redirect.js");
const fetchurl = require("./server/routes/fetchurl.js");
const qrcode = require("./server/url/qrcode.js");
const logout = require("./server/routes/logout.js");
const connectDB = require("./server/config/db.js");

connectDB();

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(helmet());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", landing);
app.use("/", user);
app.use("/", fetchurl);
app.use("/", signUp);
app.use("/", login);
app.use("/", shrink);
app.use("/", redirect);
app.use("/", qrcode);
app.use("/", logout);

module.exports = app;