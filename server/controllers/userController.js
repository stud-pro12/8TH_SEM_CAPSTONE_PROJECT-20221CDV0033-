import User from '../models/User.js';
import jwt from 'jsonwebtoken';

// Register User
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, phone, college, state, language } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create user
    const user = await User.create({
      name,
      email,
      password,
      phone,
      college,
      state,
      language
    });

    // Create token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '30d'
    });

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        college: user.college
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login User
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Create token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '30d'
    });

    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        college: user.college,
        completedModules: user.completedModules,
        quizScore: user.quizScore
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get User Profile
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Progress
export const updateProgress = async (req, res) => {
  try {
    const { moduleNumber } = req.body;
    const user = await User.findById(req.user.id);

    if (!user.completedModules.includes(moduleNumber)) {
      user.completedModules.push(moduleNumber);
      await user.save();
    }

    res.json({ success: true, completedModules: user.completedModules });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Quiz Score
export const updateQuizScore = async (req, res) => {
  try {
    const { score } = req.body;
    const user = await User.findById(req.user.id);
    
    user.quizScore += score;
    
    // Issue certificate if score > 80
    if (user.quizScore >= 80 && !user.certificateIssued) {
      user.certificateIssued = true;
    }
    
    await user.save();

    res.json({ 
      success: true, 
      quizScore: user.quizScore,
      certificateIssued: user.certificateIssued
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};