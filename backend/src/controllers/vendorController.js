// import prisma from '../models/prismaClient.js'; // Temporarily disabled

// POST /api/vendor/register
import jwt from "jsonwebtoken";
import Vendor from "../models/vendor.js"; 
import User from "../models/user.js";

export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1]; // remove "Bearer"
  if (!token) {
    return res.status(401).json({ message: "Invalid token format" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "Hello");
    req.userId = decoded.id;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid or expired token" });
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

    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const vendor = new Vendor({
      fullName,
      phone,
      email: user.email,
      businessType,
      gstin,
      storeName,
      storeAddress,
      storePhone,
      storeType,
      whatsappOptIn,
      workingHours,
    });

    await vendor.save();

    res.status(201).json({
      message: "Registration successful",
      vendor,
    });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ error: err.message });
  }
};


export const vendordetails = async(req,res)=>{

}