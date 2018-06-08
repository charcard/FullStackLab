"use strict";
const express = require("express");
const pg = require("pg");
const pool = require("./pg-connection-pool");
const cartList = express.Router();

cartList.get("/cart-items", (req, res) => {
  pool.query("SELECT * FROM ShoppingCart ORDER BY id").then((result) => {
    res.send(result.rows);
  });
});

cartList.post("/cart-items", (req, res) => {    
  pool.query("INSERT INTO ShoppingCart (product, price, quantity) VALUES($1::text, $2::int, $3::int)", [req.body.product, req.body.price, req.body.quantity]).then(() => {
      pool.query("SELECT * FROM ShoppingCart ORDER BY id").then((result) => {
          res.send(result.rows);
      });    
  });
});

cartList.delete("/cart-items/:id", (req, res) => {
  pool.query("DELETE FROM ShoppingCart WHERE id=$1::int", [req.params.id]).then(() => {
      pool.query("SELECT * FROM ShoppingCart ORDER BY id").then((result) =>{
          res.send(result.rows);
      }); 
  })
});

cartList.put("/cart-items/:id", (req, res) => {
  pool.query("UPDATE ShoppingCart SET product=$1::text, price=$2::smallint, quantity=$3::smallint WHERE id=$4::int", [req.body.product, req.body.price, req.body.quantity, req.params.id]).then(() => {
    pool.query("SELECT * FROM ShoppingCart ORDER BY id").then((result) => {
        res.send(result.rows);
    });
})
});

module.exports = cartList;
