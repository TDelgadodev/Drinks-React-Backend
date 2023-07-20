var express = require("express");
const { register } = require("../controllers/authController");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.status(200).json({
    ok: true,
    message: "Connecting!",
  });
})

.post('/api/register',register)

module.exports = router;
