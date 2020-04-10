import express from "express";
import graphqlHTTP from "express-graphql";
import cors from "cors";
import mongoose from "mongoose";
import compression from "compression";
import helmet from "helmet";

import schema from "./schema/schema.js";

const PORT = 4000;

const env = process.env.NODE_ENV || "dev";

const dev_db_url = `mongodb+srv://admin:admin@clusterfree-4nwij.mongodb.net/test?retryWrites=true&w=majority`;
const mongoDB = process.env.MONGODB_URI || dev_db_url;

mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.once("open", () => {
  console.log("INFO: Connected to DB'");
});

const app = express();

// Allow cross-origin request
if (env === "dev") app.use(cors());

app.use(compression()); //Compress all routes

app.use(helmet());

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
