import mongoose from "mongoose";
import { password } from "./password.js";
import { schema } from "../Schemas/Schemas.js";
import { response } from "express";

const connectionString = `mongodb+srv://pcj:${password}@cluster0.qeq0ezr.mongodb.net/helloWorld?retryWrites=true&w=majority`;

mongoose.connection.on("error", (err) => {
  logError(err);
});

function connect() {
  mongoose
    .connect(connectionString)
    .then(() => {
      console.log("database connected");
      return true;
    })
    .catch((err) => {
      handleError(error);
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

async function deleteEmployee(id) {
  try {
    const Prueba = mongoose.model("Prueba", schema);
    return await Prueba.deleteOne(id).then((response) => {
      return response;
    });
  } catch (error) {
    console.error(error);
  }
}

async function getOneEmployee() {
  //una consulta que pueda buscar empleados con cualquier dato: email,genero, nombre, etc
}

export { getAllEmployees, deleteEmployee };
