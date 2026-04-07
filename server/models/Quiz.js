import mongoose from 'mongoose';

const quizSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true
  },
  options: [{
    type: String,
    required: true
  }],
  correctAnswer: {
    type: Number,
    required: true
  },
  explanation: {
    type: String,
    required: true
  },
  moduleNumber: {
    type: Number,
    required: true
  }
});

export default mongoose.model('Quiz', quizSchema);