"use strict";
const Product = require("../models/tours.model");
exports.findAll = function (req, res) {
  Product.findAll(function (err, Product) {
    // console.log("controller");
    if (err) res.send(err);
    // console.log("res", Product);
    res.send(Product);
  });
};
exports.create = function (req, res) {
  const new_Product = new Product(req.body);
  //handles null error
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res
      .status(400)
      .send({ error: true, message: "Please provide all required field" });
  } else {
    Product.create(new_Product, function (err, Product) {
      if (err) res.send(err);
      res.json({
        error: false,
        message: "Productadded successfully!",
        data: Product,
      });
    });
  }
};
exports.findById = function (req, res) {
  Product.findById(req.params.id, function (err, packageData) {
    if (err) {
      if (err.message === "Package not found") {
        res.status(404).json({ error: err.message });
      } else {
        res.status(500).json({ error: "Internal Server Error" });
      }
    } else {
      res.json(packageData);
    }
  });
};

exports.update = function (req, res) {
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res
      .status(400)
      .send({ error: true, message: "Please provide all required field" });
  } else {
    Product.update(
      req.params.id,
      new Product(req.body),
      function (err, Product) {
        if (err) res.send(err);
        res.json({ error: false, message: "Productsuccessfully updated" });
      }
    );
  }
};
exports.delete = function (req, res) {
  Product.delete(req.params.id, function (err, Product) {
    if (err) res.send(err);
    res.json({ error: false, message: "Productsuccessfully deleted" });
  });
};
