import { Router } from "express";
import { createOrderOfUserCart } from "../controllers/orderController";

const router = Router();
router.post("/:id", createOrderOfUserCart);

export default router;
