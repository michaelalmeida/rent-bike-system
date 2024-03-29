var express = require("express");

var bike_controller = require("../controllers/bike.controller.js");

module.exports = function (app) {
  app.get("/bikes", bike_controller.listAllBikes);

  app.post("/bike", bike_controller.createBike);

  app.patch("/bike/rent", bike_controller.rentBike);

  app.patch("/bike/return", bike_controller.returnBike);

  app.get("/bike/:id", bike_controller.readBike);

  app.get("/bike/last/:quantity", bike_controller.lastBikes);
};

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
}
