const express = require("express");
const {
  getHello,
  getAllGigs,
  addGig,
  addGigView,
  search,
} = require("../../controllers/gigs");
const router = express.Router();

router.get("/", getAllGigs);
router.post("/add", addGig);
router.get("/add", addGigView);
router.get("/search", search);
module.exports = router;
