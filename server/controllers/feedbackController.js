import Feedback from '../models/Feedback.js';
import User from '../models/User.js';

// Submit Feedback
export const submitFeedback = async (req, res) => {
  try {
    const { userId, rating, category, message } = req.body;

    // Get user details
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Create feedback
    const feedback = await Feedback.create({
      userId,
      userName: user.name,
      userEmail: user.email,
      rating,
      category,
      message
    });

    res.status(201).json({ 
      success: true, 
      message: 'Thank you for your feedback!',
      feedback 
    });
  } catch (error) {
    console.error('Submit feedback error:', error);
    res.status(500).json({ message: error.message });
  }
};

// Get User's Feedback
export const getUserFeedback = async (req, res) => {
  try {
    const { userId } = req.query;
    
    const feedbacks = await Feedback.find({ userId })
      .sort({ createdAt: -1 });

    res.json({ 
      success: true, 
      feedbacks 
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};