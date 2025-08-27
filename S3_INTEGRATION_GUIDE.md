# 🚀 **S3 Integration Guide for BillBox**

## 📋 **MongoDB Models Analysis**

### ✅ **Models Status:**

**1. User Model** - ✅ **Complete**
- Has all required fields for authentication
- No changes needed

**2. Vendor Model** - ✅ **Complete** 
- Contains both vendor and store information
- No changes needed

**3. Bill Model** - ✅ **Updated & Complete**
- Fixed `storeId` reference issue
- Added missing S3 fields:
  - `uploadDate` - When bill was uploaded
  - `fileSize` - Size of the file in bytes
  - `fileType` - Type of file (pdf, jpg, etc.)
  - `processingStatus` - Status of bill processing

---

## 🔧 **Environment Variables Setup**

### **Backend Environment (.env)**
Create `backend/.env`:
```env
# Database Configuration
MONGODB_URI=mongodb+srv://sreethamjakkula09:mtjnya3lIBWMRw8c@backenddb.fu87ust.mongodb.net/billbox

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-here

# Server Configuration
PORT=5050
NODE_ENV=development

# CORS Configuration
FRONTEND_URL=http://localhost:8080

# AWS S3 Configuration
AWS_ACCESS_KEY_ID=your-aws-access-key
AWS_SECRET_ACCESS_KEY=your-aws-secret-key
AWS_REGION=ap-south-1
AWS_S3_BUCKET=your-billbox-bucket-name

# Optional: AWS CloudFront (for CDN)
AWS_CLOUDFRONT_DOMAIN=your-cloudfront-domain.cloudfront.net
```

### **Frontend Environment (.env)**
Create `frontend/.env`:
```env
# API Configuration
VITE_API_BASE_URL=http://localhost:5050

# S3 Configuration (optional)
VITE_S3_BUCKET_URL=https://your-bucket.s3.ap-south-1.amazonaws.com

# App Configuration
VITE_APP_NAME=BillBox
VITE_APP_VERSION=1.0.0
```

---

## 📦 **Dependencies Installation**

### **Backend Dependencies**
```bash
cd backend
npm install @aws-sdk/client-s3 @aws-sdk/s3-request-presigner dotenv
```

### **Frontend Dependencies**
```bash
cd frontend
npm install axios
```

---

## 🔌 **API Integration Steps**

### **Step 1: Update Backend Configuration**

**1. Update `backend/src/app.js`:**
```javascript
import dotenv from 'dotenv';
dotenv.config();

// Update MongoDB connection to use environment variable
const func = async() => { 
  await mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log('Connected to MongoDB');
  }).catch((err) => {
    console.log('Error connecting to MongoDB', err);
  })
}
```

**2. Update JWT secret in `backend/src/controllers/vendorController.js`:**
```javascript
const decoded = jwt.verify(token, process.env.JWT_SECRET);
```

### **Step 2: Test API Endpoints**

**Test with curl or Postman:**

```bash
# 1. Login to get token
curl -X POST http://localhost:5050/api/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'

# 2. Get vendor bills (replace TOKEN and VENDOR_ID)
curl -X GET http://localhost:5050/api/bills/vendor/VENDOR_ID \
  -H "Authorization: Bearer TOKEN"

# 3. Download bill (replace BILL_ID)
curl -X GET http://localhost:5050/api/bills/BILL_ID/download \
  -H "Authorization: Bearer TOKEN"
```

### **Step 3: Update Frontend API Calls**

**Replace hardcoded axios calls in your components:**

**Before (in VendorDashboard.tsx):**
```javascript
// Mock data
const mockCustomerData = [...];
```

**After (using real API):**
```javascript
import { billAPI } from '@/services/api';

const [bills, setBills] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchBills = async () => {
    try {
      const response = await billAPI.getVendorBills(vendorId);
      setBills(response.data.bills);
    } catch (error) {
      console.error('Failed to fetch bills:', error);
    } finally {
      setLoading(false);
    }
  };

  if (vendorId) {
    fetchBills();
  }
}, [vendorId]);
```

---

## 🧪 **Testing End-to-End**

### **Step 1: Test Environment Setup**

**1. Create test data in MongoDB:**
```javascript
// Insert test vendor
const testVendor = new Vendor({
  fullName: "Test Vendor",
  email: "vendor@test.com",
  phone: "1234567890",
  businessType: "Grocery",
  storeName: "Test Store",
  storeAddress: "Test Address"
});
await testVendor.save();

// Insert test bills
const testBill = new Bill({
  storeId: "store_123",
  vendorId: testVendor._id,
  customerEmail: "customer@test.com",
  amount: 1500,
  filename: "test_bill.pdf",
  s3Key: "bills/test_bill.pdf",
  processingStatus: "completed",
  extractedData: {
    vendorName: "Test Store",
    totalAmount: 1500,
    purchaseDate: new Date()
  }
});
await testBill.save();
```

