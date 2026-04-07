import axios from 'axios';

// Simulate DBT verification (since actual PFMS API requires government access)
// In production, this would connect to real PFMS API

export const checkDBTStatus = async (req, res) => {
  try {
    const { accountNumber, ifscCode, aadhaarNumber } = req.body;

    console.log('🔍 DBT Check Request:', { accountNumber, ifscCode, aadhaarNumber });

    // Validate inputs
    if (!accountNumber || !ifscCode || !aadhaarNumber) {
      return res.status(400).json({
        success: false,
        message: 'Account number, IFSC code, and Aadhaar number are required'
      });
    }

    // Validate Aadhaar format (12 digits)
    if (!/^\d{12}$/.test(aadhaarNumber)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid Aadhaar number. Must be 12 digits.'
      });
    }

    // Validate IFSC format
    if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(ifscCode)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid IFSC code format'
      });
    }

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // DEMO LOGIC - In production, call actual PFMS API
    // For demo, we'll use account number pattern to determine status
    
    const lastDigit = parseInt(accountNumber.slice(-1));
    const isLinked = lastDigit >= 0; // All accounts are linked for demo
    const isDbtEnabled = lastDigit % 2 === 0; // Even last digit = DBT enabled
    const nameMatch = lastDigit >= 3; // Simulate name matching

    // Get bank name from IFSC
    const bankName = getBankNameFromIFSC(ifscCode);

    const response = {
      success: true,
      data: {
        accountNumber: maskAccountNumber(accountNumber),
        aadhaarNumber: maskAadhaar(aadhaarNumber),
        bankName: bankName,
        ifscCode: ifscCode,
        checks: {
          aadhaarLinked: {
            status: isLinked,
            message: isLinked 
              ? 'Your Aadhaar is linked to this bank account ✓' 
              : 'Aadhaar is NOT linked to this account ✗'
          },
          dbtEnabled: {
            status: isDbtEnabled,
            message: isDbtEnabled 
              ? 'DBT is ENABLED on this account ✓' 
              : 'DBT is NOT enabled on this account ✗'
          },
          nameMatch: {
            status: nameMatch,
            message: nameMatch 
              ? 'Name matches between Aadhaar and bank records ✓' 
              : 'Name mismatch detected ⚠️'
          },
          accountActive: {
            status: true,
            message: 'Bank account is active ✓'
          }
        },
        overallStatus: (isLinked && isDbtEnabled && nameMatch) ? 'READY' : 'ACTION_REQUIRED',
        verificationDate: new Date().toISOString(),
        pfmsRegistered: isDbtEnabled
      }
    };

    // Add recommendations based on status
    const recommendations = [];

    if (!isLinked) {
      recommendations.push({
        priority: 'HIGH',
        action: 'Link Aadhaar to Bank Account',
        steps: [
          'Visit your bank branch with original Aadhaar card',
          'Fill Aadhaar-Bank linking form',
          'Submit with Aadhaar photocopy',
          'Linking takes 2-3 working days'
        ]
      });
    }

    if (!isDbtEnabled) {
      recommendations.push({
        priority: 'HIGH',
        action: 'Enable DBT on Your Account',
        steps: [
          'Visit bank branch with linked Aadhaar',
          'Request DBT enablement',
          'Bank will register account with PFMS',
          'Verification takes 3-5 working days'
        ]
      });
    }

    if (!nameMatch) {
      recommendations.push({
        priority: 'MEDIUM',
        action: 'Correct Name Mismatch',
        steps: [
          'Check spelling on Aadhaar vs Bank passbook',
          'Visit bank to update name if incorrect',
          'OR visit Aadhaar center to update name',
          'Ensure exact match including middle name'
        ]
      });
    }

    if (isLinked && isDbtEnabled && nameMatch) {
      recommendations.push({
        priority: 'LOW',
        action: 'You\'re All Set!',
        steps: [
          'Your account is ready to receive scholarships',
          'Apply for scholarships on NSP portal',
          'Keep account active with regular transactions',
          'Save this verification report for records'
        ]
      });
    }

    response.data.recommendations = recommendations;

    res.json(response);

  } catch (error) {
    console.error('❌ DBT Check Error:', error);
    res.status(500).json({
      success: false,
      message: 'Error checking DBT status. Please try again.',
      error: error.message
    });
  }
};

