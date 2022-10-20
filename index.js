const express = require("express");
const app = express();

app.use(express.json());

const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () =>
console.log(`Server running port ${PORT}`)
);
server.on("Error", (err) => console.log(`Error: ${err}`));

const Container = require("./container.js");
const products = new Container("products.txt");

app.get("/", (req, res) => {
  res.send("<h1>Server with Express</h1>");
});

app.get("/products", async (req, res) => {
  const showAll = await products.getAll();
  res.send({ "All products": showAll });
});

app.get("/productRandom", async (req, res) => {
  const prods = await products.getAll();
  const productRandomIndex = Math.floor(Math.random() * prods.length);
  res.send({ "Products Random": prods[productRandomIndex] });
});

//http://localhost:8080/greeting/dami
app.get("/greeting", (req, res) => {
  let person = req.query.person;
  res.send(`Hello ${person}`);
});

//http://localhost:8080/greeting?person=dami
app.get("/greeting/:name", (req, res) => {
  let person = req.params.name;
  res.send(`Hello ${person}`);
});
