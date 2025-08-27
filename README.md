# BillBox - Vendor Management Platform

A comprehensive SaaS platform for vendors to manage their business operations, including bill management, customer communication, and business analytics.

## 🚀 Features

### Authentication
- **AWS Cognito Hosted UI** for secure authentication
- **OAuth 2.0 Authorization Code Grant Flow**
- **JWT token-based API authentication**
- **Role-based access control** (Vendor/Customer)

### Vendor Registration System
- **Complete vendor profile setup** with store information
- **Form validation** with inline error display
- **Business type categorization** (Grocery, Pharmacy, Electronics, etc.)
- **Store metadata collection** (address, phone, working hours, WhatsApp opt-in)
- **Automatic redirect logic** - new vendors go to registration, existing vendors go to dashboard

### Dashboard & Analytics
- **Real-time business metrics**
- **Customer insights and analytics**
- **Revenue tracking and reporting**
- **Bill management interface**

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **Shadcn/ui** for UI components
- **React Router DOM** for routing

### Backend
- **Node.js** with Express
- **Prisma ORM** for database operations
- **PostgreSQL** (Amazon RDS)
- **JWT** for API authentication

### Authentication
- **AWS Cognito** for user management
- **AWS Amplify** for frontend integration

## 📁 Project Structure

```
BillBox-website-master/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── pages/           # Page components
│   │   │   ├── Auth.tsx     # Authentication page
│   │   │   ├── Callback.tsx # OAuth callback handler
│   │   │   ├── VendorRegistration.tsx # Vendor registration form
│   │   │   └── VendorDashboard.tsx # Vendor dashboard
│   │   ├── components/      # Reusable UI components
│   │   ├── contexts/        # React contexts
│   │   └── aws-config.ts   # AWS Cognito configuration
│   └── package.json
├── backend/                  # Node.js backend API
│   ├── src/
│   │   ├── controllers/     # Business logic
│   │   ├── routes/          # API routes
│   │   ├── middleware/      # Authentication middleware
│   │   └── models/          # Database models
│   ├── prisma/              # Database schema and migrations
│   └── package.json
└── README.md
```

## 🔧 Setup Instructions

### 1. AWS Cognito Configuration

**Required Cognito Settings:**
- **User Pool ID**: `ap-south-1_Tc6g6RyT7`
- **Client ID**: `1p6pgm5gtpfc071orsrd1obues`
- **Client Secret**: `1bfd1pk5am3enlmkjber7tlan2pp5iambvove47a4dncs2efovsu`
- **Domain**: `ap-south-1tc6g6ryt7.auth.ap-south-1.amazoncognito.com`

**Callback URLs to configure in Cognito:**
- `http://localhost:8080/callback`
- `https://billbox.co.in/callback`

**Logout URLs to configure in Cognito:**
- `http://localhost:8080/logout`
- `https://billbox.co.in/logout`

### 2. Database Setup

**Prisma Schema:**
- `Vendor` table: Stores vendor profile information
- `Store` table: Stores store details with vendor relationship

**Required Environment Variables:**
```env
# Backend .env
DATABASE_URL="postgresql://username:password@host:port/database"
```

### 3. Running the Application

**Start Backend:**
```bash
cd backend
npm install
npm run dev
# Server runs on http://localhost:5000
```

**Start Frontend:**
```bash
cd frontend
npm install
npm run dev
# App runs on http://localhost:8080
```

## 🔐 Authentication Flow

1. **User clicks "Sign In"** → Redirected to Cognito Hosted UI
2. **User logs in** → Cognito redirects to `/callback` with authorization code
3. **Frontend sends code to backend** → Backend exchanges code for tokens
4. **Backend returns tokens** → Frontend stores tokens in localStorage
5. **Vendor check** → If vendor not registered, redirect to `/vendor/registration`
6. **Registration complete** → Redirect to `/vendor/dashboard`

## 📋 API Endpoints

### Authentication
- `POST /auth/token` - Exchange authorization code for tokens

### Vendor Management
- `POST /api/vendor/register` - Register new vendor and store
- `GET /api/vendor/profile` - Check if vendor is registered

## 🎯 Vendor Registration Features

### Form Validation
- **Phone number validation** (10 digits)
- **GSTIN format validation** (optional)
- **Required field validation**
- **Inline error display**

### Data Collection
- **Vendor Information**: Full name, phone, email, business type, GSTIN
- **Store Information**: Store name, address, phone, type, working hours, WhatsApp opt-in

### Business Logic
- **Automatic email fetching** from Cognito user profile
- **Unique store ID generation** (UUID)
- **Duplicate registration prevention**
- **Database relationship management** (Vendor → Store)

## 🚨 Important Notes

1. **Domain Configuration**: Ensure the Cognito domain URL is correct (no underscores in domain construction)
2. **CORS Setup**: Backend is configured to allow requests from `http://localhost:8080`
3. **Token Storage**: Access tokens are stored in localStorage for API authentication
4. **Error Handling**: Comprehensive error handling for network issues and validation failures

## 🔄 Development Workflow

1. **Authentication** → Test Cognito login flow
2. **Registration** → Test vendor registration form
3. **Dashboard** → Verify redirect logic and dashboard access
4. **API Integration** → Test backend endpoints with real data

## 📞 Support

For issues related to:
- **Authentication**: Check Cognito console settings and callback URLs
- **Database**: Verify Prisma schema and database connection
- **Frontend**: Check browser console for errors
- **Backend**: Check server logs for API errors
