"use strict";

const mongoose = require("mongoose");
const Product = mongoose.model("Product");

exports.get = (req, res, next) => {
  Product.find({}, "title price slug")
    .then(data => {
      res.status(200).send(data);
    })
    .catch(error => {
      res.status(400).send(error);
    });
};

exports.getById = (req, res, next) => {
  Product.findById(req.params.id)
    .then(data => {
      res.status(200).send(data);
    })
    .catch(error => {
      res.status(400).send(error);
    });
};

exports.getByTag = (req, res, next) => {
  Product.find(
    { tags: req.params.tag, active: true },
    "title description price slug tags"
  )
    .then(data => {
      res.status(200).send(data);
    })
    .catch(error => {
      res.status(400).send(error);
    });
};

exports.getBySlug = (req, res, next) => {
  Product.findOne(
    { slug: req.params.slug, active: true },
    "title description price slug tags"
  )
    .then(data => {
      res.status(200).send(data);
    })
    .catch(error => {
      res.status(400).send(error);
    });
};

exports.post = (req, res, next) => {
  const product = new Product(req.body);
  product
    .save()
    .then(x => {
      res.status(200).send({
        message: "Produto cadastrado com sucesso"
      });
    })
    .catch(error => {
      res.status(400).send({
        message: "Falha ao cadastrar o produto",
        data: error
      });
    });
};

exports.put = (req, res, next) => {
  const id = req.params.id;
  res.status(201).send({
    id: id,
    item: req.body
  });
};

exports.delete = (req, res, next) => {
  res.status(200).send(req.body);
};
