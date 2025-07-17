// controllers/paymentController.js
import Razorpay from "razorpay";
import crypto from "crypto";

export const createOrder = async (req, res) => {
  try {
    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const options = {
      amount: req.body.amount * 100, // amount in paise
      currency: "INR",
      receipt: `receipt_order_${Math.floor(Math.random() * 10000)}`,
    };

    const order = await instance.orders.create(options);
    res.status(200).send(order);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Failed to create order" });
  }
};
