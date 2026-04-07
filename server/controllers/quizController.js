import Quiz from '../models/Quiz.js';

// Get Quiz Questions
export const getQuizQuestions = async (req, res) => {
  try {
    const questions = await Quiz.find();
    
    // FIXED: Include correctAnswer and explanation for frontend validation
    const sanitized = questions.map(q => ({
      _id: q._id,
      question: q.question,
      options: q.options,
      correctAnswer: q.correctAnswer,  // ✅ NOW INCLUDED
      explanation: q.explanation,       // ✅ NOW INCLUDED
      moduleNumber: q.moduleNumber
    }));
    
    res.json({ success: true, questions: sanitized });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Check Answer
export const checkAnswer = async (req, res) => {
  try {
    const { questionId, answer } = req.body;
    const question = await Quiz.findById(questionId);
    
    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }
    
    const isCorrect = question.correctAnswer === answer;
    
    res.json({ 
      success: true, 
      isCorrect,
      explanation: question.explanation,
      correctAnswer: question.correctAnswer
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create Quiz (Admin - for seeding)
export const createQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.create(req.body);
    res.status(201).json({ success: true, quiz });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};