import express from "express";
import cors from "cors";
import { router } from "./routes";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(express.json());
app.use("/", router);

const PORT = process.env.PORT || 1238;

const server = app.listen(PORT, () => {
  console.log("Server running");
});
