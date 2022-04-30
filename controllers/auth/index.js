const { Op } = require("sequelize");
const passport = require("passport");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { models } = require("../../db");
const { generateJWTToken } = require("../../utils");

module.exports.register = (req, res, next) => {
  const { name, email, password, password2 } = req.body;
  // res.send(req.body);
  let errors = [];
  if (!name || !email || !password || !password2) {
    errors.push({ msg: "please fill in all fields" });
  }
  if (password !== password2) {
    errors.push({ msg: "passwords do not match" });
  }
  // if (username.length < 6) {
  //     errors.push({ msg: 'username should be at least 6 characters' })
  // }

  if (password.length < 6) {
    errors.push({ msg: "password should be at least 6 characters" });
  }
  if (errors.length > 0) {
    res.render("register", {
      errors,
      name,
      email,
      password,
      password2,
    });
  } else {
    //
    models["User"].findOne({ where: { email: email } }).then((user) => {
      if (user) {
        errors.push({ msg: "Email is already registered" });
        res.send(errors);
        // res.render("register", {
        //   errors,
        //   name,
        //   email,
        //   password,
        //   password2,
        // });
      } else {
        const newUser = models["User"].build({
          name,
          email,
          password,
        });
        console.log(newUser);
        // res.send('hello')
        //Hash Passoword
        bcrypt.genSalt(10, (err, salt) =>
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            //set password to hashed password
            newUser.password = hash;
            // res.send(newUser);
            //save user
            newUser
              .save()
              .then((user) => {
                res.json({ status: "success", data: newUser });
                //                req.flash("success_msg", "You are now registered");
                //                res.redirect("/users/login");
              })

              .catch((err) => {
                throw err;
                console.log(err);
              });
          })
        );
      }
    });

    //        res.send('pass')
  }
};
module.exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await models["User"].findOne({ where: { email: email } });

    if (!user) {
      return res
        .status(401)
        .send({ success: false, message: "that email is not registered" });
    }
    let passwordCorrect = false;
    //match password

    if (!bcrypt.compareSync(password, user.password)) {
      return res
        .status(401)
        .send({ success: false, message: "password incorrect " });
    }

    const payload = {
      id: user.id,
      email: user.email,
    };

    const token = await generateJWTToken(payload);
    return res.status(401).send({
      success: true,
      message: "Logged in successfully",
      token: token,
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports.logout = (req, res, next) => {};
