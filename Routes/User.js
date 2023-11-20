const express = require('express');
const { addUser, gettask, getUser, getall } = require('../Controller/user');

const router = express.Router();

router.route("/adduser").post(addUser);
router.route("/task").get(getall);
router.route("/getuser").get(getUser);

module.exports = router;

