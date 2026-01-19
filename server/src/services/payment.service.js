class PaymentService {
  async createPaymentIntent({ amount, currency }) {
    // 🔁 Replace this with Stripe / Razorpay later
    return {
      id: "pi_mock_" + Date.now(),
      amount,
      currency,
      status: "requires_payment_method",
    };
  }
}

module.exports = new PaymentService();
