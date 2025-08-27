import mongoose from "mongoose";

const BillSchema = new mongoose.Schema({
  storeId: {
    type: String,
    required: true,
    // Remove ref: 'Store' since Store model doesn't exist
    // Store data is embedded in Vendor model
  },
  vendorId: {
    type: String,
    required: true,
    ref: 'Vendor'
  },
  customerEmail: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  amount: {
    type: Number,
    required: false
  },
  filename: {
    type: String,
    required: true
  },
  s3Key: {
    type: String,
    required: true
  },
  // Add missing fields for S3 integration
  uploadDate: {
    type: Date,
    default: Date.now
  },
  fileSize: {
    type: Number,
    required: false
  },
  fileType: {
    type: String,
    required: false,
    enum: ['pdf', 'jpg', 'jpeg', 'png']
  },
  processingStatus: {
    type: String,
    required: false,
    enum: ['pending', 'processing', 'completed', 'failed'],
    default: 'pending'
  },
  metadata: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  },
  extractedData: {
    vendorName: String,
    storeName: String,
    items: [{
      name: String,
      quantity: Number,
      price: Number
    }],
    taxAmount: Number,
    totalAmount: Number,
    purchaseDate: Date
  }
}, { timestamps: true });

// Indexes for better query performance
BillSchema.index({ storeId: 1 });
BillSchema.index({ vendorId: 1 });
BillSchema.index({ customerEmail: 1 });
BillSchema.index({ createdAt: -1 });
BillSchema.index({ processingStatus: 1 });
BillSchema.index({ uploadDate: -1 });

const Bill = mongoose.model("Bill", BillSchema);
export default Bill;