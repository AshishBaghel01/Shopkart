import User from '../models/User.js';
import { asyncHandler } from '../middleware/errorHandler.js';

// Add to Cart
export const addToCart = asyncHandler(async (req, res) => {
  try {
    const { itemId, size } = req.body;

    if (!itemId || !size) {
      return res.status(400).json({
        success: false,
        message: 'Please provide itemId and size',
      });
    }

    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    // Initialize cartData if not exists
    if (!user.cartData) {
      user.cartData = {};
    }

    // Add item to cart
    const key = `${itemId}-${size}`;
    if (user.cartData[key]) {
      user.cartData[key] += 1;
    } else {
      user.cartData[key] = 1;
    }

    await user.save();

    res.status(200).json({
      success: true,
      message: 'Item added to cart successfully',
      cartData: user.cartData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Get Cart
export const getCart = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    res.status(200).json({
      success: true,
      cartData: user.cartData || {},
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Remove from Cart
export const removeFromCart = asyncHandler(async (req, res) => {
  try {
    const { itemId, size } = req.body;

    if (!itemId || !size) {
      return res.status(400).json({
        success: false,
        message: 'Please provide itemId and size',
      });
    }

    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    const key = `${itemId}-${size}`;
    if (user.cartData && user.cartData[key]) {
      delete user.cartData[key];
      await user.save();
    }

    res.status(200).json({
      success: true,
      message: 'Item removed from cart successfully',
      cartData: user.cartData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Clear Cart
export const clearCart = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    user.cartData = {};
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Cart cleared successfully',
      cartData: user.cartData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Update Cart Item Quantity
export const updateCartQuantity = asyncHandler(async (req, res) => {
  try {
    const { itemId, size, quantity } = req.body;

    if (!itemId || !size || quantity === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Please provide itemId, size, and quantity',
      });
    }

    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    const key = `${itemId}-${size}`;
    if (user.cartData && user.cartData[key]) {
      if (quantity <= 0) {
        delete user.cartData[key];
      } else {
        user.cartData[key] = quantity;
      }
      await user.save();
    }

    res.status(200).json({
      success: true,
      message: 'Cart updated successfully',
      cartData: user.cartData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});
