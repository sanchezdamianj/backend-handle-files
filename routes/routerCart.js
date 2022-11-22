const express = require("express");
const { addCart, deleteCart, getProducts, addProductToCart, deleteProduct } = require("../controllers/controllerCart.js");
const routerCarts = express.Router();

//Add a cart
routerCarts.post('/', (req, res) => addCart(req, res));

//Delete cart
routerCarts.delete('/:id', (req, res) => deleteCart(req, res));

//Get products form an specific cart
routerCarts.get('/:id/products', (req, res) => getProducts(req, res));

//Add a product to a cart
routerCarts.post('/:id/products', (req, res) => addProductToCart(req, res));

//Delete a product from a cart
routerCarts.delete('/:id/products/:id_prod', (req, res) => deleteProduct(req, res));

module.exports = routerCarts