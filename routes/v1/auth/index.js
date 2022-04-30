const express = require("express");
const passport = require("passport");
const { login, register } = require("../../../controllers/auth");
const ensureAuthenticated = require("../../../middlewares/auth");
const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.get("/protected", ensureAuthenticated, (req, res) => {
  return res.status(200).send({
    success: true,
    user: {
      id: req.user.id,
      email: req.user.email,
    },
  });
});

module.exports = router;
