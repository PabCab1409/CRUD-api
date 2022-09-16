import express, { json, response } from "express";
import cors from "cors";
import { getAllEmployees, deleteEmployee } from "./db/mongoose.js";

const app = express();
app.use(cors());

const port = 1111;
const example = { name: "hello" };
app.get("/employees", (req, res) => {
  getAllEmployees().then((data) => {
    res.end(JSON.stringify(data));
  });
});
app.get("/main.html", (req, res) => {
  res.sendFile("main.html", { root: "../client/public/" });
});

app.get("/components/Employeer.js", (req, res) => {
  res.sendFile("Employeer.js", { root: "../client/components/" });
});

app.listen(port, "192.168.1.149", () => {
  console.log(`App listening on port ${port}`);
});

//DELETE
app.get("/delete/:last_name/", (req, res) => {
  deleteEmployee(req.params).then((response) => {
    if (response.deletedCount < 1) {
      res.status(500).send("Query not completed");
      res.end();
    } else {
      res.status(200).send(`Deleted user ${req.params.last_name}`);
      res.end();
    }
  });
});
