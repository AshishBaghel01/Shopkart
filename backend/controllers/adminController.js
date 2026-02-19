import User from '../models/User.js';
import Product from '../models/Product.js';
import Order from '../models/Order.js';
import bcryptjs from 'bcryptjs';
import { asyncHandler } from '../middleware/errorHandler.js';
import { generateToken } from '../utils/tokenUtils.js';

// Admin Login
export const adminLogin = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password',
      });
    }

    // Check if admin credentials match
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      // Create or find admin user
      let adminUser = await User.findOne({ email });

      if (!adminUser) {
        // Create admin user if not exists
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        adminUser = new User({
          name: 'Admin',
          email,
          password: hashedPassword,
          isAdmin: true,
        });

        await adminUser.save();
      }

      const token = generateToken(adminUser._id, true);

      res.status(200).json({
        success: true,
        message: 'Admin login successful',
        token,
        user: {
          id: adminUser._id,
          name: adminUser.name,
          email: adminUser.email,
          isAdmin: true,
        },
      });
    } else {
      res.status(401).json({
        success: false,
        message: 'Invalid admin credentials',
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Get All Users (Admin)
export const getAllUsers = asyncHandler(async (req, res) => {
  try {
    const users = await User.find({ isAdmin: false }).select('-cartData');

    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Get Dashboard Stats (Admin)
export const getDashboardStats = asyncHandler(async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({ isAdmin: false });
    const totalProducts = await Product.countDocuments();
    const totalOrders = await Order.countDocuments();
    
    // Calculate total revenue from completed orders
    const orders = await Order.find({ payment: true });
    const totalRevenue = orders.reduce((sum, order) => sum + order.amount, 0);

    // Get recent orders
    const recentOrders = await Order.find()
      .populate('userId', 'name email')
      .sort({ createdAt: -1 })
      .limit(5);

    res.status(200).json({
      success: true,
      stats: {
        totalUsers,
        totalProducts,
        totalOrders,
        totalRevenue,
        recentOrders,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Delete User (Admin)
export const deleteUser = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    if (user.isAdmin) {
      return res.status(400).json({
        success: false,
        message: 'Cannot delete admin user',
      });
    }

    await User.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'User deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});
