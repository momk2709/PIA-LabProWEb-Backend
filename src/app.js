require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT;

app.use(express.json());

var baseDeDatos = [
  {
    nombre: "Emma",
    email: "ejemplo@gmail.com",
    contrasena: "perrito123",
  },
];

app.post("/auth/register", (req, res) => {
  try {
    const { nombre, apellido, email, contrasena, confirmacionContrasena } =
      req.body;
    if (contrasena != confirmacionContrasena) {
      throw new Error("Error 1");
    }
    res.send(req.body);
  } catch (error) {
    res.send(error.message);
    console.log(error);
  }
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
