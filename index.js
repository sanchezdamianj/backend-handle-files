const express = require("express");
const routerProducts = require("./routes/productRoutes.js");

const PORT = process.env.PORT || 8080;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/api", routerProducts);

const server = app.listen(PORT, () =>
  console.log(`Server running on port:${PORT} `)
);
server.on("error", (errors) => console.log(`Errors are: ${errors}`));
