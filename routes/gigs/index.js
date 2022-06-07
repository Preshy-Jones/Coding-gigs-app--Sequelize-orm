const express = require("express");
const {
  getHello,
  getAllGigs,
  addGig,
  addGigView,
  search,
  getPaginatedGigs,
} = require("../../controllers/gigs");
const { models } = require("../../db");
const { paginatedResults } = require("../../middlewares/paginate");
const router = express.Router();

router.get("/paginated", paginatedResults(models["Gig"]), getPaginatedGigs);
router.get("/", getAllGigs);
router.post("/add", addGig);
router.get("/add", addGigView);
router.get("/search", search);
module.exports = router;
