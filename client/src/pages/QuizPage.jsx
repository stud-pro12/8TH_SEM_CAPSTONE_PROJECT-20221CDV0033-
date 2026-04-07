import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getQuizQuestions, checkAnswer, updateQuizScore, sendQuizCompletionNotification } from '../utils/api';


function QuizPage({ user, setUser }) {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);
  const [loading, setLoading] = useState(true);
  const [resultData, setResultData] = useState(null);

  // Default questions if database is empty
  const defaultQuestions = [
    {
      _id: '1',
      question: 'What does DBT stand for?',
      options: [
        'Digital Bank Transfer',
        'Direct Benefit Transfer',
        'Database Transfer',
        'Direct Banking Transaction'
      ],
      correctAnswer: 1,
      explanation: 'DBT stands for Direct Benefit Transfer, which is a mechanism to transfer subsidies directly to beneficiaries.'
    },
    {
      _id: '2',
      question: 'How many digits are there in an Aadhaar number?',
      options: ['10 digits', '12 digits', '14 digits', '16 digits'],
      correctAnswer: 1,
      explanation: 'Aadhaar number is a unique 12-digit identification number.'
    },
    {
      _id: '3',
      question: 'Which of the following is TRUE about DBT-enabled accounts?',
      options: [
        'Only available for business accounts',
        'Can receive government scholarships directly',
        'Requires monthly maintenance charges',
        'Only for senior citizens'
      ],
      correctAnswer: 1,
      explanation: 'DBT-enabled accounts can receive government benefits and scholarships directly without intermediaries.'
    },
    {
      _id: '4',
      question: 'What is the difference between Aadhaar-linked and DBT-enabled accounts?',
      options: [
        'There is no difference',
        'Aadhaar-linked is just identification, DBT-enabled can receive benefits',
        'DBT-enabled accounts charge more fees',
        'Aadhaar-linked accounts are better'
      ],
      correctAnswer: 1,
      explanation: 'Aadhaar-linked accounts are only for identification, while DBT-enabled accounts can receive direct government benefits.'
    },
    {
      _id: '5',
      question: 'Where can you check if your account is DBT-enabled?',
      options: [
        'At any police station',
        'PFMS portal (pfms.nic.in)',
        'Post office',
        'Aadhaar center only'
      ],
      correctAnswer: 1,
      explanation: 'You can check your DBT status on the PFMS (Public Financial Management System) portal at pfms.nic.in.'
    },
    {
      _id: '6',
      question: 'Which document is essential for linking Aadhaar to your bank account?',
      options: [
        'Passport',
        'Driving License',
        'Aadhaar Card',
        'Voter ID'
      ],
      correctAnswer: 2,
      explanation: 'Aadhaar Card is the essential document required for linking Aadhaar to your bank account.'
    },
    {
      _id: '7',
      question: 'What is the main benefit of DBT for students?',
      options: [
        'Lower interest rates',
        'Faster scholarship disbursement',
        'Free debit cards',
        'Higher credit limits'
      ],
      correctAnswer: 1,
      explanation: 'The main benefit is faster and direct scholarship disbursement without delays or intermediaries.'
    },
    {
      _id: '8',
      question: 'Can you link Aadhaar to your bank account through internet banking?',
      options: [
        'No, only at bank branch',
        'Yes, most banks allow it',
        'Only for savings accounts',
        'Only with special permission'
      ],
      correctAnswer: 1,
      explanation: 'Most banks allow Aadhaar linking through internet banking, ATM, or mobile banking apps.'
    },
    {
      _id: '9',
      question: 'What should you do if your name on Aadhaar does not match your bank records?',
      options: [
        'Ignore it',
        'Get it corrected in either Aadhaar or bank records',
        'Create a new bank account',
        'Apply for a new Aadhaar'
      ],
      correctAnswer: 1,
      explanation: 'Name mismatches can cause issues. You should get your name corrected in either Aadhaar or bank records to match.'
    },
    {
      _id: '10',
      question: 'What is the Aadhaar helpline number?',
      options: [
        '100',
        '1947',
        '1800',
        '1234'
      ],
      correctAnswer: 1,
      explanation: 'The Aadhaar helpline number is 1947 for any queries related to Aadhaar services.'
    }
  ];

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await getQuizQuestions();
      if (response.data.questions.length > 0) {
        setQuestions(response.data.questions);
      } else {
        setQuestions(defaultQuestions);
      }
    } catch (error) {
      console.error('Error fetching questions:', error);
      setQuestions(defaultQuestions);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswer = async (answerIndex) => {
    setSelectedAnswer(answerIndex);

    try {
      // Check if answer is correct (using default questions logic)
      const currentQ = questions[currentQuestion];
      
      // FIXED: Ensure both are numbers for comparison
      const correctAnswerIndex = Number(currentQ.correctAnswer);
      const selectedAnswerIndex = Number(answerIndex);
      const isCorrect = correctAnswerIndex === selectedAnswerIndex;
      
      console.log('DEBUG Quiz:', {
        question: currentQ.question,
        correctAnswer: correctAnswerIndex,
        selectedAnswer: selectedAnswerIndex,
        isCorrect: isCorrect
      });
      
      setResultData({
        isCorrect,
        explanation: currentQ.explanation,
        correctAnswer: correctAnswerIndex
      });

      if (isCorrect) {
        setScore(score + 1);
      }

      setShowResult(true);
    } catch (error) {
      console.error('Error checking answer:', error);
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
      setResultData(null);
    } else {
      finishQuiz();
    }
  };

  const finishQuiz = async () => {
    const percentage = (score / questions.length) * 100;
    const finalScore = Math.round(percentage);
    const passed = finalScore >= 80;

    try {
      await updateQuizScore({ score: finalScore });
      
      // Send SMS notification
      try {
        await sendQuizCompletionNotification({ 
          score: finalScore, 
          passed: passed 
        });
      } catch (smsError) {
        console.log('SMS notification failed (non-critical):', smsError);
      }
      
      // Update user data
      const updatedUser = {
        ...user,
        quizScore: finalScore,
        certificateIssued: passed
      };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
    } catch (error) {
      console.error('Error updating score:', error);
    }

    setQuizComplete(true);
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
        <div className="spinner"></div>
      </div>
    );
  }

  // Quiz Complete Screen
  if (quizComplete) {
    const percentage = (score / questions.length) * 100;
    const passed = percentage >= 80;

    return (
      <div style={{ padding: '40px 20px', backgroundColor: '#f5f5f5', minHeight: 'calc(100vh - 200px)' }}>
        <div className="container" style={{ maxWidth: '700px' }}>
          <div className="card" style={{ textAlign: 'center' }}>
            
            {/* Result Icon */}
            <div style={{ fontSize: '80px', marginBottom: '24px' }}>
              {passed ? '🎉' : '📚'}
            </div>

            {/* Score */}
            <h1 style={{ fontSize: '48px', color: passed ? '#138808' : '#ff9933', marginBottom: '16px' }}>
              {Math.round(percentage)}%
            </h1>

            <h2 style={{ fontSize: '28px', color: '#1a4d8f', marginBottom: '16px' }}>
              {passed ? 'Congratulations!' : 'Keep Learning!'}
            </h2>

            <p style={{ fontSize: '18px', color: '#666', marginBottom: '32px' }}>
              You scored {score} out of {questions.length} questions correctly.
            </p>

            {/* Certificate Status */}
            {passed ? (
              <div className="alert alert-success" style={{ marginBottom: '24px' }}>
                <strong>✅ Certificate Unlocked!</strong><br />
                You've earned your ScholarSure certificate. View it in your profile.
              </div>
            ) : (
              <div className="alert alert-info" style={{ marginBottom: '24px' }}>
                <strong>📖 Keep Practicing!</strong><br />
                You need 80% or more to earn your certificate. Review the modules and try again.
              </div>
            )}

            {/* Performance Breakdown */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', 
              gap: '16px', 
              marginBottom: '32px',
              textAlign: 'center'
            }}>
              <div style={{ padding: '16px', backgroundColor: '#e8f5e9', borderRadius: '8px' }}>
                <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#138808' }}>{score}</div>
                <div style={{ fontSize: '14px', color: '#666' }}>Correct</div>
              </div>
              <div style={{ padding: '16px', backgroundColor: '#ffebee', borderRadius: '8px' }}>
                <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#c41e3a' }}>{questions.length - score}</div>
                <div style={{ fontSize: '14px', color: '#666' }}>Incorrect</div>
              </div>
              <div style={{ padding: '16px', backgroundColor: '#fff3e0', borderRadius: '8px' }}>
                <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#ff9933' }}>{questions.length}</div>
                <div style={{ fontSize: '14px', color: '#666' }}>Total</div>
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button 
                onClick={() => navigate('/profile')}
                className="btn btn-primary"
              >
                View Profile
              </button>
              <button 
                onClick={() => navigate('/modules')}
                className="btn btn-outline"
              >
                Review Modules
              </button>
              <button 
                onClick={() => window.location.reload()}
                className="btn btn-secondary"
              >
                Retake Quiz
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Quiz Questions Screen
  const currentQ = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div style={{ padding: '40px 20px', backgroundColor: '#f5f5f5', minHeight: 'calc(100vh - 200px)' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        
        {/* Header */}
        <div style={{ marginBottom: '32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h1 style={{ fontSize: '28px', color: '#1a4d8f', margin: 0 }}>
              Knowledge Quiz
            </h1>
            <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#666' }}>
              {currentQuestion + 1} / {questions.length}
            </span>
          </div>
          
          {/* Progress Bar */}
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }}></div>
          </div>
        </div>

        {/* Question Card */}
        <div className="card">
          <h2 style={{ fontSize: '22px', color: '#333', marginBottom: '32px', lineHeight: '1.6' }}>
            {currentQ?.question}
          </h2>

          {/* Options */}
          <div style={{ display: 'grid', gap: '16px' }}>
            {currentQ?.options.map((option, index) => (
              <button
                key={index}
                onClick={() => !showResult && handleAnswer(index)}
                disabled={showResult}
                style={{
                  padding: '16px 20px',
                  border: '2px solid',
                  borderColor: 
                    showResult && index === resultData?.correctAnswer
                      ? '#138808'
                      : showResult && index === selectedAnswer && !resultData?.isCorrect
                      ? '#c41e3a'
                      : selectedAnswer === index
                      ? '#1a4d8f'
                      : '#ddd',
                  borderRadius: '8px',
                  backgroundColor: 
                    showResult && index === resultData?.correctAnswer
                      ? '#e8f5e9'
                      : showResult && index === selectedAnswer && !resultData?.isCorrect
                      ? '#ffebee'
                      : 'white',
                  color: '#333',
                  fontSize: '16px',
                  textAlign: 'left',
                  cursor: showResult ? 'default' : 'pointer',
                  transition: 'all 0.3s ease',
                  fontWeight: selectedAnswer === index ? '600' : 'normal'
                }}
              >
                <span style={{ marginRight: '12px', fontWeight: 'bold' }}>
                  {String.fromCharCode(65 + index)}.
                </span>
                {option}
                {showResult && index === resultData?.correctAnswer && (
                  <span style={{ float: 'right', color: '#138808' }}>✓</span>
                )}
                {showResult && index === selectedAnswer && !resultData?.isCorrect && (
                  <span style={{ float: 'right', color: '#c41e3a' }}>✗</span>
                )}
              </button>
            ))}
          </div>

          {/* Explanation */}
          {showResult && resultData && (
            <div 
              className={resultData.isCorrect ? 'alert alert-success' : 'alert alert-error'}
              style={{ marginTop: '24px' }}
            >
              <strong>
                {resultData.isCorrect ? '✅ Correct!' : '❌ Incorrect'}
              </strong>
              <p style={{ marginTop: '8px', marginBottom: 0 }}>
                {resultData.explanation}
              </p>
            </div>
          )}

          {/* Next Button */}
          {showResult && (
            <button
              onClick={handleNext}
              className="btn btn-primary"
              style={{ width: '100%', marginTop: '24px', padding: '16px' }}
            >
              {currentQuestion < questions.length - 1 ? 'Next Question →' : 'Finish Quiz'}
            </button>
          )}
        </div>

        {/* Current Score */}
        <div style={{ 
          marginTop: '24px', 
          textAlign: 'center', 
          padding: '16px', 
          backgroundColor: 'white', 
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <span style={{ fontSize: '16px', color: '#666' }}>
            Current Score: <strong style={{ color: '#138808', fontSize: '20px' }}>{score}</strong> / {currentQuestion + (showResult ? 1 : 0)}
          </span>
        </div>
      </div>
    </div>
  );
}

export default QuizPage;