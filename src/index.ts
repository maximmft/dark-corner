import "reflect-metadata";
import cors from "cors"
import express from "express";
import path from "path";
import { dataSource } from "./config/db";
import sqlite3 from "sqlite3";
import adsRouter from "./router/ads/router"
import categoryRouter from "./router/category/router"
import tagRouter from "./router/tags/router";
const db = new sqlite3.Database("./the-good-corner.sqlite");

const app = express();
app.use(cors());
app.use(express.json());
app.use('/images', express.static(path.join(__dirname, '../front-end/public/images')));

const port = 3000;

app.use("/ads", adsRouter);
app.use("/categories", categoryRouter);
app.use("/tags", tagRouter)

app.listen(port, async () => {
  await dataSource.initialize();
  console.log(`Example app listening on port ${port}`);
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

