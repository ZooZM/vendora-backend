import { Request, Response } from "express";
import { NotFoundError } from "../errors/not-found-error";
import { db } from "../config/firebase";
import { ProductCart } from "../models/productCart";
import { AppError, catchAsync } from "../middlewares/error-handler";

export const createOrderOfUserCart = catchAsync(
  async (req: Request, res: Response) => {
    const userId = req.params.id;
    const { address } = req.body;
    if (!userId) {
      throw new NotFoundError("UserId");
    }
    const userDoc = await db.collection("users").doc(userId).get();
    if (!userDoc.exists) {
      throw new NotFoundError("User");
    }
    const user = userDoc.data();
    if (!user) {
      throw new NotFoundError("User");
    }
    if (!user.address) {
      if (!address) {
        throw new NotFoundError("Address");
      }
      user.address = address;
      await userDoc.ref.update(user);
    }

    const cartDoc = await db.collection("carts").doc(userId).get();
    if (!cartDoc.exists) {
      throw new NotFoundError("Cart");
    }
    const cartData = cartDoc.data();
    if (!cartData) {
      throw new NotFoundError("CartData");
    }
    const products = cartData.products as ProductCart[];
    let totalPrice = 0;

    for (const product of products) {
      const producDoc = await db
        .collection("products")
        .doc(product.productId)
        .get();
      if (!producDoc.exists) {
        throw new NotFoundError(product.name);
      }
      const productData = producDoc.data();
      if (!productData) {
        throw new NotFoundError(product.name);
      }
      const productStock = productData.stock;
      if (productStock < product.quantity) {
        throw new AppError(
          `Not enough stock of this product: ${product.name}`,
          400
        );
      }
      producDoc.ref.update({
        stock: productStock - product.quantity,
      });
      totalPrice += product.price * product.quantity;
    }
    const orderRef = await db.collection("orders").add({
      userId: userId,
      items: products,
      totalPrice: totalPrice,
      status: "pending",
      phone: user.phone,
      shippingAddress: user.address,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    orderRef.update({ orderId: orderRef.id });
    await db.collection("carts").doc(userId).delete();
    res.status(200).json({
      status: "success",
      message: "Order created successfully",
      data: {
        orderId: orderRef.id,
      },
    });
  }
);
