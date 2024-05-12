import express from "express";
import { dividir, multiplicar, restar, sumar } from "./calcular.js";
import fs from 'fs'

const app = express();
const AMBIENTE = process.env.AMBIENTE || "NULL"
const API_KEY = fs.readFileSync('./Key.txt', 'utf8');
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hola mundo");
});

app.post("/calcular", (req, res) => {
  const operacion = req.body;
  if (operacion.operacion === "add") {
    return res.send({ resultado: sumar(operacion.num1, operacion.num2) });
  } else if (operacion.operacion === "min") {
    return res.send({ resultado: restar(operacion.num1, operacion.num2) });
  } else if (operacion.operacion === "div") {
    return res.send({ resultado: dividir(operacion.num1, operacion.num2) });
  } else if (operacion.operacion === "mul") {
    return res.send({ resultado: multiplicar(operacion.num1, operacion.num2) });
  }
  return res.send({ resultado: "hola mundo" });
});

app.get("/info", (req, res) => {
  res.send( `Ambiente: ${AMBIENTE}` );
});

app.get("/api", (req, res) => {
  res.send( `Key: ${API_KEY}` );
});

export default app;