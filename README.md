# Forever E-Commerce Platform - MERN Stack

A modern, full-stack e-commerce application built with MongoDB, Express, React, and Node.js. Features include user authentication, product management, shopping cart, order management, and integrated payment processing with Stripe and Razorpay.

## 📁 Project Structure

```
E-Commerce/
├── backend/          # Node.js/Express API
├── frontend/         # React customer application
├── admin/            # React admin dashboard
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v16+)
- MongoDB Atlas account
- Cloudinary account for image hosting
- Stripe and Razorpay API keys

### Installation

#### 1. Backend Setup
```bash
cd backend
npm install
```

Create `.env` file with required variables (see backend/.env.example)

```bash
npm run dev
```

Server runs on `http://localhost:4000`

#### 2. Frontend Setup
```bash
cd frontend
npm install
```

Create `.env` file:
```
VITE_BACKEND_URL=http://localhost:4000
```

```bash
npm run dev
```

App runs on `http://localhost:5173`

#### 3. Admin Dashboard Setup
```bash
cd admin
npm install
```

Create `.env` file:
```
VITE_BACKEND_URL=http://localhost:4000
```

```bash
npm run dev
```

Admin runs on `http://localhost:5174`

## 🔑 Key Features

### Backend
- **User Authentication**: JWT-based authentication with bcryptjs password hashing
- **Product Management**: CRUD operations with Cloudinary image uploads
- **Cart Management**: Persistent cart storage in MongoDB
- **Order Management**: Complete order lifecycle tracking
- **Payment Processing**: Stripe and Razorpay integration
- **Admin Dashboard**: Comprehensive admin controls
- **Error Handling**: Global error middleware and validation

### Frontend
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Shopping Cart**: Real-time cart updates with server sync
- **Product Search & Filter**: Search, category filtering, and sorting
- **User Authentication**: Login/signup with token persistence
- **Order Tracking**: View order status and history
- **Payment Integration**: Stripe and Razorpay checkout

### Admin
- **Dashboard**: Real-time stats and analytics
- **Product Management**: Add, edit, delete products
- **Order Management**: Update order status and track shipments
- **User Management**: View and manage user accounts
- **Revenue Tracking**: Track sales and revenue

## 📋 API Endpoints

### User Routes (`/api/users`)
- `POST /signup` - Register new user
- `POST /login` - User login
- `POST /logout` - User logout
- `GET /profile` - Get user profile (protected)
- `PUT /profile` - Update user profile (protected)

### Product Routes (`/api/products`)
- `GET /list` - Get all products
- `GET /list/:id` - Get product by ID
- `GET /category/:category` - Get products by category
- `GET /best-sellers` - Get best-selling products
- `POST /add` - Add product (admin only)
- `PUT /update/:id` - Update product (admin only)
- `DELETE /delete/:id` - Delete product (admin only)

### Cart Routes (`/api/cart`)
- `POST /add` - Add item to cart (protected)
- `GET /` - Get cart items (protected)
- `PUT /update` - Update quantity (protected)
- `PUT /remove` - Remove item (protected)
- `DELETE /clear` - Clear cart (protected)

### Order Routes (`/api/orders`)
- `POST /create` - Create order (protected)
- `GET /user` - Get user orders (protected)
- `GET /user/:id` - Get order details (protected)
- `PUT /:id/cancel` - Cancel order (protected)
- `GET /admin/list` - Get all orders (admin only)
- `PUT /admin/:id/status` - Update order status (admin only)
- `GET /verify/:success/:orderId` - Verify payment

### Payment Routes (`/api/payment`)
- `POST /stripe/create-intent` - Create Stripe payment intent
- `POST /stripe/verify` - Verify Stripe payment
- `POST /razorpay/create-order` - Create Razorpay order
- `POST /razorpay/verify` - Verify Razorpay payment

### Admin Routes (`/api/admin`)
- `POST /login` - Admin login
- `GET /users` - Get all users (admin only)
- `GET /dashboard` - Get dashboard stats (admin only)
- `DELETE /users/:id` - Delete user (admin only)

