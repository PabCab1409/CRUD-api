import express from "express";
import cors from "cors";
import { getAllEmployees } from "./db/mongoose.js";

const app = express();
app.use(cors());

const port = 5555;

app.get("/employees", (req, res) => {
  getAllEmployees().then((data) => {
    res.end(JSON.stringify(data));
  });
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
