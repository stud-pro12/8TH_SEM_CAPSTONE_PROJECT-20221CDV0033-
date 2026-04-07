import twilio from 'twilio';
import User from '../models/User.js';

// Initialize Twilio (will be set up after you provide credentials)
let twilioClient = null;

const initializeTwilio = () => {
  if (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN) {
    twilioClient = twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN
    );
    return true;
  }
  return false;
};

// Send SMS notification
export const sendSMS = async (req, res) => {
  try {
    const { phoneNumber, message, type = 'general' } = req.body;

    if (!phoneNumber || !message) {
      return res.status(400).json({
        success: false,
        message: 'Phone number and message are required'
      });
    }

    // Check if Twilio is configured
    if (!initializeTwilio()) {
      console.log('📱 SMS simulation mode (Twilio not configured)');
      
      // Simulate SMS for demo
      return res.json({
        success: true,
        simulated: true,
        message: 'SMS sent successfully (Simulated)',
        data: {
          to: phoneNumber,
          messageContent: message,
          type: type,
          timestamp: new Date()
        }
      });
    }

    // Format phone number (add +91 for India if not present)
    let formattedPhone = phoneNumber.replace(/\D/g, '');
    if (!formattedPhone.startsWith('91') && formattedPhone.length === 10) {
      formattedPhone = '91' + formattedPhone;
    }
    formattedPhone = '+' + formattedPhone;

    // Send actual SMS via Twilio
    const smsResult = await twilioClient.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: formattedPhone
    });

    console.log('✅ SMS sent:', smsResult.sid);

    res.json({
      success: true,
      message: 'SMS sent successfully',
      data: {
        sid: smsResult.sid,
        to: formattedPhone,
        status: smsResult.status
      }
    });

  } catch (error) {
    console.error('❌ SMS Error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to send SMS',
      error: error.message
    });
  }
};

// Send module completion notification
export const sendModuleCompletionSMS = async (req, res) => {
  try {
    const userId = req.user.id;
    const { moduleNumber } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const message = `🎓 ScholarSure: Congratulations ${user.name}! You've completed Module ${moduleNumber}. ${5 - user.completedModules.length} modules left to earn your certificate. Keep learning! 📚`;

    // Send SMS
    const smsResponse = await sendSMSInternal(user.phone, message);

    res.json({
      success: true,
      message: 'Notification sent',
      notification: smsResponse
    });

  } catch (error) {
    console.error('❌ Module notification error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send notification'
    });
  }
};

// Send quiz completion notification
export const sendQuizCompletionSMS = async (req, res) => {
  try {
    const userId = req.user.id;
    const { score, passed } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    let message;
    if (passed) {
      message = `🏆 ScholarSure: Congratulations ${user.name}! You scored ${score}% and PASSED the quiz! Your certificate is ready to download. Visit your profile to get it. 🎉`;
    } else {
      message = `📚 ScholarSure: Hi ${user.name}, you scored ${score}% in the quiz. You need 80% to pass. Review the modules and try again. You can do it! 💪`;
    }

    const smsResponse = await sendSMSInternal(user.phone, message);

    res.json({
      success: true,
      message: 'Notification sent',
      notification: smsResponse
    });

  } catch (error) {
    console.error('❌ Quiz notification error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send notification'
    });
  }
};

// Send certificate notification
export const sendCertificateSMS = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const message = `🎓 ScholarSure: Congratulations ${user.name}! 🎉 You've earned your DBT Awareness Certificate! Download it from your profile. Your scholarship application is now complete! Apply at scholarships.gov.in`;

    const smsResponse = await sendSMSInternal(user.phone, message);

    res.json({
      success: true,
      message: 'Certificate notification sent',
      notification: smsResponse
    });

  } catch (error) {
    console.error('❌ Certificate notification error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send notification'
    });
  }
};

// Send DBT status notification
export const sendDBTStatusSMS = async (req, res) => {
  try {
    const userId = req.user.id;
    const { status, accountReady } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    let message;
    if (accountReady) {
      message = `✅ ScholarSure: Great news ${user.name}! Your bank account is DBT-enabled and ready to receive scholarships. Apply now at scholarships.gov.in 🎓`;
    } else {
      message = `⚠️ ScholarSure: Hi ${user.name}, your account needs attention. ${status}. Complete the steps to receive scholarships. Check app for details.`;
    }

    const smsResponse = await sendSMSInternal(user.phone, message);

    res.json({
      success: true,
      message: 'DBT status notification sent',
      notification: smsResponse
    });

  } catch (error) {
    console.error('❌ DBT notification error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send notification'
    });
  }
};

// Send welcome SMS
export const sendWelcomeSMS = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const message = `🇮🇳 Welcome to ScholarSure, ${user.name}! Learn about DBT accounts in just 10 minutes and get certified. Complete 5 modules to unlock your certificate. Start now! 🎓`;

    const smsResponse = await sendSMSInternal(user.phone, message);

    res.json({
      success: true,
      message: 'Welcome SMS sent',
      notification: smsResponse
    });

  } catch (error) {
    console.error('❌ Welcome SMS error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send welcome SMS'
    });
  }
};

// Send reminder SMS
export const sendReminderSMS = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const completedModules = user.completedModules?.length || 0;
    const remainingModules = 5 - completedModules;

    let message;
    if (completedModules === 0) {
      message = `📚 ScholarSure Reminder: Hi ${user.name}! You haven't started your modules yet. Just 10 minutes to complete Module 1. Start learning about DBT today! 🎓`;
    } else if (remainingModules > 0) {
      message = `📚 ScholarSure Reminder: Hi ${user.name}! You're ${completedModules}/5 modules done. Only ${remainingModules} modules left to earn your certificate. Continue learning! 💪`;
    } else {
      message = `🎯 ScholarSure Reminder: Hi ${user.name}! All modules complete! Take the quiz to earn your certificate. Score 80% or more. Good luck! 🏆`;
    }

    const smsResponse = await sendSMSInternal(user.phone, message);

    res.json({
      success: true,
      message: 'Reminder sent',
      notification: smsResponse
    });

  } catch (error) {
    console.error('❌ Reminder error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send reminder'
    });
  }
};

// Internal SMS sending function
async function sendSMSInternal(phoneNumber, message) {
  try {
    if (!initializeTwilio()) {
      console.log('📱 SMS (simulated):', message);
      return {
        success: true,
        simulated: true,
        to: phoneNumber,
        message: message,
        timestamp: new Date()
      };
    }

    // Format phone number
    let formattedPhone = phoneNumber.replace(/\D/g, '');
    if (!formattedPhone.startsWith('91') && formattedPhone.length === 10) {
      formattedPhone = '91' + formattedPhone;
    }
    formattedPhone = '+' + formattedPhone;

    // Send SMS
    const result = await twilioClient.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: formattedPhone
    });

    console.log('✅ SMS sent:', result.sid);

    return {
      success: true,
      sid: result.sid,
      to: formattedPhone,
      status: result.status
    };

  } catch (error) {
    console.error('❌ SMS send error:', error.message);
    return {
      success: false,
      error: error.message
    };
  }
}

// Get notification settings
export const getNotificationSettings = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);

    res.json({
      success: true,
      settings: {
        smsEnabled: true,
        phone: user.phone,
        notificationTypes: {
          moduleCompletion: true,
          quizResults: true,
          certificate: true,
          reminders: true,
          dbtStatus: true
        }
      }
    });

  } catch (error) {
    console.error('❌ Get settings error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get notification settings'
    });
  }
};