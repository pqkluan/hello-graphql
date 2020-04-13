const express = require("express");
const http = require("http");
const graphqlHTTP = require("express-graphql");
const cors = require("cors");

const compression = require("compression");
const helmet = require("helmet");

const schema = require("./schema/index");

const PORT = process.env.PORT || 4000;

// const dev_db_url = `mongodb+srv://admin:admin@clusterfree-4nwij.mongodb.net/test?retryWrites=true&w=majority`;
// const mongoDB = process.env.MONGODB_URI || dev_db_url;
// mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
// mongoose.connection.once("open", () => {
//   console.log("INFO: Connected to MongoDB");
// });

const app = express();

// Allow cross-origin request
app.use(cors());

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
