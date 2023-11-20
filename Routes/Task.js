const express = require('express');
const { addTask, taskbystatus, taskbypriority, taskbyid, findallstatus } = require('../Controller/task');

const router = express.Router();

router.route("/addtask").post(addTask);
router.route("/gettask").get(taskbystatus);
router.route("/gettaskpriority").get(taskbypriority);
router.route("/taskbyid").get(taskbyid);
router.route("/getallstatus").get(findallstatus);

module.exports = router;

