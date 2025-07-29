import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Welcome to the TradeView app");
});

const port = process.env.PORT || 3003;

app.listen(port, () => {
  console.log(`Server is listening on port ${port}...`);
});