## 🗄️ Database Models

### User
```
- name (String)
- email (String, unique)
- password (String, hashed)
- address, city, state, zipCode
- phoneNumber
- cartData (Object)
- isAdmin (Boolean)
- timestamps
```

### Product
```
- name (String)
- description (String)
- price (Number)
- images (Array of URLs)
- category, subCategory
- sizes (Array: XS, S, M, L, XL, XXL)
- bestSeller (Boolean)
- inStock (Boolean)
- rating, reviews
- timestamps
```

### Order
```
- userId (Reference to User)
- items (Array of product details)
- amount (Number)
- address (Object)
- status (String)
- paymentMethod
- payment (Boolean)
- paymentId
- date
- timestamps
```

## 🔐 Environment Variables

### Backend (.env)
```
PORT=4000
NODE_ENV=development

# MongoDB
MONGODB_URI=your_mongodb_connection_string

# Cloudinary
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_SECRET_KEY=your_secret_key

# JWT
JWT_SECRET=your_jwt_secret

# Admin Credentials
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=admin_password

# Payment Gateway
STRIPE_SECRET_KEY=your_stripe_key
RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret
```

### Frontend (.env)
```
VITE_BACKEND_URL=http://localhost:4000
```

### Admin (.env)
```
VITE_BACKEND_URL=http://localhost:4000
```

## 🎨 Technology Stack

### Backend
- **Node.js** - Runtime
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Bcryptjs** - Password hashing
- **Cloudinary** - Image hosting
- **Multer** - File uploads
- **Stripe** - Payment processing

### Frontend
- **React 18** - UI library
- **React Router** - Navigation
- **Tailwind CSS** - Styling
- **Axios** - HTTP client
- **React Toastify** - Notifications
- **Stripe React** - Payment forms

### Admin
- **React 18** - UI library
- **Tailwind CSS** - Styling
- **Axios** - HTTP client

## 🚀 Deployment

### Backend Deployment (Railway, Heroku, Render)
1. Push code to Git repository
2. Connect repository to hosting platform
3. Set environment variables
4. Deploy

### Frontend Deployment (Vercel, Netlify)
```bash
npm run build
# Deploy 'dist' folder
```

### Admin Deployment
```bash
npm run build
# Deploy 'dist' folder
```

## 📝 API Usage Examples

### User Login
```bash
curl -X POST http://localhost:4000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com", "password": "password123"}'
```

### Add Product
```bash
curl -X POST http://localhost:4000/api/products/add \
  -H "Authorization: Bearer <token>" \
  -F "name=T-Shirt" \
  -F "price=29.99" \
  -F "category=Men" \
  -F "images=@image.jpg"
```

### Create Order
```bash
curl -X POST http://localhost:4000/api/orders/create \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"items": [...], "amount": 99.99, "address": {...}, "paymentMethod": "stripe"}'
```

## 🐛 Troubleshooting

### MongoDB Connection Error
- Verify connection string is correct
- Check IP whitelist in MongoDB Atlas
- Ensure database user credentials are correct

### Cloudinary Upload Failed
- Verify API credentials
- Check image file size (max 5MB)
- Verify image format (JPEG, PNG, GIF, WebP)

### Port Already in Use
```bash
# Find process using port 4000
lsof -i :4000

# Kill process
kill -9 <PID>
```

## 📚 Additional Resources

- [MongoDB Documentation](https://docs.mongodb.com/)
- [Express.js Guide](https://expressjs.com/)
- [React Documentation](https://react.dev/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Stripe Documentation](https://stripe.com/docs)

## 👥 Contributing

1. Create a feature branch
2. Commit your changes
3. Push to the branch
4. Create a Pull Request

## 📄 License

This project is open source and available under the MIT License.

## 📧 Support

For support, email support@forever.com or create an issue in the repository.

---

**Forever E-Commerce Platform** | Built with ❤️ using MERN Stack
#   S h o p k a r t  
 