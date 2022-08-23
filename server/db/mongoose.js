import mongoose from "mongoose";
import { password } from "./password.js";
import { schema } from "../Schemas/Schemas.js";

const connectionString = `mongodb+srv://pcj:${password}@cluster0.qeq0ezr.mongodb.net/helloWorld?retryWrites=true&w=majority`;

function connect() {
  mongoose
    .connect(connectionString)
    .then(() => {
      console.log("database connected");
    })
    .catch((err) => {
      console.log(err);
    });
}

async function getAllEmployees() {
  connect();

  const Prueba = mongoose.model("Prueba", schema);

  try {
    var data = await Prueba.find({});
    return data;
  } catch (error) {
    console.error(error);
  }
}

export { getAllEmployees };
