const express = require("express");
const router = express.Router();
const user = require("../controllers/userController");

router.get("/user", user.find);

router.post("/user", user.create);

router.patch("/user", user.update);

router.delete("/user", user.delete);

router.post("/userLogin", user.login);

module.exports = router;
