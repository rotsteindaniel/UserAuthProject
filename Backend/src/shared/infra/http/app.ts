import "reflect-metadata";
import "dotenv/config";
import cors from "cors";
import express from "express";
import "express-async-errors";

import "@shared/container";

import { router } from "./routes";
import { errorMiddleware } from "./middlewares/error";

const app = express();


app.use(express.json());

app.use(cors());
app.use(router);

app.use(errorMiddleware)


export { app };
