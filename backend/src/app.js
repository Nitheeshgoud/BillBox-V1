import express from 'express';
import vendorRoutes from './routes/vendorRoutes.js';
import authRoutes from './routes/authRoutes.js';
import billRoutes from './routes/billRoutes.js';
import cors from 'cors';
import mongoose from 'mongoose';
import User from './models/user.js'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config();

const app = express();
const func = async()=>{ await mongoose.connect('mongodb+srv://sreethamjakkula09:mtjnya3lIBWMRw8c@backenddb.fu87ust.mongodb.net/billbox').then(()=>{
  console.log('Connected to MongoDB');
}).catch((err)=>{
  console.log('Error connecting to MongoDB',err);
})
}

func()
app.use(cors({ origin: 'http://localhost:8080', credentials: true }));
app.use(express.json());



app.post('/api/register', async (req, res) => {
  try {
    console.log("from register api");
    const { username, email, password, role } = req.body;
    
    const isExists = await User.findOne({ email });
    if (isExists) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const newUser = await User.create({ username, email, password, role });
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET || 'Hello', { expiresIn: '1h' });

    res.status(201).json({ message: 'User registered successfully', token, role: newUser.role });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to register customer' });
  }
});


app.post('/api/login',async(req,res)=>{
  try{
    console.log("from login api")
    const {email,password}=req.body;
    const user = await User.findOne({email:email});
    if(!user){
      return res.status(400).json({error:'User not found'});
    }
    
    // Validate password
    if(user.password !== password){
      return res.status(400).json({error:'Invalid credentials'});
    }
    
    const role = user.role;
    const username = user.username;
    const token = jwt.sign({id:user._id}, process.env.JWT_SECRET || 'Hello',{expiresIn:'1h'});
    res.status(200).json({message:'Login successful',token,role,username});
  }
  catch(err){
    console.error('Login error:', err);
    res.status(500).json({error:'Login failed'})
  }
})
//app.use('/api/customer', customerRoutes);
app.use('/api/vendor', vendorRoutes);
app.use('/api/bills', billRoutes);
app.use('/auth', authRoutes);

export default app; 