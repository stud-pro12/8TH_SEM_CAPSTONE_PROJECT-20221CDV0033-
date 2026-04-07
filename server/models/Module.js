import mongoose from 'mongoose';

const moduleSchema = new mongoose.Schema({
  moduleNumber: {
    type: Number,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  duration: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  videoUrl: {
    type: String,
    default: ''
  },
  order: {
    type: Number,
    required: true
  }
});

export default mongoose.model('Module', moduleSchema);