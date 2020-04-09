import express from "express";
import graphqlHTTP from "express-graphql";
import cors from "cors";
import mongoose from "mongoose";

import schema from "./schema/schema.js";

const PORT = 4000;
const DB_USER = "admin";
const DB_PASS = "admin";

mongoose.connect(
  `mongodb+srv://${DB_USER}:${DB_PASS}@clusterfree-4nwij.mongodb.net/test?retryWrites=true&w=majority`,
  { useNewUrlParser: true, useUnifiedTopology: true }
);

mongoose.connection.once("open", () => {
  console.log("INFO: Connected to DB");
});

const app = express();

// Allow cross-origin request
app.use(cors());

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
    // Options
  })
);

app.listen(PORT, () => {
  console.log(`INFO: Express started on port ${PORT}`);
});
