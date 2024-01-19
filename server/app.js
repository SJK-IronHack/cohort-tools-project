const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const PORT = 5005;


// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
const app = express();

// MIDDLEWARE (Express.js functions)
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// HANDLE ROUTES (api, authentication, documentation)
const indexRoutes = require('./routes/index.routes.js')
app.use('/api', indexRoutes)

const authRoutes = require('./routes/auth.routes.js')
app.use('/auth', authRoutes)

app.get("/docs", (_, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});

// HANDLE ERRORS
require('./error-handling/error.js')(app)

// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

// CONNECT MONGOOSE TO DATABASE
mongoose
  .connect("mongodb://127.0.0.1:27017/cohort-tools-api")
  .then(x => console.log(`Connected to Database: "${x.connections[0].name}"`))
  .catch(err => console.error("Error connecting to MongoDB", err));
