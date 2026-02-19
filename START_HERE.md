# 🚀 GET STARTED IN 5 MINUTES

## 1️⃣ Install Dependencies

Open 3 terminals and run in each folder:

```bash
# Terminal 1: Backend
cd backend
npm install

# Terminal 2: Frontend  
cd frontend
npm install

# Terminal 3: Admin
cd admin
npm install
```

## 2️⃣ Start All Servers

Run in each terminal (from previous step):

```bash
# Terminal 1: Backend (runs on port 4000)
npm run dev

# Terminal 2: Frontend (runs on port 5173)
npm run dev

# Terminal 3: Admin (runs on port 5174)
npm run dev
```

✅ All servers should be running!

## 3️⃣ Access Applications

Open in your browser:

- **Frontend**: http://localhost:5173
- **Admin**: http://localhost:5174
- **API**: http://localhost:4000

## 4️⃣ Create Account & Test

### Register a New User
1. Go to http://localhost:5173/register
2. Create account (any email/password)
3. You're logged in!

### Add Products (Admin)
1. Go to http://localhost:5174/admin/login
2. Login with:
   - Email: `ashishbaghel4113@gmail.com`
   - Password: `As12345`
3. Click "Add Product"
4. Fill form and upload images
5. Click "Add Product"

### Shop & Cart
1. Go to frontend home page
2. Browse products added
3. Click product → Add to Cart
4. Go to Cart page
5. Click "Proceed to Checkout"

### Test Payment
Use test card: `4242 4242 4242 4242`
Any future date, any CVC: e.g., 12/25, CVC: 123

## 📚 Documentation

Read these in order:

1. **FILE_INDEX.md** - Overview of all files (2 min read)
2. **PROJECT_SUMMARY.md** - What's been built (3 min read)  
3. **SETUP_GUIDE.md** - Detailed setup with troubleshooting (5 min read)
4. **QUICK_REFERENCE.md** - API endpoints & commands (reference)

## ✨ Key Features Ready to Use

✅ User Authentication (Login/Register/Logout)
✅ Product Management (Add/Edit/Delete)
✅ Shopping Cart (Add/Remove/Update)
✅ Order Management (Create/Track/Cancel)
✅ Payment Processing (Stripe/Razorpay)
✅ Admin Dashboard (Stats/Analytics)
✅ Image Upload (Cloudinary)
✅ Responsive Design (for all devices)

## 🛠️ Useful Commands

```bash
# Build for production
cd frontend && npm run build
cd admin && npm run build

# Check for errors
cd backend && npm run dev
# or cd frontend && npm run dev
# or cd admin && npm run dev
```

## ❓ Having Issues?

### Backend won't start
```bash
# Kill process on port 4000
npx kill-port 4000
npm run dev
```

### npm install fails
```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### Can't upload images
- Check Cloudinary credentials in `backend/.env`
- Verify MongoDB connection works

## 📂 Project Structure

```
Forever E-Commerce/
├── backend/     ← Node.js API (30+ endpoints)
├── frontend/    ← Customer React App
├── admin/       ← Admin Dashboard
└── 📄 Docs     ← README, SETUP_GUIDE, etc.
```

## 🎯 What's Already Done For You

✅ Complete backend with all endpoints
✅ Frontend with all pages and components
✅ Admin dashboard with all features
✅ MongoDB models configured
✅ Authentication setup (JWT)
✅ Payment gateway integration (Stripe/Razorpay)
✅ Image upload (Cloudinary)
✅ Tailwind CSS styling
✅ Environment variables configured
✅ Error handling implemented
✅ CORS configured
✅ File upload handling

## 💡 Pro Tips

1. **Save your MongoDB URI** - You'll need it if server crashes
2. **Test card**: `4242 4242 4242 4242` (Stripe testing)
3. **Check Console** - Browser DevTools for errors
4. **Check Terminal** - Server logs for API errors
5. **Hot Reload** - Frontend updates automatically when you save files

## 🚀 You're Ready to Build!

Everything is scaffolded and configured. You can now:

- ✅ Add new features
- ✅ Customize styling
- ✅ Test functionality
- ✅ Deploy to production

## 📞 Need Help?

1. Check **SETUP_GUIDE.md** for troubleshooting
2. Read **QUICK_REFERENCE.md** for API docs
3. See **FILE_INDEX.md** for file locations
4. Check browser console for errors
5. Check terminal for server errors

---

**Happy Coding! 🎉**

Start with: `cd backend && npm run dev` in separate terminals for each project!
