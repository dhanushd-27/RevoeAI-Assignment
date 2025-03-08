import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { connectDB } from "./db/db";
import { generalRouter } from "./routes/general.routes";
import cors from "cors";

dotenv.config();
connectDB();

const app = express();

app.use(express.json())
app.use(cors({
  origin: "http://localhost:3000", 
  credentials: true,
}));

app.use('/api/v1', generalRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server Connected, http://localhost:${process.env.PORT}`)
});