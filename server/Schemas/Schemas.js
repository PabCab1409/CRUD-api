import mongoose from "mongoose";
const schema = new mongoose.Schema({
  first_name: "string",
  lastn_name: "string",
  email: "string",
  gender: "string",
});

export { schema };
