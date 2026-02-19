# Shopkart E-Commerce - Developer's Quick Reference

## Quick Commands

### Backend
```bash
# Start development server
cd backend && npm run dev

# Install dependencies
npm install

# Start in production mode
npm start
```

### Frontend
```bash
# Start development server
cd frontend && npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Admin
```bash
# Start development server
cd admin && npm run dev

# Build for production
npm run build
```

## API Quick Reference

### Authentication
```javascript
// Login
POST /api/users/login
{
  "email": "user@example.com",
  "password": "password123"
}

// Signup
POST /api/users/signup
{
  "name": "John Doe",
  "email": "user@example.com",
  "password": "password123"
}

// Headers for protected routes
{
  "Authorization": "Bearer {token}"
}
```

### Products
```javascript
// Get all products
GET /api/products/list

// Get product by ID
GET /api/products/list/:id

// Add product (admin only)
POST /api/products/add
{
  "name": "Product Name",
  "description": "Description",
  "price": 29.99,
  "category": "Men",
  "subCategory": "T-Shirts",
  "sizes": ["S", "M", "L"],
  "images": [file1, file2]
}
```

### Cart
```javascript
// Add to cart
POST /api/cart/add
{
  "itemId": "productId",
  "size": "M"
}

// Get cart
GET /api/cart

// Update quantity
PUT /api/cart/update
{
  "itemId": "productId",
  "size": "M",
  "quantity": 2
}

// Remove item
PUT /api/cart/remove
{
  "itemId": "productId",
  "size": "M"
}
```

### Orders
```javascript
// Create order
POST /api/orders/create
{
  "items": [
    {
      "productId": "id",
      "quantity": 1,
      "size": "M",
      "price": 29.99
    }
  ],
  "amount": 99.99,
  "address": {
    "street": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zipCode": "10001"
  },
  "paymentMethod": "stripe"
}

// Get user orders
GET /api/orders/user

// Admin: Get all orders
GET /api/orders/admin/list

// Admin: Update order status
PUT /api/orders/admin/:id/status
{
  "status": "Shipped"
}
```

### Payments
```javascript
// Stripe: Create payment intent
POST /api/payment/stripe/create-intent
{
  "amount": 99.99,
  "orderId": "orderId"
}

// Stripe: Verify payment
POST /api/payment/stripe/verify
{
  "success": true,
  "orderId": "orderId"
}
```

## Frontend Context (ShopContext)

### Available Functions
```javascript
const {
  // State
  products,
  cartItems,
  token,
  user,
  currency,
  delivery_fee,
  search,
  
  // Methods
  addToCart,           // (itemId, size) => Promise
  removeFromCart,      // (itemId, size) => void
  updateQuantity,      // (itemId, size, qty) => void
  getCartCount,        // () => number
  getCartAmount,       // () => number
  login,               // (email, password) => Promise
  register,            // (name, email, password) => Promise
  logout,              // () => void
  setSearch,           // (string) => void
} = useContext(ShopContext)
```

## Routing

### Frontend Routes
```javascript
/                      // Home
/shop                  // Shop/Products
/product/:id          // Product Details
/cart                 // Shopping Cart
/login                // User Login
/register             // User Registration
```

### Admin Routes
```javascript
/admin/login          // Admin Login
/admin/dashboard      // Dashboard
/admin/products       // Products List
/admin/add-product    // Add Product
/admin/orders         // Orders
```

## Environment Variables

### Backend (.env)
```
PORT=4000
NODE_ENV=development
MONGODB_URI=
CLOUDINARY_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_SECRET_KEY=
JWT_SECRET=
ADMIN_EMAIL=
ADMIN_PASSWORD=
STRIPE_SECRET_KEY=
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
```

### Frontend (.env)
```
VITE_BACKEND_URL=http://localhost:4000
```

### Admin (.env)
```
VITE_BACKEND_URL=http://localhost:4000
```

## HTTP Status Codes

```
200 - OK
201 - Created
400 - Bad Request
401 - Unauthorized
403 - Forbidden
404 - Not Found
500 - Server Error
```

## Database Query Examples

### Get all users (MongoDB)
```javascript
db.users.find()
```

### Get products by category
```javascript
db.products.find({ category: "Men" })
```

### Get user's orders
```javascript
db.orders.find({ userId: ObjectId("...") })
```

### Get best sellers
```javascript
db.products.find({ bestSeller: true })
```

## Debugging Tips

### Check Backend Logs
```bash
# Terminal will show:
# Request URLs
# Database connections
# Errors
```

### Check Frontend Console
```javascript
// Browser DevTools → Console
// Shows:
// API responses
// Component errors
// Network requests
```

### Check Network Requests
```
Browser DevTools → Network tab
```

## Common Error Messages & Solutions

### "CORS error"
**Cause**: Backend not allowing frontend requests
**Fix**: Check backend CORS configuration

### "401 Unauthorized"
**Cause**: Missing or invalid JWT token
**Fix**: Login again and check token storage

### "404 Not Found"
**Cause**: Route/endpoint doesn't exist
**Fix**: Check API endpoint spelling

### "Cloudinary upload failed"
**Cause**: Invalid credentials or file issue
**Fix**: Check Cloudinary keys and image format

### "Connection refused"
**Cause**: Backend not running
**Fix**: Start backend with `npm run dev`

## Performance Optimization

### Frontend
- Use React.memo for components
- Implement code splitting
- Optimize images
- Use virtual scrolling for large lists

### Backend
- Add database indexes
- Implement caching
- Use pagination
- Compress images before storage

### Database
- Create indexes on frequently queried fields
- Archive old orders
- Regular backups

## Useful Links

- [MongoDB Docs](https://docs.mongodb.com/)
- [Express Docs](https://expressjs.com/)
- [React Docs](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Stripe Docs](https://stripe.com/docs)
- [Vite Docs](https://vitejs.dev/)

## Regular Maintenance

### Weekly
- Check error logs
- Monitor server performance
- Review new user signups

### Monthly
- Backup database
- Review and update dependencies
- Check security patches

### Quarterly
- Performance audit
- Update dependencies
- Security review

---

Last Updated: February 2026
