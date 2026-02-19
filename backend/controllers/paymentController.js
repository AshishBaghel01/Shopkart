import Stripe from 'stripe';
import Order from '../models/Order.js';
import User from '../models/User.js';
import { asyncHandler } from '../middleware/errorHandler.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Create Stripe Payment Intent
export const createStripePaymentIntent = asyncHandler(async (req, res) => {
  try {
    const { amount, orderId } = req.body;

    if (!amount) {
      return res.status(400).json({
        success: false,
        message: 'Please provide amount',
      });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency: 'usd',
      metadata: {
        orderId: orderId || '',
      },
    });

    res.status(200).json({
      success: true,
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Verify Stripe Payment
export const verifyStripePayment = asyncHandler(async (req, res) => {
  try {
    const { success, orderId } = req.body;

    if (success === 'true' || success === true) {
      const order = await Order.findByIdAndUpdate(
        orderId,
        { payment: true, status: 'Packing' },
        { new: true }
      );

      if (!order) {
        return res.status(404).json({
          success: false,
          message: 'Order not found',
        });
      }

      // Clear user's cart after successful payment
      await User.findByIdAndUpdate(order.userId, { cartData: {} });

      res.status(200).json({
        success: true,
        message: 'Payment verified successfully',
        order,
      });
    } else {
      res.status(400).json({
        success: false,
        message: 'Payment failed',
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Create Razorpay Order (stub - would need razorpay package)
export const createRazorpayOrder = asyncHandler(async (req, res) => {
  try {
    const { amount, orderId } = req.body;

    if (!amount) {
      return res.status(400).json({
        success: false,
        message: 'Please provide amount',
      });
    }

    // This is a stub - in production, you would use the razorpay package
    // to create an actual order
    const razorpayOrder = {
      id: 'razorpay_order_' + Date.now(),
      amount: amount * 100, // Convert to paise
      currency: 'INR',
      orderId: orderId || '',
    };

    res.status(200).json({
      success: true,
      razorpayOrder,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Verify Razorpay Payment (stub)
export const verifyRazorpayPayment = asyncHandler(async (req, res) => {
  try {
    const { success, orderId } = req.body;

    if (success === 'true' || success === true) {
      const order = await Order.findByIdAndUpdate(
        orderId,
        { payment: true, status: 'Packing' },
        { new: true }
      );

      if (!order) {
        return res.status(404).json({
          success: false,
          message: 'Order not found',
        });
      }

      // Clear user's cart after successful payment
      await User.findByIdAndUpdate(order.userId, { cartData: {} });

      res.status(200).json({
        success: true,
        message: 'Payment verified successfully',
        order,
      });
    } else {
      res.status(400).json({
        success: false,
        message: 'Payment failed',
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});
