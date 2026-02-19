import Product from '../models/Product.js';
import cloudinary from '../config/cloudinary.js';
import upload from '../config/multer.js';
import { asyncHandler } from '../middleware/errorHandler.js';

// Add Product with Image Upload
export const addProduct = asyncHandler(async (req, res) => {
  try {
    const { name, description, price, category, subCategory, sizes, bestSeller } = req.body;

    if (!name || !description || !price || !category || !subCategory) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields',
      });
    }

    // Handle multiple image uploads
    let imageUrls = [];
    
    if (req.files && req.files.length > 0) {
      // Upload each file to Cloudinary
      const uploadPromises = req.files.map((file) => {
        return new Promise((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            {
              folder: 'forever-products',
              resource_type: 'image',
            },
            (error, result) => {
              if (error) {
                reject(error);
              } else {
                resolve(result.secure_url);
              }
            }
          );
          uploadStream.end(file.buffer);
        });
      });

      imageUrls = await Promise.all(uploadPromises);
    }

    const product = new Product({
      name,
      description,
      price: Number(price),
      images: imageUrls,
      category,
      subCategory,
      sizes: sizes ? JSON.parse(sizes) : [],
      bestSeller: bestSeller === 'true',
    });

    await product.save();

    res.status(201).json({
      success: true,
      message: 'Product added successfully',
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Get All Products
export const getProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Get Product by ID
export const getProductById = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Update Product
export const updateProduct = asyncHandler(async (req, res) => {
  try {
    const { name, description, price, category, subCategory, sizes, bestSeller, inStock } = req.body;

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    // Handle new image uploads if provided
    let imageUrls = product.images;
    
    if (req.files && req.files.length > 0) {
      const uploadPromises = req.files.map((file) => {
        return new Promise((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            {
              folder: 'forever-products',
              resource_type: 'image',
            },
            (error, result) => {
              if (error) {
                reject(error);
              } else {
                resolve(result.secure_url);
              }
            }
          );
          uploadStream.end(file.buffer);
        });
      });

      const newImages = await Promise.all(uploadPromises);
      imageUrls = [...imageUrls, ...newImages];
    }

    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price ? Number(price) : product.price;
    product.category = category || product.category;
    product.subCategory = subCategory || product.subCategory;
    product.sizes = sizes ? JSON.parse(sizes) : product.sizes;
    product.bestSeller = bestSeller !== undefined ? bestSeller === 'true' : product.bestSeller;
    product.inStock = inStock !== undefined ? inStock === 'true' : product.inStock;
    product.images = imageUrls;

    await product.save();

    res.status(200).json({
      success: true,
      message: 'Product updated successfully',
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Delete Product
export const deleteProduct = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    // Delete images from Cloudinary
    for (const imageUrl of product.images) {
      try {
        const publicId = imageUrl.split('/').pop().split('.')[0];
        await cloudinary.uploader.destroy(`forever-products/${publicId}`);
      } catch (error) {
        console.error('Error deleting image from Cloudinary:', error);
      }
    }

    await Product.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Product deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Get Products by Category
export const getProductsByCategory = asyncHandler(async (req, res) => {
  try {
    const { category } = req.params;
    const products = await Product.find({ category }).sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Get Best Sellers
export const getBestSellers = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find({ bestSeller: true }).sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});
