# Forever E-Commerce - Setup Guide

## Initial Setup Instructions

### Step 1: Clone/Extract Project
Extract the project files to your desired location.

### Step 2: Gather Required API Keys

You'll need the following before starting:

#### MongoDB
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create an account and verify email
3. Create a new cluster (free tier available)
4. Create a database user with password
5. Whitelist your IP address
6. Get your connection string: `mongodb+srv://username:password@cluster.mongodb.net/?appName=Cluster0`

#### Cloudinary (for images)
1. Sign up at [Cloudinary](https://cloudinary.com/)
2. Go to Dashboard
3. Copy:
   - Cloud Name
   - API Key
   - API Secret

#### Stripe (for payments)
1. Create account at [Stripe](https://stripe.com/)
2. Go to Developers → API Keys
3. Copy Secret Key (starts with `sk_test_`)

#### Razorpay (optional)
1. Create account at [Razorpay](https://razorpay.com/)
2. Get Key ID and Key Secret from Settings

### Step 3: Backend Setup

```bash
cd backend
npm install
```

Create `.env` file and fill with your credentials:
```
PORT=4000
NODE_ENV=development
MONGODB_URI=your_mongodb_uri
CLOUDINARY_NAME=your_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_SECRET_KEY=your_secret_key
JWT_SECRET=your_random_secret_key
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=admin_password_123
STRIPE_SECRET_KEY=your_stripe_secret_key
RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret
```

Start the server:
```bash
npm run dev
```

✅ Backend running on: `http://localhost:4000`

### Step 4: Frontend Setup

```bash
cd frontend
npm install
```

Create `.env` file:
```
VITE_BACKEND_URL=http://localhost:4000
```

Start the development server:
```bash
npm run dev
```

✅ Frontend running on: `http://localhost:5173`

### Step 5: Admin Dashboard Setup

```bash
cd admin
npm install
```

Create `.env` file:
```
VITE_BACKEND_URL=http://localhost:4000
```

Start the admin:
```bash
npm run dev
```

✅ Admin running on: `http://localhost:5174`

## Default Admin Credentials

From your `.env` file:
- **Email**: `admin@example.com` (or what you set)
- **Password**: `admin_password_123` (or what you set)

Login at: `http://localhost:5174/admin/login`

## Testing the Application

### 1. Create a User Account
- Go to `http://localhost:5173/register`
- Fill in the form and create an account
- You'll be logged in automatically

### 2. Add Products (via Admin)
- Go to `http://localhost:5174/admin/login`
- Login with admin credentials
- Click "Add Product"
- Fill in product details and upload images
- Click "Add Product"

### 3. Shop & Cart
- Browse products on the frontend
- Add items to cart
- Go to cart page
- Continue to checkout (requires login)

### 4. Payment (Stripe Test Mode)
Use these test card numbers:
- **Success**: `4242 4242 4242 4242`
- **Pending**: `4000 0000 0000 0000`
- Use any future date and any CVC

### 5. Order Management
- View orders in user profile
- Manage orders in admin dashboard
- Update order status (Packing, Shipped, Delivered, etc.)

## Troubleshooting

### MongoDB Connection Issues
```
Error: connect ECONNREFUSED
```
**Solution**: 
- Check MongoDB connection string
- Verify IP is whitelisted in MongoDB Atlas
- Check database credentials

### Port Already in Use
```bash
# Kill process on port 4000
npx kill-port 4000

# Kill process on port 5173
npx kill-port 5173

# Kill process on port 5174
npx kill-port 5174
```

### npm install fails
```bash
# Clear npm cache
npm cache clean --force

# Remove node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

### CORS Issues
Make sure backend `.env` has:
```
NODE_ENV=development
```

And frontend is accessing correct `VITE_BACKEND_URL`

### Image Upload Issues
- Check Cloudinary credentials in `.env`
- Verify image is JPEG, PNG, GIF, or WebP
- Check file size (max 5MB)

## Building for Production

### Frontend
```bash
cd frontend
npm run build
# Deploy 'dist' folder to Vercel, Netlify, etc.
```

### Admin
```bash
cd admin
npm run build
# Deploy 'dist' folder
```

### Backend
- Deploy to Railway, Render, Heroku, or DigitalOcean
- Set environment variables on hosting platform
- Update VITE_BACKEND_URL in frontend & admin `.env`

## File Structure

```
backend/
├── config/          # Database & service configs
├── controllers/     # Business logic
├── models/          # Database schemas
├── routes/          # API endpoints
├── middleware/      # Auth, error handling
├── utils/           # Helper functions
├── server.js        # Entry point
└── .env             # Environment variables

frontend/
├── src/
│   ├── pages/       # Page components
│   ├── components/  # Reusable components
│   ├── context/     # ShopContext
│   ├── App.jsx      # Main app component
│   ├── main.jsx     # Entry point
│   └── index.css    # Global styles
├── vite.config.js
├── tailwind.config.js
└── .env

admin/
├── src/
│   ├── pages/       # Admin pages
│   ├── components/  # Admin components
│   ├── context/     # AdminContext
│   ├── AdminApp.jsx
│   ├── main.jsx
│   └── index.css
└── .env
```

## Common Tasks

### Add a New Product
1. Login to admin
2. Click "Add Product"
3. Fill form:
   - Name: "T-Shirt"
   - Description: "Comfortable cotton t-shirt"
   - Price: "29.99"
   - Category: "Men"
   - Sizes: Select XS, S, M, L, XL, XXL
   - Images: Upload up to 5 images
4. Click "Add Product"

### Update Order Status
1. Go to Admin → Orders
2. Find the order
3. Select new status from dropdown
4. Click update

### Delete a Product
1. Go to Admin → Products
2. Find the product
3. Click "Delete" button
4. Confirm deletion

### View Dashboard Stats
- Go to Admin → Dashboard
- See real-time stats:
  - Total Users
  - Total Products
  - Total Orders
  - Total Revenue
  - Recent Orders

## Contact & Support

For issues or questions:
- Check GitHub Issues (if on GitHub)
- Email: support@forever.com
- Check documentation in project README.md

## Next Steps

1. ✅ Complete initial setup (you've done this!)
2. ✅ Test with dummy products
3. ✅ Configure real payment gateway keys
4. Customize branding and styling
5. Deploy to production
6. Get SSL certificate for production
7. Monitor analytics and user behavior

Happy coding! 🚀
