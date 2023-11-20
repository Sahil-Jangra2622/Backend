const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

const task = require("./Routes/Task");
const user = require("./Routes/User");

app.use("/api/quick",task);
app.use("/api/quick",user);
module.exports = app;