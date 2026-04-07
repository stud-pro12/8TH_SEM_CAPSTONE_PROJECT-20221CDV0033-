import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Module from './models/Module.js';
import Quiz from './models/Quiz.js';

dotenv.config();

// Sample Modules Data
const modules = [
  {
    moduleNumber: 1,
    title: 'Understanding Aadhaar',
    description: 'Learn about Aadhaar and its importance in government schemes',
    duration: '10 minutes',
    content: `
      <h2>What is Aadhaar?</h2>
      <p>Aadhaar is a 12-digit unique identification number issued by the Unique Identification Authority of India (UIDAI) to all Indian residents.</p>
      
      <h3>Key Features:</h3>
      <ul>
        <li>✅ Unique 12-digit number</li>
        <li>✅ Based on biometric and demographic data</li>
        <li>✅ Valid proof of identity and address</li>
        <li>✅ Mandatory for many government services</li>
      </ul>

      <h3>Why is Aadhaar Important?</h3>
      <p>Aadhaar serves as a universal identity proof and is essential for:</p>
      <ul>
        <li>Opening bank accounts</li>
        <li>Getting SIM cards</li>
        <li>Filing income tax returns</li>
        <li>Receiving government subsidies and scholarships</li>
      </ul>

      <h3>Aadhaar vs Aadhaar Enrollment Number</h3>
      <p><strong>Important:</strong> Your Aadhaar number (12 digits) is different from your Enrollment ID (14 digits). For bank linking, you need your Aadhaar number.</p>
    `,
    order: 1
  },
  {
    moduleNumber: 2,
    title: 'What is DBT?',
    description: 'Understanding Direct Benefit Transfer and its benefits',
    duration: '12 minutes',
    content: `
      <h2>Direct Benefit Transfer (DBT)</h2>
      <p>DBT is a mechanism through which the government directly transfers subsidies and benefits into the bank accounts of beneficiaries.</p>
      
      <h3>How DBT Works:</h3>
      <ol>
        <li>Government identifies eligible beneficiaries</li>
        <li>Beneficiary's Aadhaar is linked to their bank account</li>
        <li>Benefits are transferred directly to the account</li>
        <li>No intermediaries involved</li>
      </ol>

      <h3>Benefits of DBT:</h3>
      <ul>
        <li>✅ Faster disbursement of funds</li>
        <li>✅ Reduced corruption and leakages</li>
        <li>✅ Transparency in transactions</li>
        <li>✅ Direct credit to beneficiary accounts</li>
        <li>✅ No need for physical verification</li>
      </ul>

      <h3>DBT for Scholarships:</h3>
      <p>For students, DBT ensures that scholarship money reaches directly to your bank account without delays. This is why having a DBT-enabled account is crucial!</p>
    `,
    order: 2
  },
  {
    moduleNumber: 3,
    title: 'Linking Your Bank Account',
    description: 'Step-by-step guide to link Aadhaar with your bank account',
    duration: '15 minutes',
    content: `
      <h2>How to Link Aadhaar with Your Bank Account</h2>
      
      <h3>Method 1: Visit Your Bank Branch</h3>
      <ol>
        <li>Visit your bank branch</li>
        <li>Fill Aadhaar-Bank linking form</li>
        <li>Provide Aadhaar number and a photocopy</li>
        <li>Submit the form to bank officer</li>
        <li>Linking will be done within 2-3 days</li>
      </ol>

      <h3>Method 2: Through ATM</h3>
      <ol>
        <li>Insert your debit card in ATM</li>
        <li>Enter PIN</li>
        <li>Go to 'Services' or 'Registration'</li>
        <li>Select 'Aadhaar Registration'</li>
        <li>Enter your 12-digit Aadhaar number</li>
        <li>Confirm the details</li>
      </ol>

      <h3>Method 3: Internet Banking</h3>
      <ol>
        <li>Login to your net banking account</li>
        <li>Go to 'My Account' or 'Profile'</li>
        <li>Select 'Link Aadhaar'</li>
        <li>Enter Aadhaar number</li>
        <li>Submit and verify</li>
      </ol>

      <h3>Documents Required:</h3>
      <ul>
        <li>Original Aadhaar card</li>
        <li>Bank account passbook</li>
        <li>Valid ID proof</li>
      </ul>
    `,
    order: 3
  },
  {
    moduleNumber: 4,
    title: 'Common Mistakes to Avoid',
    description: 'Learn about common errors students make and how to avoid them',
    duration: '10 minutes',
    content: `
      <h2>Common Mistakes Students Make</h2>
      
      <h3>Mistake #1: Not Linking Aadhaar at All</h3>
      <p>Many students assume their account is automatically linked. Always verify!</p>

      <h3>Mistake #2: Wrong Aadhaar Number</h3>
      <p>Double-check your Aadhaar number before submitting. Even one wrong digit will cause rejection.</p>

      <h3>Mistake #3: Name Mismatch</h3>
      <p>Your name on Aadhaar should match your bank records. Minor spelling differences can cause issues.</p>
      <p><strong>Solution:</strong> Get your name corrected in either Aadhaar or bank records.</p>

      <h3>Mistake #4: Using Enrollment Number Instead of Aadhaar</h3>
      <p>Enrollment number (14 digits) ≠ Aadhaar number (12 digits). Always use Aadhaar number!</p>

      <h3>Mistake #5: Not Enabling DBT</h3>
      <p>Linking Aadhaar is not enough. You must specifically enable DBT on your account.</p>

      <h3>Mistake #6: Inactive Bank Account</h3>
      <p>If your account has been inactive for long, it might be frozen. Do a small transaction to activate it.</p>

      <h3>How to Avoid These Mistakes:</h3>
      <ul>
        <li>✅ Verify Aadhaar-bank linking status online</li>
        <li>✅ Visit PFMS website to check DBT status</li>
        <li>✅ Keep account active with regular transactions</li>
        <li>✅ Maintain accurate records</li>
      </ul>
    `,
    order: 4
  },
  {
    moduleNumber: 5,
    title: 'Complete Documentation Guide',
    description: 'All documents needed and verification process explained',
    duration: '18 minutes',
    content: `
      <h2>Documents Required for DBT Enablement</h2>
      
      <h3>Essential Documents:</h3>
      <ul>
        <li>📄 Aadhaar Card (original + photocopy)</li>
        <li>📄 Bank Account Passbook</li>
        <li>📄 Student ID Card</li>
        <li>📄 Scholarship Application Form</li>
      </ul>

      <h3>Verification Process:</h3>
      <ol>
        <li><strong>Step 1:</strong> Link Aadhaar with bank account</li>
        <li><strong>Step 2:</strong> Verify linking on bank website/app</li>
        <li><strong>Step 3:</strong> Check DBT status on PFMS portal</li>
        <li><strong>Step 4:</strong> Enable DBT if not enabled</li>
        <li><strong>Step 5:</strong> Apply for scholarship with correct details</li>
      </ol>

      <h3>How to Check DBT Status:</h3>
      <ol>
        <li>Visit <strong>pfms.nic.in</strong></li>
        <li>Click on "Know Your Payment"</li>
        <li>Enter your bank account number and Aadhaar</li>
        <li>Complete captcha verification</li>
        <li>Check if DBT is enabled</li>
      </ol>

      <h3>Important Points:</h3>
      <ul>
        <li>✅ Keep photocopies of all documents</li>
        <li>✅ Verify all details before submission</li>
        <li>✅ Follow up regularly on application status</li>
        <li>✅ Save all transaction IDs and reference numbers</li>
      </ul>

      <h3>Contact Information:</h3>
      <p><strong>PFMS Helpdesk:</strong> 1800-118-111<br/>
      <strong>Aadhaar Helpline:</strong> 1947<br/>
      <strong>NSP Helpdesk:</strong> 0120-6619540</p>
    `,
    order: 5
  }
];

