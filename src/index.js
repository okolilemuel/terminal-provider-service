import dotenv from "dotenv";
dotenv.config();
import * as PubSub from './PubSub';
import express from "express";
import { postgraphile } from 'postgraphile';
const {PGHOST, PGUSER, PGDATABASE, PGPASSWORD, PGPORT} = process.env;

PubSub.receive();

const app = express();

app.use(
  postgraphile(
    `postgres://${PGUSER}:${PGPASSWORD}@${PGHOST}:${PGPORT}/${PGDATABASE}`,
    "public",
    {
    //   watchPg: true,
      graphiql: true,
      graphql: true,
      enhanceGraphiql: true,
    }
  )
);

app.listen(process.env.PORT || 3000);