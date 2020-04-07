import express from "express";
import graphqlHTTP from "express-graphql";

import schema from "./schema/schema.js";

const PORT = 4000;

const app = express();

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
    // Options
  })
);

app.listen(PORT, () => {
  console.log(`Express started on port ${PORT}`);
});
