import { Request, Response } from "express";
import { db } from "../config/firebase";
import { NotFoundError } from "../errors/not-found-error";
import { stat } from "fs";
import { catchAsync } from "../middlewares/error-handler";

export const getUserData = catchAsync(async (req: Request, res: Response) => {
  const userId = req.params.id;
  if (!userId) {
    throw new NotFoundError("UserId");
  }

  const userDoc = await db.collection("users").doc(userId!).get();
  if (!userDoc.exists) {
    throw new NotFoundError("User");
  }
  const ordersOfUser = await db
    .collection("orders")
    .where("userId", "==", userId)
    .get();
  const userCart = await db.collection("carts").doc(userId).get();
  const productsDoc = await db.collection("products").get();
  const products = productsDoc.docs.map((doc) => doc.data());
  const cart = userCart.data();

  res.status(200).json({
    status: "success",
    message: "User data retrieved successfully",
    data: {
      userData: {
        id: userDoc.id,
        ...userDoc.data(),
      },
      orders: [...ordersOfUser.docs.map((doc) => doc.data())],
      cart: [cart],
      products,
    },
  });
});
