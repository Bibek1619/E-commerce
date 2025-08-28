const User =require('../models/User');
const bcrypt = require('bcryptjs');
const jwt =require('jsonwebtoken');


const generateToken =(userId)=>{
    return jwt.sign({id:userId},process.env.JWT_SECRET,{
        expiresIn:'30d'
    });
    
};
const registerUser = async (req, res) => {
  try {
    const { name, email, password, shopName, shopDescription } = req.body;

    // Default role is user unless query says seller
    let role = "user";
    if (req.query.role === "seller" || req.body.role === "seller") {
      role = "seller";
    }

    // Handle logo upload if seller
    let shopLogo = null;
    if (req.file) {
      shopLogo = `/uploads/${req.file.filename}`;
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Build user object
    const userData = {
      name,
      email,
      password: hashedPassword,
      role,
    };

    if (role === "seller") {
      userData.shopName = shopName;
      userData.shopDescription = shopDescription;
      userData.shopLogo = shopLogo;
    }

    // Create user
    const user = await User.create(userData);

    // Response (no approval field anymore)
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      shopName: user.shopName,
      shopDescription: user.shopDescription,
      shopLogo: user.shopLogo,
      token: generateToken(user._id),
    });
  } catch (error) {
    console.error("Error in registerUser:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};




const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const role = req.query.role || "user"; // default "user" unless ?role=seller

    const user = await User.findOne({ email, role });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email, password, or role' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } catch (error) {
    console.error('Error in loginUser:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
     user
    });
  } catch (error) {
    console.error('Error in getUserProfile:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};
module.exports = {
  registerUser,
  loginUser,
getUserProfile
};
