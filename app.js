const express = require("express");
const app = express();
const path = require("path");
const db = require("./db/database");
const expressLayouts = require("express-ejs-layouts");
const passport = require("passport");
const port = process.env.PORT || 8009;

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.set("layout", "layouts/main");
app.use(expressLayouts);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(passport.initialize());
require("./middlewares/passport");
app.use(express.static("./public"));

app.use("/gigs", require("./routes/gigs"));
app.use("/v1", require("./routes/v1"));
app.use("/admin", require("./routes/admin/v1"));

app.get("/", (req, res) => {
  res.render("index", { layout: "layouts/landing" });
});

const dbConnect = async () => {
  try {
    await db.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

dbConnect();

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
