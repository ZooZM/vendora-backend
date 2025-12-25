import express, { Request, Response } from "express";
import userRoutes from "./routes/userRoutes";
import orderRoutes from "./routes/orderRoutes";
import "express-async-errors";
import { db } from "./config/firebase";
import { errorHandler } from "./middlewares/error-handler";
import { NotFoundError } from "./errors/not-found-error";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Vendora Backend is Running! 🚀");
});
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);

app.all("*", async (req, res) => {
  throw new NotFoundError("Route");
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
