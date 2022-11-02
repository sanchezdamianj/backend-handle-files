const router = require("express").Router();
const { Product, products } = require("../productsClass.js");

router.get("/products", (req, res) => {
  res.json({ products });
});

router.get("/products/:id", (req, res) => {
  let product = products.find(
    (product) => product.id === Number(req.params.id)
  );
  product
    ? res.send(product)
    : res.status(404).send({ error: "Product not found in the store" });
});

router.post("/products", (req, res) => {
  let { title, price, thumbnail } = req.body;
  const product = { title, price, thumbnail };
  product.id = products.length + 1;
  products.push(product);
  res.send(products);
});

router.put("/products/:id", (req, res) => {
  let { title, price, thumbnail } = req.body;
  let posIndex = products.findIndex(
    (product) => product.id === Number(req.params.id)
  );
  if (posIndex >= 0) {
    products[posIndex] = { title, price, thumbnail };
    products[posIndex].id = Number(req.params.id);
    res.send(products[posIndex]);
  } else {
    res.status(404).send({ error: "Product can not be updated" });
  }
});

router.delete("/products/:id", (req, res) => {
  let pos = products.findIndex(
    (product) => product.id === Number(req.params.id)
  );
  pos >= 0
    ? products.splice(pos, 1) && res.send({ message: "Product deleted" })
    : res.status(404).send({ error: "Product can not be deleted" });
});

module.exports = router;
