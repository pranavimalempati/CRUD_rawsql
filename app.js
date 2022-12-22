const { client } = require("./db");

const express = require("express");
const main = express();
const router = require("./router/router");

require("dotenv").config();

const body_parser = require("body-parser");
const cors = require("cors");

main.use(body_parser.urlencoded({ extended: true }));
main.use(body_parser.json());
main.use("/", router);
main.use(cors());

async function run() {
  await client.connect();
  console.log(`datasource initialized...`);
  main.listen(process.env.PORT, () => {
    console.log('server running at port',process.env.PORT);
  });
}
run();
