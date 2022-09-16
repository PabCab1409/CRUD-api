import mongoose from "mongoose";
const schema = new mongoose.Schema({
  first_name: { type: String },
  lastn_name: { type: String },
  email: { type: String },
  gender: { type: String },
});

export { schema };
