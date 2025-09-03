import mongoose from "mongoose";

const VendorSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
    trim: true
  },
  businessType: {
    type: String,
    required: true,
    trim: true
  },
  gstin: {
    type: String,
    required: false,
    trim: true
  },
  storeName: {
    type: String,
    required: true,
    trim: true
  },
  storeAddress: {
    type: String,
    required: true,
    trim: true
  },
  storePhone: {
    type: String,
    required: true,
    trim: true
  },
  storeType: {
    type: String,
    required: true,
    trim: true
  },
  whatsappOptIn: {
    type: Boolean,
    default: false
  },
  workingHours: {
    type: String,
    required: true,
    trim: true
  }
}, { timestamps: true });

const Vendor = mongoose.model("Vendor", VendorSchema);

export default Vendor;
