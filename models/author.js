import mongoose from "mongoose";

const { Schema } = mongoose;

export default mongoose.model(
  "Author",
  new Schema({
    age: Number,
    name: String,
  })
);
