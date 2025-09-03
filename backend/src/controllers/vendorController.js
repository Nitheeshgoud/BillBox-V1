// import prisma from '../models/prismaClient.js'; // Temporarily disabled

// POST /api/vendor/register
import jwt from "jsonwebtoken";
import Vendor from "../models/vendor.js"; 
import User from "../models/user.js";

export const authMiddleware = (req, res, next) => {
  console.log("Auth middleware - Headers:", req.headers.authorization);
  
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    console.log("No authorization header found");
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1]; // remove "Bearer"
  if (!token) {
    console.log("No token found after Bearer");
    return res.status(401).json({ message: "Invalid token format" });
  }

  console.log("Token received:", token.substring(0, 20) + "...");

  try {
    const jwtSecret = process.env.JWT_SECRET || "Hello";
    console.log("Using JWT secret:", jwtSecret);
    
    const decoded = jwt.verify(token, jwtSecret);
    console.log("Token decoded successfully:", decoded);
    
    req.userId = decoded.id;
    next();
  } catch (error) {
    console.error("JWT verification failed:", error.message);
    return res.status(403).json({ message: "Invalid or expired token", error: error.message });
  }
};



export const isregistered = async (req, res) => {
  try {
    const id = req.userId;
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ registered: false, message: "User not found" });
    }

    const vendor = await Vendor.findOne({ email: user.email });

    if (vendor) {
      return res.status(200).json({ registered: true, message: "Already registered" });
    }

    return res.status(200).json({ registered: false, message: "No records found" });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ registered: false, message: "Internal server error" });
  }
};


// your schema file

export const registerVendor = async (req, res) => {
  try {
    console.log("Vendor registration request body:", req.body);
    console.log("User ID from token:", req.userId);
    
    const {
      fullName,
      phone,
      businessType,
      gstin,
      storeName,
      storeAddress,
      storePhone,
      storeType,
      whatsappOptIn,
      workingHours,
    } = req.body;

    // Validate required fields
    if (!fullName || !phone || !businessType || !storeName || !storeAddress || !storePhone || !storeType || !workingHours) {
      return res.status(400).json({ 
        error: "Missing required fields",
        details: {
          fullName: !fullName,
          phone: !phone,
          businessType: !businessType,
          storeName: !storeName,
          storeAddress: !storeAddress,
          storePhone: !storePhone,
          storeType: !storeType,
          workingHours: !workingHours
        }
      });
    }

    const user = await User.findById(req.userId);
    if (!user) {
      console.error("User not found for ID:", req.userId);
      return res.status(404).json({ error: "User not found" });
    }

    console.log("Found user:", user.email);

    // Check if vendor already exists
    const existingVendor = await Vendor.findOne({ email: user.email });
    if (existingVendor) {
      return res.status(400).json({ error: "Vendor already registered with this email" });
    }

    const vendor = new Vendor({
      fullName,
      phone,
      email: user.email,
      businessType,
      gstin: gstin || "",
      storeName,
      storeAddress,
      storePhone,
      storeType,
      whatsappOptIn: whatsappOptIn || false,
      workingHours,
    });

    console.log("Creating vendor with data:", vendor);
    await vendor.save();
    console.log("Vendor saved successfully");

    res.status(201).json({
      message: "Registration successful",
      vendor: {
        id: vendor._id,
        fullName: vendor.fullName,
        email: vendor.email,
        storeName: vendor.storeName
      },
    });
  } catch (err) {
    console.error("Registration error details:", err);
    
    if (err.name === 'ValidationError') {
      const validationErrors = Object.keys(err.errors).map(key => ({
        field: key,
        message: err.errors[key].message
      }));
      return res.status(400).json({ 
        error: "Validation failed",
        details: validationErrors
      });
    }
    
    if (err.code === 11000) {
      return res.status(400).json({ 
        error: "Vendor already exists with this email"
      });
    }
    
    res.status(500).json({ 
      error: "Internal server error",
      details: err.message 
    });
  }
};


export const vendordetails = async(req,res)=>{

}