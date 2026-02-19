# Shopkart E-Commerce Backend

## Project Structure

```
backend/
├── config/
│   ├── db.js              # MongoDB connection
│   ├── cloudinary.js      # Cloudinary configuration
│   └── multer.js          # File upload configuration
├── models/
│   ├── User.js            # User schema
│   ├── Product.js         # Product schema
│   └── Order.js           # Order schema
├── controllers/           # Business logic
├── routes/                # API endpoints
├── middleware/
│   ├── auth.js            # JWT authentication
│   └── errorHandler.js    # Error handling
├── utils/
│   └── tokenUtils.js      # Token generation utilities
├── server.js              # Express server setup
├── .env                   # Environment variables
├── .gitignore             # Git ignore rules
└── package.json           # Dependencies
```

## Setup Instructions

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Environment Variables
Already configured in `.env` file with the provided keys.

### 3. Start the Server

**Development Mode (with auto-restart):**
```bash
npm run dev
```

**Production Mode:**
```bash
npm start
```

The server will run on `http://localhost:4000`

## Technology Stack

- **Node.js & Express** - Server framework
- **MongoDB & Mongoose** - Database
- **JWT** - Authentication
- **Cloudinary** - Image hosting
- **Multer** - File upload handling
- **Stripe & Razorpay** - Payment integration

## Features Included

- ✅ MongoDB connection with Mongoose
- ✅ Express server with CORS and JSON parsing
- ✅ User model with authentication fields
- ✅ Product model with image and category support
- ✅ Order model with payment tracking
- ✅ JWT authentication middleware
- ✅ Admin authentication middleware
- ✅ Error handling middleware
- ✅ Cloudinary configuration
- ✅ Multer file upload configuration
- ✅ Token utility functions

## Next Steps

1. Create user authentication controllers (login, signup, logout)
2. Build product controllers (list, create, update, delete)
3. Implement cart management routes
4. Setup payment verification endpoints
5. Create order management system
6. Build admin routes for product and order management
