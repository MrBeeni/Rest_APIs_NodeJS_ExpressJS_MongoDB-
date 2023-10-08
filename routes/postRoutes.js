const express = require("express");
const router = express.Router();
const verfy = require("../middleware/verifyToken");

router.get("/posts", verfy, (req, res) => {
  res.status(200).json({
    post: {
      title: "secret",
      descreption: "veryyyy confidiential data",
    },
  });
});

module.exports = router;
