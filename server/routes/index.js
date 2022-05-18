const express = require("express");
const router = express.Router();

const index_controller = require("../controllers/index/index.controller");

router.get("/", index_controller.test_route);

module.exports = router;