// Verify Aadhaar number format
export const verifyAadhaar = async (req, res) => {
  try {
    const { aadhaarNumber } = req.body;

    if (!aadhaarNumber) {
      return res.status(400).json({
        success: false,
        message: 'Aadhaar number is required'
      });
    }

    // Validate format
    if (!/^\d{12}$/.test(aadhaarNumber)) {
      return res.status(400).json({
        success: false,
        valid: false,
        message: 'Invalid Aadhaar format. Must be exactly 12 digits.'
      });
    }

    // Verhoeff algorithm check (basic validation)
    const isValid = verifyVerhoeffChecksum(aadhaarNumber);

    res.json({
      success: true,
      valid: isValid,
      message: isValid 
        ? 'Aadhaar number format is valid ✓' 
        : 'Invalid Aadhaar number. Please check and try again.',
      maskedAadhaar: maskAadhaar(aadhaarNumber)
    });

  } catch (error) {
    console.error('❌ Aadhaar Verify Error:', error);
    res.status(500).json({
      success: false,
      message: 'Error verifying Aadhaar'
    });
  }
};

// Get bank details from IFSC
export const getBankDetails = async (req, res) => {
  try {
    const { ifscCode } = req.body;

    if (!ifscCode) {
      return res.status(400).json({
        success: false,
        message: 'IFSC code is required'
      });
    }

    // Validate IFSC format
    if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(ifscCode)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid IFSC code format'
      });
    }

    const bankName = getBankNameFromIFSC(ifscCode);
    
    res.json({
      success: true,
      bank: {
        name: bankName,
        ifsc: ifscCode,
        branch: 'Main Branch' // In production, fetch from API
      }
    });

  } catch (error) {
    console.error('❌ Bank Details Error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching bank details'
    });
  }
};

// Helper Functions

function maskAccountNumber(accountNumber) {
  if (accountNumber.length <= 4) return accountNumber;
  return 'X'.repeat(accountNumber.length - 4) + accountNumber.slice(-4);
}

function maskAadhaar(aadhaar) {
  if (aadhaar.length !== 12) return aadhaar;
  return 'XXXX-XXXX-' + aadhaar.slice(-4);
}

function getBankNameFromIFSC(ifsc) {
  const bankCodes = {
    'SBIN': 'State Bank of India',
    'HDFC': 'HDFC Bank',
    'ICIC': 'ICICI Bank',
    'PUNB': 'Punjab National Bank',
    'UBIN': 'Union Bank of India',
    'CNRB': 'Canara Bank',
    'BARB': 'Bank of Baroda',
    'IDIB': 'Indian Bank',
    'IOBA': 'Indian Overseas Bank',
    'KKBK': 'Kotak Mahindra Bank',
    'AXIS': 'Axis Bank',
    'YESB': 'Yes Bank',
    'INDB': 'IndusInd Bank',
    'FDRL': 'Federal Bank',
    'SRCB': 'Saraswat Bank'
  };

  const code = ifsc.substring(0, 4);
  return bankCodes[code] || 'Unknown Bank';
}

function verifyVerhoeffChecksum(aadhaar) {
  // Simplified Verhoeff algorithm for demo
  // In production, use full algorithm
  const digits = aadhaar.split('').map(Number);
  
  // Basic validation
  const sum = digits.reduce((acc, digit, index) => {
    return acc + digit * (index + 1);
  }, 0);
  
  return sum % 10 === 0; // Simplified check
}