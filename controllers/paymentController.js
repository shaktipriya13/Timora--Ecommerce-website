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
    console.log("Order created:", order); // Debug log
    res.status(200).send({order});
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Failed to create order" });
  }
};
export const verifyPayment = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
        const secret = process.env.RAZORPAY_KEY_SECRET;

        const generatedSignature = crypto
            .createHmac("sha256", secret)
            .update(`${razorpay_order_id}|${razorpay_payment_id}`)
            .digest("hex");

        if (generatedSignature === razorpay_signature) {
            res.status(200).send({ success: true, message: "Payment verified successfully" });
        } else {
            res.status(400).send({ success: false, message: "Payment verification failed" });
        }
    } catch (error) {
        console.error("Verification error:", error);
        res.status(500).send({ success: false, error: "Verification failed", details: error.message });
    }
};