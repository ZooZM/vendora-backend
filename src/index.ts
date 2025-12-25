import express, { Request, Response } from "express";
import { db } from "./config/firebase";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Test Route
app.get("/", (req: Request, res: Response) => {
  res.send("Vendora Backend is Running! 🚀");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
