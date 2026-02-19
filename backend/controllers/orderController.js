import Order from '../models/Order.js';
import User from '../models/User.js';
import { asyncHandler } from '../middleware/errorHandler.js';

// Create New Order
export const createOrder = asyncHandler(async (req, res) => {
  try {
    const { items, amount, address, paymentMethod } = req.body;

    if (!items || items.length === 0 || !amount || !address || !paymentMethod) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields',
      });
    }

    const order = new Order({
      userId: req.userId,
      items,
      amount,
      address,
      paymentMethod,
      payment: paymentMethod === 'stripe' || paymentMethod === 'razorpay' ? false : true,
    });

    await order.save();

    // Clear user's cart after placing order
    await User.findByIdAndUpdate(req.userId, { cartData: {} });

    res.status(201).json({
      success: true,
      message: 'Order placed successfully',
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Get User Orders
export const getUserOrders = asyncHandler(async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.userId }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Get All Orders (Admin)
export const getAllOrders = asyncHandler(async (req, res) => {
  try {
    const orders = await Order.find().populate('userId', 'name email').sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Get Order by ID
export const getOrderById = asyncHandler(async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('userId', 'name email');

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
      });
    }

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Update Order Status (Admin)
export const updateOrderStatus = asyncHandler(async (req, res) => {
  try {
    const { status } = req.body;

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
      });
    }

    order.status = status;
    await order.save();

    res.status(200).json({
      success: true,
      message: 'Order status updated successfully',
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Verify Stripe Payment
export const verifyStripe = asyncHandler(async (req, res) => {
  try {
    const { success, orderId } = req.params;

    if (success === 'true') {
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

// Cancel Order
export const cancelOrder = asyncHandler(async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
      });
    }

    // Only allow cancellation if order is not shipped or delivered
    if (order.status === 'Shipped' || order.status === 'Delivered') {
      return res.status(400).json({
        success: false,
        message: 'Cannot cancel order once shipped or delivered',
      });
    }

    order.status = 'Cancelled';
    await order.save();

    res.status(200).json({
      success: true,
      message: 'Order cancelled successfully',
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});
