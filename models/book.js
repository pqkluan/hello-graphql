import mongoose from "mongoose";

const { Schema } = mongoose;

export default mongoose.model(
  "Book",
  new Schema({
    authorId: String,
    genre: String,
    name: String,
  })
);
