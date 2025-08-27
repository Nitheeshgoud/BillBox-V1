import Bill from '../models/bills.js';
import Vendor from '../models/vendor.js';
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import dotenv from 'dotenv';

dotenv.config();

// Initialize S3 client
const s3Client = new S3Client({
  region: process.env.AWS_REGION || 'ap-south-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

// Get bills for vendor or customer
export const getBills = async (req, res) => {
  try {
    const { vendorId, customerEmail } = req.params;
    const { page = 1, limit = 10, status } = req.query;
    
    // Build query based on parameters
    const query = {};
    if (vendorId) query.vendorId = vendorId;
    if (customerEmail) query.customerEmail = customerEmail;
    if (status) query.processingStatus = status;
    
    // Calculate pagination
    const skip = (page - 1) * limit;
    
    const bills = await Bill.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));
    
    const total = await Bill.countDocuments(query);
    
    res.json({
      bills,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / limit),
        totalBills: total,
        hasNext: page * limit < total,
        hasPrev: page > 1
      }
    });
  } catch (error) {
    console.error('Error fetching bills:', error);
    res.status(500).json({ error: 'Failed to fetch bills' });
  }
};

// Get specific bill by ID
export const getBillById = async (req, res) => {
  try {
    const { billId } = req.params;
    
    const bill = await Bill.findById(billId);
    if (!bill) {
      return res.status(404).json({ error: 'Bill not found' });
    }
    
    res.json(bill);
  } catch (error) {
    console.error('Error fetching bill:', error);
    res.status(500).json({ error: 'Failed to fetch bill' });
  }
};

// Download bill (generate presigned URL)
export const downloadBill = async (req, res) => {
  try {
    const { billId } = req.params;
    
    const bill = await Bill.findById(billId);
    if (!bill) {
      return res.status(404).json({ error: 'Bill not found' });
    }
    
    // Generate presigned URL for S3 download
    const command = new GetObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET,
      Key: bill.s3Key,
    });
    
    const presignedUrl = await getSignedUrl(s3Client, command, { 
      expiresIn: 3600 // URL expires in 1 hour
    });
    
    res.json({ 
      downloadUrl: presignedUrl,
      filename: bill.filename,
      fileSize: bill.fileSize,
      fileType: bill.fileType
    });
  } catch (error) {
    console.error('Error generating download URL:', error);
    res.status(500).json({ error: 'Failed to generate download URL' });
  }
};

// Get bill statistics for vendor
export const getBillStats = async (req, res) => {
  try {
    const { vendorId } = req.params;
    const { startDate, endDate } = req.query;
    
    // Build date filter
    const dateFilter = {};
    if (startDate || endDate) {
      dateFilter.createdAt = {};
      if (startDate) dateFilter.createdAt.$gte = new Date(startDate);
      if (endDate) dateFilter.createdAt.$lte = new Date(endDate);
    }
    
    const query = { vendorId, ...dateFilter };
    
    // Get total bills
    const totalBills = await Bill.countDocuments(query);
    
    // Get total amount
    const totalAmount = await Bill.aggregate([
      { $match: query },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);
    
    // Get bills by status
    const statusStats = await Bill.aggregate([
      { $match: query },
      { $group: { _id: '$processingStatus', count: { $sum: 1 } } }
    ]);
    
    // Get monthly stats
    const monthlyStats = await Bill.aggregate([
      { $match: query },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' }
          },
          count: { $sum: 1 },
          totalAmount: { $sum: '$amount' }
        }
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } }
    ]);
    
    res.json({
      totalBills,
      totalAmount: totalAmount[0]?.total || 0,
      statusStats,
      monthlyStats
    });
  } catch (error) {
    console.error('Error fetching bill stats:', error);
    res.status(500).json({ error: 'Failed to fetch bill statistics' });
  }
}; 