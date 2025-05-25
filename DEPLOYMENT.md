# 🚀 Vercel Deployment Guide for Rare Rabbit E-commerce

## 📋 Prerequisites

1. **Vercel Account** - Sign up at [vercel.com](https://vercel.com)
2. **GitHub Repository** - Push your code to GitHub
3. **MongoDB Atlas** - Set up cloud database
4. **Cloudinary Account** - For image uploads
5. **Stripe Account** - For payments (optional)
6. **PayPal Developer Account** - For PayPal payments (optional)

## 🔧 Step 1: Deploy Backend

### 1.1 Create New Project in Vercel
1. Go to Vercel Dashboard
2. Click "New Project"
3. Import your GitHub repository
4. Select the `backend` folder as root directory

### 1.2 Configure Environment Variables
In Vercel Dashboard → Settings → Environment Variables, add:

```
NODE_ENV=production
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/rare-rabbit
JWT_SECRET=your_super_secret_jwt_key_here
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
PAYPAL_CLIENT_ID=your_paypal_client_id
PAYPAL_CLIENT_SECRET=your_paypal_client_secret
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
FRONTEND_URL=https://your-frontend-app.vercel.app
```

### 1.3 Deploy
- Click "Deploy"
- Note your backend URL: `https://your-backend-app.vercel.app`

## 🎨 Step 2: Deploy Frontend

### 2.1 Create New Project in Vercel
1. Go to Vercel Dashboard
2. Click "New Project"
3. Import your GitHub repository
4. Select the `frontend` folder as root directory

### 2.2 Configure Environment Variables
In Vercel Dashboard → Settings → Environment Variables, add:

```
VITE_BACKEND_URL=https://your-backend-app.vercel.app
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
VITE_PAYPAL_CLIENT_ID=your_paypal_client_id
```

### 2.3 Deploy
- Click "Deploy"
- Your frontend will be available at: `https://your-frontend-app.vercel.app`

## 🔄 Step 3: Update CORS Settings

Update your backend CORS configuration to include your frontend URL:

```javascript
// In your backend server.js or cors configuration
const corsOptions = {
  origin: [
    "http://localhost:5173",
    "https://your-frontend-app.vercel.app"
  ],
  credentials: true
};
```

## 📝 Step 4: Update Frontend URL in Backend

Make sure to update the `FRONTEND_URL` environment variable in your backend with your actual frontend Vercel URL.

## ✅ Step 5: Test Deployment

1. **Frontend**: Visit your frontend URL
2. **Backend**: Test API endpoints at your backend URL
3. **Database**: Verify MongoDB connection
4. **Images**: Test image upload functionality
5. **Payments**: Test payment integrations

## 🔧 Troubleshooting

### Common Issues:

1. **CORS Errors**: Update CORS settings in backend
2. **Environment Variables**: Double-check all env vars are set
3. **Build Errors**: Check build logs in Vercel dashboard
4. **Database Connection**: Verify MongoDB URI and network access
5. **API Calls**: Ensure frontend is calling correct backend URL

### Useful Commands:

```bash
# Test backend locally
cd backend && npm start

# Test frontend locally  
cd frontend && npm run dev

# Build frontend locally
cd frontend && npm run build
```

## 🎉 Success!

Your Rare Rabbit e-commerce platform is now live on Vercel! 

- **Frontend**: https://your-frontend-app.vercel.app
- **Backend**: https://your-backend-app.vercel.app

## 📚 Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [MongoDB Atlas Setup](https://docs.atlas.mongodb.com/)
- [Cloudinary Setup](https://cloudinary.com/documentation)
- [Stripe Integration](https://stripe.com/docs)
