import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import Joi from "joi";
import joiObjectid from "joi-objectid";
import sectorRouter from "./routes/sector.route.js";
import companyRouter from "./routes/company.route.js";

const app = express();

mongoose
  .connect("mongodb://localhost:27017/tradeview")
  .then(() => {
    console.log("Connected to MongoDb");
  })
  .catch((err) => {
    console.error("Could not connect to MongoDB : ", err);
  });

app.use(express.json());

app.use(morgan("dev"));

Joi.objectId = joiObjectid(Joi);

app.get("/", (req, res) => {
  res.send("Welcome to the TradeView app");
});

app.use("/api/sectors", sectorRouter);
app.use("/api/companies", companyRouter);

const port = process.env.PORT || 3003;

app.listen(port, () => {
  console.log(`Server is listening on port ${port}...`);
});
