import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { connectDB } from "./db/db";
import { generalRouter } from "./routes/general.routes";

dotenv.config();
connectDB();
const app = express();
app.use(express.json())

app.use('/', generalRouter)

app.listen(process.env.PORT, () => {
  console.log(`Server Connected, http://localhost:${process.env.PORT}`)
});