### **Step 2: Test API Endpoints**

**1. Test Authentication:**
```bash
# Login
curl -X POST http://localhost:5050/api/login \
  -H "Content-Type: application/json" \
  -d '{"email":"vendor@test.com","password":"password"}'
```

**2. Test Bill Retrieval:**
```bash
# Get vendor bills
curl -X GET "http://localhost:5050/api/bills/vendor/VENDOR_ID" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

**3. Test Download:**
```bash
# Get download URL
curl -X GET "http://localhost:5050/api/bills/BILL_ID/download" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### **Step 3: Test Frontend Integration**

**1. Update VendorDashboard to use real data:**
```javascript
// In VendorDashboard.tsx
const [realBills, setRealBills] = useState([]);

useEffect(() => {
  const fetchRealBills = async () => {
    try {
      const response = await billAPI.getVendorBills(vendorId);
      setRealBills(response.data.bills);
    } catch (error) {
      console.error('Error fetching bills:', error);
    }
  };
  
  fetchRealBills();
}, [vendorId]);
```

**2. Test download functionality:**
```javascript
const handleDownload = async (billId) => {
  try {
    const response = await billAPI.downloadBill(billId);
    await downloadFile(response.data.downloadUrl, response.data.filename);
  } catch (error) {
    console.error('Download failed:', error);
  }
};
```

---

## 🔍 **Debugging Checklist**

### **Backend Issues:**
- [ ] MongoDB connection working
- [ ] Environment variables loaded
- [ ] AWS credentials valid
- [ ] S3 bucket accessible
- [ ] JWT tokens valid

### **Frontend Issues:**
- [ ] API base URL correct
- [ ] Authentication tokens stored
- [ ] CORS configured properly
- [ ] Network requests successful

### **S3 Issues:**
- [ ] AWS credentials have S3 permissions
- [ ] S3 bucket exists and is accessible
- [ ] CORS configured on S3 bucket
- [ ] Presigned URLs generating correctly

---

## 🚨 **Common Issues & Solutions**

### **Issue 1: "AWS credentials not found"**
**Solution:** Check environment variables are loaded:
```javascript
console.log('AWS_REGION:', process.env.AWS_REGION);
console.log('AWS_ACCESS_KEY_ID:', process.env.AWS_ACCESS_KEY_ID ? 'SET' : 'NOT SET');
```

### **Issue 2: "S3 bucket not found"**
**Solution:** Verify bucket name and region:
```javascript
// Check bucket exists
const s3Client = new S3Client({ region: 'ap-south-1' });
const command = new ListBucketsCommand({});
const buckets = await s3Client.send(command);
console.log('Available buckets:', buckets.Buckets.map(b => b.Name));
```

### **Issue 3: "CORS error in frontend"**
**Solution:** Update CORS configuration:
```javascript
// In backend/src/app.js
app.use(cors({ 
  origin: ['http://localhost:8080', 'https://yourdomain.com'],
  credentials: true 
}));
```

### **Issue 4: "Token expired"**
**Solution:** Implement token refresh or redirect to login:
```javascript
// In frontend/src/services/api.ts
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
```

---

## 📊 **Monitoring & Logging**

### **Add Logging to Backend:**
```javascript
// In billController.js
console.log('Fetching bills for vendor:', vendorId);
console.log('Query parameters:', req.query);
console.log('Bills found:', bills.length);
```

### **Add Error Tracking:**
```javascript
// In frontend
const handleError = (error) => {
  console.error('API Error:', error.response?.data || error.message);
  // Send to error tracking service
};
```

---

## ✅ **Final Checklist**

### **Before Going Live:**
- [ ] All environment variables set
- [ ] AWS S3 bucket configured
- [ ] CORS settings updated
- [ ] API endpoints tested
- [ ] Frontend integration tested
- [ ] Error handling implemented
- [ ] Logging configured
- [ ] Security measures in place

### **Testing Checklist:**
- [ ] User registration works
- [ ] User login works
- [ ] Bill upload works
- [ ] Bill retrieval works
- [ ] Bill download works
- [ ] Error handling works
- [ ] Loading states work
- [ ] Real data displays correctly

---

## 🎯 **Next Steps After Backend Team Completes S3 API**

1. **Get API documentation** from backend team
2. **Update environment variables** with real AWS credentials
3. **Test API endpoints** with real data
4. **Replace mock data** in frontend components
5. **Test end-to-end flow** with real bill uploads
6. **Monitor performance** and error rates
7. **Deploy to production** when ready

This guide provides everything you need to integrate with your backend team's S3 API! 🚀 