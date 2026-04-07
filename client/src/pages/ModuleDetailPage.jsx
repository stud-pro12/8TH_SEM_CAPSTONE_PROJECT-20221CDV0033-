import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getModule, updateProgress, sendModuleCompletionNotification } from '../utils/api';


function ModuleDetailPage({ user, setUser }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [module, setModule] = useState(null);
  const [loading, setLoading] = useState(true);

  // Default content if database is empty
  const defaultContent = {
    1: {
      title: 'Understanding Aadhaar',
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
      `
    },
    2: {
      title: 'What is DBT?',
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
      `
    },
    3: {
      title: 'Linking Your Bank Account',
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
      `
    },
    4: {
      title: 'Common Mistakes to Avoid',
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
      `
    },
    5: {
      title: 'Complete Documentation Guide',
      content: `<h2>Documents Required for DBT Enablement</h2>
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
  `
},
};
useEffect(() => {
fetchModule();
}, [id]);
const fetchModule = async () => {
try {
const response = await getModule(id);
setModule(response.data.module);
} catch (error) {
console.error('Error fetching module:', error);
// Use default content if API fails
setModule({
moduleNumber: parseInt(id),
title: defaultContent[id].title,
content: defaultContent[id].content,
duration: '15 minutes'
});
} finally {
setLoading(false);
}
};
const handleComplete = async () => {
    try {
      await updateProgress({ moduleNumber: parseInt(id) });
      
      // Send SMS notification
      try {
        await sendModuleCompletionNotification({ moduleNumber: parseInt(id) });
      } catch (smsError) {
        console.log('SMS notification failed (non-critical):', smsError);
      }
      
      // Update user data in localStorage
      const updatedUser = {
        ...user,
        completedModules: [...(user.completedModules || []), parseInt(id)]
      };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);

      alert('Module completed! ✅ Check your phone for SMS confirmation!');
      
      // Navigate to next module or modules page
      if (parseInt(id) < 5) {
        navigate(`/modules/${parseInt(id) + 1}`);
      } else {
        navigate('/modules');
      }
    } catch (error) {
      console.error('Error updating progress:', error);
      alert('Error marking module as complete. Please try again.');
    }
  };
if (loading) {
return (
<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
<div className="spinner"></div>
</div>
);
}
const isCompleted = user.completedModules?.includes(parseInt(id)) || false;
return (
<div style={{ padding: '40px 20px', backgroundColor: '#f5f5f5', minHeight: 'calc(100vh - 200px)' }}>
<div className="container" style={{ maxWidth: '900px' }}>
    {/* Header */}
    <div style={{ marginBottom: '32px' }}>
      <button 
        onClick={() => navigate('/modules')}
        style={{ 
          background: 'none', 
          border: 'none', 
          color: '#1a4d8f', 
          fontSize: '16px', 
          cursor: 'pointer',
          marginBottom: '16px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}
      >
        ← Back to Modules
      </button>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <span style={{ color: '#666', fontSize: '14px' }}>Module {id} of 5</span>
          <h1 style={{ fontSize: '36px', color: '#1a4d8f', margin: '8px 0' }}>
            {module?.title}
          </h1>
          <p style={{ color: '#666' }}>⏱️ {module?.duration}</p>
        </div>
        
        {isCompleted && (
          <span className="badge badge-success" style={{ fontSize: '16px', padding: '8px 16px' }}>
            ✓ Completed
          </span>
        )}
      </div>
    </div>

    {/* Content */}
    <div className="card" style={{ lineHeight: '1.8', fontSize: '16px' }}>
      <div 
        dangerouslySetInnerHTML={{ __html: module?.content || defaultContent[id].content }}
        style={{ color: '#333' }}
      />
    </div>

    {/* Complete Button */}
    {!isCompleted && (
      <div style={{ marginTop: '32px', textAlign: 'center' }}>
        <button 
          onClick={handleComplete}
          className="btn btn-success"
          style={{ padding: '16px 48px', fontSize: '18px' }}
        >
          Mark as Complete ✓
        </button>
      </div>
    )}

    {/* Navigation */}
    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '32px', flexWrap: 'wrap', gap: '16px' }}>
      {parseInt(id) > 1 && (
        <button 
          onClick={() => navigate(`/modules/${parseInt(id) - 1}`)}
          className="btn btn-outline"
        >
          ← Previous Module
        </button>
      )}
      
      {parseInt(id) < 5 ? (
        <button 
          onClick={() => navigate(`/modules/${parseInt(id) + 1}`)}
          className="btn btn-primary"
          style={{ marginLeft: 'auto' }}
        >
          Next Module →
        </button>
      ) : (
        <button 
          onClick={() => navigate('/quiz')}
          className="btn btn-primary"
          style={{ marginLeft: 'auto' }}
        >
          Take Quiz →
        </button>
      )}
    </div>
  </div>
</div>
);
}
export default ModuleDetailPage;