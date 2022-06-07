const db = require("../../db/database");
const Gig = require("../../db/models/gig");
const { Op } = require("sequelize");

const { models } = require("../../db");

module.exports.getHello = async (req, res, next) => {
  res.send("hello jones");
};

module.exports.getAllGigs = async (req, res, next) => {
  try {
    const gigs = await models["Gig"].findAll();
    console.log(gigs);
    res.render("gigs", { gigs });
    //res.sendStatus(200);
  } catch (err) {
    console.log(err);
  }
};

module.exports.getPaginatedGigs = async (req, res, next) => {
  res.json(res.paginatedResults);
};

module.exports.addGig = async function (req, res, next) {
  let { title, technologies, budget, description, contact_email } = req.body;
  let errors = [];
  if (!title) {
    errors.push({ text: "Please add a title" });
  }
  if (!description) {
    errors.push({ text: "Please add a description" });
  }
  if (!technologies) {
    errors.push({ text: "Please add some technologies" });
  }
  if (!contact_email) {
    errors.push({ text: "Please add a contact email" });
  }

  // res.send(req.body);
  try {
    if (errors.length > 0) {
      res.render("add", {
        errors,
        title,
        technologies,
        budget,
        description,
        contact_email,
      });
    } else {
      if (!budget) {
        budget = "Unknown";
      } else {
        budget = `$${budget}`;
        technologies = technologies.toLowerCase().replace(/,/g, ",");
      }
      const gig = models["Gig"].build();
      gig.title = title;
      gig.budget = budget;
      gig.description = description;
      gig.contact_email = contact_email;
      gig.technologies = technologies;
      await gig.save();
      res.redirect("/gigs");
      // res.sendStatus(200);
    }
  } catch (error) {
    console.log(err);
  }
};

module.exports.addGigView = (req, res, next) => {
  let title;
  let description;
  let contact_email;
  let budget;
  let technologies;
  let errors;
  res.render("add", {
    errors,
    title,
    description,
    contact_email,
    budget,
    technologies,
  });
};

module.exports.search = async (req, res, next) => {
  let { term } = req.query;
  term = term.toLowerCase();

  try {
    const results = await models["Gig"].findAll({
      where: { technologies: { [Op.like]: "%" + term + "%" } },
    });
    res.render("gigs", { gigs: results });
  } catch (error) {
    console.log(error);
  }
};