// Sample Quiz Questions
const quizQuestions = [
  {
    question: 'What does DBT stand for?',
    options: [
      'Digital Bank Transfer',
      'Direct Benefit Transfer',
      'Database Transfer',
      'Direct Banking Transaction'
    ],
    correctAnswer: 1,
    explanation: 'DBT stands for Direct Benefit Transfer, which is a mechanism to transfer subsidies directly to beneficiaries.',
    moduleNumber: 2
  },
  {
    question: 'How many digits are there in an Aadhaar number?',
    options: ['10 digits', '12 digits', '14 digits', '16 digits'],
    correctAnswer: 1,
    explanation: 'Aadhaar number is a unique 12-digit identification number.',
    moduleNumber: 1
  },
  {
    question: 'Which of the following is TRUE about DBT-enabled accounts?',
    options: [
      'Only available for business accounts',
      'Can receive government scholarships directly',
      'Requires monthly maintenance charges',
      'Only for senior citizens'
    ],
    correctAnswer: 1,
    explanation: 'DBT-enabled accounts can receive government benefits and scholarships directly without intermediaries.',
    moduleNumber: 2
  },
  {
    question: 'What is the difference between Aadhaar-linked and DBT-enabled accounts?',
    options: [
      'There is no difference',
      'Aadhaar-linked is just identification, DBT-enabled can receive benefits',
      'DBT-enabled accounts charge more fees',
      'Aadhaar-linked accounts are better'
    ],
    correctAnswer: 1,
    explanation: 'Aadhaar-linked accounts are only for identification, while DBT-enabled accounts can receive direct government benefits.',
    moduleNumber: 2
  },
  {
    question: 'Where can you check if your account is DBT-enabled?',
    options: [
      'At any police station',
      'PFMS portal (pfms.nic.in)',
      'Post office',
      'Aadhaar center only'
    ],
    correctAnswer: 1,
    explanation: 'You can check your DBT status on the PFMS (Public Financial Management System) portal at pfms.nic.in.',
    moduleNumber: 5
  },
  {
    question: 'Which document is essential for linking Aadhaar to your bank account?',
    options: [
      'Passport',
      'Driving License',
      'Aadhaar Card',
      'Voter ID'
    ],
    correctAnswer: 2,
    explanation: 'Aadhaar Card is the essential document required for linking Aadhaar to your bank account.',
    moduleNumber: 3
  },
  {
    question: 'What is the main benefit of DBT for students?',
    options: [
      'Lower interest rates',
      'Faster scholarship disbursement',
      'Free debit cards',
      'Higher credit limits'
    ],
    correctAnswer: 1,
    explanation: 'The main benefit is faster and direct scholarship disbursement without delays or intermediaries.',
    moduleNumber: 2
  },
  {
    question: 'Can you link Aadhaar to your bank account through internet banking?',
    options: [
      'No, only at bank branch',
      'Yes, most banks allow it',
      'Only for savings accounts',
      'Only with special permission'
    ],
    correctAnswer: 1,
    explanation: 'Most banks allow Aadhaar linking through internet banking, ATM, or mobile banking apps.',
    moduleNumber: 3
  },
  {
    question: 'What should you do if your name on Aadhaar does not match your bank records?',
    options: [
      'Ignore it',
      'Get it corrected in either Aadhaar or bank records',
      'Create a new bank account',
      'Apply for a new Aadhaar'
    ],
    correctAnswer: 1,
    explanation: 'Name mismatches can cause issues. You should get your name corrected in either Aadhaar or bank records to match.',
    moduleNumber: 4
  },
  {
    question: 'What is the Aadhaar helpline number?',
    options: [
      '100',
      '1947',
      '1800',
      '1234'
    ],
    correctAnswer: 1,
    explanation: 'The Aadhaar helpline number is 1947 for any queries related to Aadhaar services.',
    moduleNumber: 5
  },
  {
    question: 'Which is NOT a method to link Aadhaar with your bank account?',
    options: [
      'Visit bank branch',
      'Through ATM',
      'Send SMS',
      'Internet banking'
    ],
    correctAnswer: 2,
    explanation: 'You cannot link Aadhaar through SMS. The valid methods are bank visit, ATM, internet banking, or mobile banking.',
    moduleNumber: 3
  },
  {
    question: 'Why is it important to keep your bank account active?',
    options: [
      'To earn more interest',
      'To avoid account freezing',
      'To get free gifts',
      'No importance'
    ],
    correctAnswer: 1,
    explanation: 'Inactive accounts can be frozen, which will prevent you from receiving DBT benefits. Regular small transactions keep it active.',
    moduleNumber: 4
  },
  {
    question: 'Who issues the Aadhaar number?',
    options: [
      'Reserve Bank of India',
      'UIDAI',
      'Ministry of Finance',
      'State Government'
    ],
    correctAnswer: 1,
    explanation: 'UIDAI (Unique Identification Authority of India) is the government body that issues Aadhaar numbers.',
    moduleNumber: 1
  },
  {
    question: 'What happens if you enter wrong Aadhaar number while linking?',
    options: [
      'Nothing, it will auto-correct',
      'Linking will be rejected',
      'You will receive a fine',
      'Account will be closed'
    ],
    correctAnswer: 1,
    explanation: 'Even a single wrong digit in Aadhaar number will cause the linking process to be rejected.',
    moduleNumber: 4
  },
  {
    question: 'How long does it take to link Aadhaar at a bank branch?',
    options: [
      '24 hours',
      '2-3 days',
      '1 week',
      '1 month'
    ],
    correctAnswer: 1,
    explanation: 'When you submit the Aadhaar linking form at a bank branch, the process typically takes 2-3 days to complete.',
    moduleNumber: 3
  }
];

// Seed Function
const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB Connected');

    // Clear existing data
    await Module.deleteMany({});
    await Quiz.deleteMany({});
    console.log('🗑️  Cleared existing data');

    // Insert modules
    await Module.insertMany(modules);
    console.log('📚 Modules added:', modules.length);

    // Insert quiz questions
    await Quiz.insertMany(quizQuestions);
    console.log('❓ Quiz questions added:', quizQuestions.length);

    console.log('✅ Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

// Run seed
seedDatabase();