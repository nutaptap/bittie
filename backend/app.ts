import express from "express";
import { router } from "./routes";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(express.json());
app.use("/", router);

const server = app.listen(1238, () => {
  console.log(`Server running http://localhost:1238`);
});
