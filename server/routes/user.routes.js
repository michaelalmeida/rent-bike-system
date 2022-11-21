var express = require("express");
var router = express.Router();

var user_controller = require("../controllers/user.controller.js");

router.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

module.exports = function (app, passport) {
  app.get("/", user_controller.home);

  app.get("/profile", isLoggedIn, function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.json({
      success: true,
      status: req.user,
    });
  });

  app.get("/logout", function (req, res) {
    req.logout();
    res.status(202).send("Logout").end();
  });

  app.get("/login", function (req, res) {
    res.status(404).send("Not found").end();
  });

  app.post("/login", function (req, res, next) {
    passport.authenticate("local-login", function (err, user, info) {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(404).send("Not found").end();
      }
      req.logIn(user, function (err) {
        if (err) {
          return next(err);
        }
        return res.json(req.user);
      });
    })(req, res, next);
  });

  app.post("/signup", function (req, res, next) {
    passport.authenticate("local-signup", function (err, user, info) {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(404).send("User already exists!").end();
      }
      req.logIn(user, function (err) {
        if (err) {
          return next(err);
        }
        return res.json(req.user);
      });
    })(req, res, next);
  });

  app.get("/user/basicinfo", user_controller.getUserBasicInfo);

  app.patch("/user/rent", isLoggedIn, user_controller.rentBike);

  // app.patch("/user/return", isLoggedIn, user_controller.finishRental);
};

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
}