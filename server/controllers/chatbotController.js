import { GoogleGenerativeAI } from '@google/generative-ai';

// Multi-language fallback responses
const fallbackResponses = {
  English: {
    'what is dbt': 'DBT stands for Direct Benefit Transfer. It\'s a government mechanism to transfer subsidies and scholarships directly to your bank account. This eliminates middlemen and ensures faster, transparent disbursement. To receive DBT, your bank account must be Aadhaar-linked AND DBT-enabled. Check your status at pfms.nic.in 🏦',
    'difference': 'Great question! Aadhaar-linked account means your Aadhaar is connected to your bank for identification only. DBT-enabled account means your account can RECEIVE government benefits directly. You need BOTH! First link Aadhaar, then enable DBT separately. 📝',
    'how to link': 'You can link Aadhaar in 3 ways:\n1. Visit bank branch with Aadhaar card\n2. Use ATM (Services → Aadhaar Registration)\n3. Net banking (My Account → Link Aadhaar)\nIt takes 2-3 days to process. ✅',
    'check status': 'To check DBT status:\n1. Visit pfms.nic.in\n2. Click "Know Your Payment"\n3. Enter account number + Aadhaar\n4. See if DBT is enabled ✓',
    'default': 'I\'m here to help with DBT and Aadhaar questions! 😊\n\nI can help with:\n- What is DBT?\n- Link Aadhaar to bank\n- Check DBT status\n- Scholarship delays\n\nNeed help? Call 1800-118-111 📞'
  },
  Hindi: {
    'what is dbt': 'DBT का मतलब है Direct Benefit Transfer (सीधे लाभ हस्तांतरण)। यह सरकार का एक तरीका है जिससे छात्रवृत्ति सीधे आपके बैंक खाते में आती है। DBT पाने के लिए, आपका बैंक खाता आधार से जुड़ा और DBT-enabled होना चाहिए। अपनी स्थिति pfms.nic.in पर जांचें 🏦',
    'difference': 'बढ़िया सवाल! आधार-लिंक्ड खाता मतलब सिर्फ पहचान के लिए आधार जुड़ा है। DBT-enabled खाता मतलब सरकारी लाभ मिल सकता है। आपको दोनों चाहिए! पहले आधार लिंक करें, फिर DBT enable करें। 📝',
    'how to link': 'आधार लिंक करने के 3 तरीके:\n1. बैंक शाखा में आधार कार्ड लेकर जाएं\n2. ATM का उपयोग करें (Services → Aadhaar Registration)\n3. नेट बैंकिंग (My Account → Link Aadhaar)\n2-3 दिन लगते हैं ✅',
    'check status': 'DBT स्थिति जांचने के लिए:\n1. pfms.nic.in पर जाएं\n2. "Know Your Payment" पर क्लिक करें\n3. खाता नंबर + आधार डालें\n4. देखें DBT enabled है या नहीं ✓',
    'default': 'मैं DBT और आधार के बारे में मदद के लिए हूं! 😊\n\nमैं इसमें मदद कर सकता हूं:\n- DBT क्या है?\n- आधार बैंक से कैसे जोड़ें\n- DBT स्थिति जांचें\n- छात्रवृत्ति में देरी\n\nमदद चाहिए? कॉल करें 1800-118-111 📞'
  },
  Tamil: {
    'what is dbt': 'DBT என்றால் நேரடி நன்மை பரிமாற்றம். இது உதவித்தொகையை நேரடியாக உங்கள் வங்கிக் கணக்கில் அனுப்ப அரசாங்கம் பயன்படுத்தும் முறை. DBT பெற, உங்கள் கணக்கு ஆதார் இணைக்கப்பட்டு DBT-enabled ஆக இருக்க வேண்டும். pfms.nic.in-ல் சரிபார்க்கவும் 🏦',
    'difference': 'நல்ல கேள்வி! ஆதார்-இணைக்கப்பட்ட கணக்கு என்றால் அடையாளத்திற்காக மட்டும் ஆதார் இணைக்கப்பட்டது. DBT-enabled கணக்கு என்றால் அரசு நன்மைகளைப் பெற முடியும். இரண்டும் தேவை! முதலில் ஆதார் இணைக்கவும், பிறகு DBT செயல்படுத்தவும். 📝',
    'how to link': 'ஆதார் இணைக்க 3 வழிகள்:\n1. ஆதார் அட்டையுடன் வங்கிக் கிளைக்குச் செல்லவும்\n2. ATM பயன்படுத்தவும் (Services → Aadhaar Registration)\n3. நெட் பேங்கிங் (My Account → Link Aadhaar)\n2-3 நாட்கள் ஆகும் ✅',
    'check status': 'DBT நிலையை சரிபார்க்க:\n1. pfms.nic.in செல்லவும்\n2. "Know Your Payment" கிளிக் செய்யவும்\n3. கணக்கு எண் + ஆதார் உள்ளிடவும்\n4. DBT செயல்படுத்தப்பட்டதா என்று பார்க்கவும் ✓',
    'default': 'நான் DBT மற்றும் ஆதார் கேள்விகளுக்கு உதவ இங்கே இருக்கிறேன்! 😊\n\nநான் உதவ முடியும்:\n- DBT என்றால் என்ன?\n- ஆதாரை வங்கியுடன் இணைக்க\n- DBT நிலையை சரிபார்க்க\n- உதவித்தொகை தாமதம்\n\nஉதவி தேவையா? அழைக்கவும் 1800-118-111 📞'
  },
  Telugu: {
    'what is dbt': 'DBT అంటే ప్రత్యక్ష ప్రయోజన బదిలీ. ఇది స్కాలర్‌షిప్‌లను నేరుగా మీ బ్యాంక్ ఖాతాకు బదిలీ చేయడానికి ప్రభుత్వం ఉపయోగించే విధానం. DBT పొందడానికి, మీ ఖాతా ఆధార్-లింక్ మరియు DBT-enabled ఉండాలి. pfms.nic.in లో తనిఖీ చేయండి 🏦',
    'difference': 'మంచి ప్రశ్న! ఆధార్-లింక్డ్ ఖాతా అంటే గుర్తింపు కోసం మాత్రమే ఆధార్ కనెక్ట్ చేయబడింది. DBT-enabled ఖాతా అంటే ప్రభుత్వ ప్రయోజనాలు పొందగలరు. రెండూ కావాలి! మొదట ఆధార్ లింక్ చేయండి, తర్వాత DBT ఎనేబుల్ చేయండి। 📝',
    'how to link': 'ఆధార్ లింక్ చేయడానికి 3 మార్గాలు:\n1. ఆధార్ కార్డుతో బ్యాంక్ శాఖకు వెళ్ళండి\n2. ATM ఉపయోగించండి (Services → Aadhaar Registration)\n3. నెట్ బ్యాంకింగ్ (My Account → Link Aadhaar)\n2-3 రోజులు పడుతుంది ✅',
    'check status': 'DBT స్థితిని తనిఖీ చేయడానికి:\n1. pfms.nic.in కు వెళ్ళండి\n2. "Know Your Payment" క్లిక్ చేయండి\n3. ఖాతా నంబర్ + ఆధార్ నమోదు చేయండి\n4. DBT ఎనేబుల్ చేయబడిందో లేదో చూడండి ✓',
    'default': 'నేను DBT మరియు ఆధార్ ప్రశ్నలకు సహాయం చేయడానికి ఇక్కడ ఉన్నాను! 😊\n\nనేను సహాయం చేయగలను:\n- DBT అంటే ఏమిటి?\n- బ్యాంక్‌తో ఆధార్ లింక్ చేయడం\n- DBT స్థితిని తనిఖీ చేయడం\n- స్కాలర్‌షిప్ ఆలస్యం\n\nసహాయం కావాలా? కాల్ చేయండి 1800-118-111 📞'
  },
  Bengali: {
    'what is dbt': 'DBT মানে সরাসরি সুবিধা স্থানান্তর। এটি সরকারের একটি পদ্ধতি যা বৃত্তি সরাসরি আপকার ব্যাংক অ্যাকাউন্টে পাঠায়। DBT পেতে, আপনার অ্যাকাউন্ট আধার-লিঙ্কড এবং DBT-enabled হতে হবে। pfms.nic.in এ চেক করুন 🏦',
    'difference': 'ভালো প্রশ্ন! আধার-লিঙ্কড অ্যাকাউন্ট মানে শুধু পরিচয়ের জন্য আধার যুক্ত। DBT-enabled অ্যাকাউন্ট মানে সরকারি সুবিধা পেতে পারবেন। দুটোই দরকার! প্রথমে আধার লিঙ্ক করুন, তারপর DBT সক্ষম করুন। 📝',
    'how to link': 'আধার লিঙ্ক করার 3টি উপায়:\n1. আধার কার্ড নিয়ে ব্যাংক শাখায় যান\n2. ATM ব্যবহার করুন (Services → Aadhaar Registration)\n3. নেট ব্যাংকিং (My Account → Link Aadhaar)\n2-3 দিন সময় লাগে ✅',
    'check status': 'DBT স্ট্যাটাস চেক করতে:\n1. pfms.nic.in এ যান\n2. "Know Your Payment" ক্লিক করুন\n3. অ্যাকাউন্ট নম্বর + আধার দিন\n4. DBT সক্ষম আছে কিনা দেখুন ✓',
    'default': 'আমি DBT এবং আধার প্রশ্নে সাহায্য করতে এখানে আছি! 😊\n\nআমি সাহায্য করতে পারি:\n- DBT কী?\n- ব্যাংকের সাথে আধার লিঙ্ক\n- DBT স্ট্যাটাস চেক\n- বৃত্তি বিলম্ব\n\nসাহায্য চাই? কল করুন 1800-118-111 📞'
  },
  Marathi: {
    'what is dbt': 'DBT म्हणजे थेट लाभ हस्तांतरण। ही एक सरकारी यंत्रणा आहे जी शिष्यवृत्ती थेट तुमच्या बँक खात्यात पाठवते। DBT मिळविण्यासाठी, तुमचे खाते आधार-लिंक्ड आणि DBT-enabled असणे आवश्यक आहे। pfms.nic.in वर तपासा 🏦',
    'difference': 'छान प्रश्न! आधार-लिंक्ड खाते म्हणजे फक्त ओळखीसाठी आधार जोडलेले. DBT-enabled खाते म्हणजे सरकारी लाभ मिळू शकतात। दोन्ही हवे! प्रथम आधार लिंक करा, नंतर DBT सक्षम करा। 📝',
    'how to link': 'आधार लिंक करण्याचे 3 मार्ग:\n1. आधार कार्डसह बँक शाखेत जा\n2. ATM वापरा (Services → Aadhaar Registration)\n3. नेट बँकिंग (My Account → Link Aadhaar)\n2-3 दिवस लागतात ✅',
    'check status': 'DBT स्थिती तपासण्यासाठी:\n1. pfms.nic.in वर जा\n2. "Know Your Payment" क्लिक करा\n3. खाते क्रमांक + आधार टाका\n4. DBT सक्षम आहे का ते पहा ✓',
    'default': 'मी DBT आणि आधार प्रश्नांसाठी मदत करण्यासाठी येथे आहे! 😊\n\nमी मदत करू शकतो:\n- DBT म्हणजे काय?\n- बँकेशी आधार लिंक करा\n- DBT स्थिती तपासा\n- शिष्यवृत्ती विलंब\n\nमदत हवी? कॉल करा 1800-118-111 📞'
  },
  Gujarati: {
    'what is dbt': 'DBT નો અર્થ છે સીધો લાભ ટ્રાન્સફર। આ સરકારી પદ્ધતિ છે જે શિષ્યવૃત્તિ સીધી તમારા બેંક ખાતામાં મોકલે છે। DBT મેળવવા માટે, તમારું ખાતું આધાર-લિંક્ડ અને DBT-enabled હોવું જોઈએ। pfms.nic.in પર તપાસો 🏦',
    'difference': 'સારો પ્રશ્ન! આધાર-લિંક્ડ ખાતાનો અર્થ માત્ર ઓળખ માટે આધાર જોડાયેલું. DBT-enabled ખાતાનો અર્થ સરકારી લાભ મળી શકે. બંને જોઈએ! પહેલા આધાર લિંક કરો, પછી DBT સક્ષમ કરો। 📝',
    'how to link': 'આધાર લિંક કરવાની 3 રીતો:\n1. આધાર કાર્ડ સાથે બેંક શાખામાં જાઓ\n2. ATM વાપરો (Services → Aadhaar Registration)\n3. નેટ બેંકિંગ (My Account → Link Aadhaar)\n2-3 દિવસ લાગે છે ✅',
    'check status': 'DBT સ્થિતિ તપાસવા માટે:\n1. pfms.nic.in પર જાઓ\n2. "Know Your Payment" ક્લિક કરો\n3. ખાતા નંબર + આધાર નાખો\n4. DBT સક્ષમ છે કે નહીં તે જુઓ ✓',
    'default': 'હું DBT અને આધાર પ્રશ્નો માટે મદદ કરવા અહીં છું! 😊\n\nહું મદદ કરી શકું છું:\n- DBT શું છે?\n- બેંક સાથે આધાર લિંક\n- DBT સ્થિતિ તપાસો\n- શિષ્યવૃત્તિ વિલંબ\n\nમદદ જોઈએ? કૉલ કરો 1800-118-111 📞'
  }
};

const genAI = process.env.GEMINI_API_KEY ? new GoogleGenerativeAI(process.env.GEMINI_API_KEY) : null;

// Find best matching fallback response in selected language
const findFallbackResponse = (message, language = 'English') => {
  const responses = fallbackResponses[language] || fallbackResponses['English'];
  const lowerMessage = message.toLowerCase();
  
  // Check for keyword matches
  for (const [keywords, response] of Object.entries(responses)) {
    if (keywords === 'default') continue;
    if (lowerMessage.includes(keywords) || keywords.split(' ').some(word => lowerMessage.includes(word))) {
      return response;
    }
  }
  
  // Return default response in selected language
  return responses['default'];
};

export const sendMessage = async (req, res) => {
  try {
    const { message, language = 'English', conversationHistory = [] } = req.body;

    console.log('📩 Received message:', message);
    console.log('🌐 Language:', language);

    if (!message) {
      return res.status(400).json({ message: 'Message is required' });
    }

    // Try Gemini API first if available
    if (genAI && process.env.GEMINI_API_KEY) {
      try {
        const model = genAI.getGenerativeModel({ 
          model: 'gemini-1.5-flash',
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 300,
          }
        });

        // Enhanced system prompt with STRONG language enforcement
        const systemPrompt = `You are ScholarBot, an expert assistant helping Indian students understand DBT (Direct Benefit Transfer) and Aadhaar for government scholarships.

CRITICAL RULES:
1. LANGUAGE: You MUST respond ONLY in ${language} language. DO NOT use English or any other language.
2. LENGTH: Keep responses SHORT - maximum 3-4 sentences.
3. TONE: Be friendly, helpful, and encouraging. Use emojis.
4. FOCUS: Only answer questions about DBT, Aadhaar, scholarships, and related banking topics.
5. HELPLINE: For complex issues, suggest calling 1800-118-111 (PFMS) or 1947 (Aadhaar).

KEY INFORMATION:
- DBT = Direct Benefit Transfer (scholarships go directly to bank account)
- Aadhaar-linked account = only for identification
- DBT-enabled account = can receive government benefits
- Students need BOTH Aadhaar-linked AND DBT-enabled accounts
- Check DBT status at: pfms.nic.in
- Link Aadhaar: Bank branch, ATM, or net banking

${language !== 'English' ? `IMPORTANT: Your entire response must be in ${language}. Not a single word in English!` : ''}`;

        // Build conversation context
        let prompt = systemPrompt + '\n\n';
        
        // Add recent conversation history (last 3 messages for context)
        const recentHistory = conversationHistory.slice(-3);
        if (recentHistory.length > 0) {
          prompt += 'Previous conversation:\n';
          recentHistory.forEach(msg => {
            prompt += `${msg.role === 'user' ? 'Student' : 'Bot'}: ${msg.content}\n`;
          });
          prompt += '\n';
        }
        
        prompt += `Student's current question: ${message}\n\nYour response in ${language}:`;

        console.log('🤖 Calling Gemini API...');
        
        const result = await Promise.race([
          model.generateContent(prompt),
          new Promise((_, reject) => 
            setTimeout(() => reject(new Error('Timeout')), 10000)
          )
        ]);

        const response = await result.response;
        let botReply = response.text().trim();

        // Clean up response
        botReply = botReply.replace(/\*\*/g, ''); // Remove markdown bold
        botReply = botReply.replace(/^Bot:\s*/i, ''); // Remove "Bot:" prefix if present

        console.log('✅ Gemini API success');
        console.log('💬 Response:', botReply.substring(0, 100) + '...');

        return res.json({
          success: true,
          reply: botReply,
          source: 'ai',
          language: language,
          timestamp: new Date()
        });

      } catch (apiError) {
        console.log('⚠️ Gemini API failed:', apiError.message);
        console.log('📝 Using fallback responses in', language);
        // Continue to fallback
      }
    } else {
      console.log('⚠️ No Gemini API key, using fallback');
    }

    // Fallback to rule-based responses in selected language
    const fallbackReply = findFallbackResponse(message, language);

    res.json({
      success: true,
      reply: fallbackReply,
      source: 'fallback',
      language: language,
      timestamp: new Date()
    });

  } catch (error) {
    console.error('❌ Chatbot error:', error.message);
    
    // Emergency fallback in user's language
    const emergencyMessages = {
      'English': `I'm having technical difficulties, but I'm still here to help! 😊\n\nFor immediate assistance:\n📞 PFMS: 1800-118-111\n📞 Aadhaar: 1947`,
      'Hindi': `मुझे तकनीकी समस्या हो रही है, लेकिन मैं अभी भी मदद के लिए हूं! 😊\n\nतुरंत सहायता के लिए:\n📞 PFMS: 1800-118-111\n📞 आधार: 1947`,
      'Tamil': `எனக்கு தொழில்நுட்ப சிக்கல் உள்ளது, ஆனால் நான் இன்னும் உதவ இங்கே இருக்கிறேன்! 😊\n\nஉடனடி உதவிக்கு:\n📞 PFMS: 1800-118-111\n📞 ஆதார்: 1947`,
      'Telugu': `నాకు సాంకేతిక సమస్యలు ఉన్నాయి, కానీ నేను ఇప్పటికీ సహాయం చేయడానికి ఇక్కడ ఉన్నాను! 😊\n\nత్వరిత సహాయం కోసం:\n📞 PFMS: 1800-118-111\n📞 ఆధార్: 1947`,
      'Bengali': `আমার প্রযুক্তিগত সমস্যা হচ্ছে, কিন্তু আমি এখনও সাহায্য করতে এখানে আছি! 😊\n\nতাৎক্ষণিক সহায়তার জন্য:\n📞 PFMS: 1800-118-111\n📞 আধার: 1947`,
      'Marathi': `मला तांत्रिक अडचणी येत आहेत, पण मी अजूनही मदतीसाठी येथे आहे! 😊\n\nत्वरित मदतीसाठी:\n📞 PFMS: 1800-118-111\n📞 आधार: 1947`,
      'Gujarati': `મને ટેકનિકલ સમસ્યાઓ આવી રહી છે, પરંતુ હું હજુ પણ મદદ માટે અહીં છું! 😊\n\nત્વરિત સહાય માટે:\n📞 PFMS: 1800-118-111\n📞 આધાર: 1947`
    };

    const lang = req.body.language || 'English';
    res.json({
      success: true,
      reply: emergencyMessages[lang] || emergencyMessages['English'],
      source: 'emergency',
      language: lang,
      timestamp: new Date()
    });
  }
};

export const getSuggestedQuestions = async (req, res) => {
  try {
    const suggestions = [
      {
        id: 1,
        question: "What is the difference between Aadhaar-linked and DBT-enabled account?",
        category: "DBT Basics"
      },
      {
        id: 2,
        question: "How do I link my Aadhaar to my bank account?",
        category: "Account Linking"
      },
      {
        id: 3,
        question: "How can I check if my account is DBT-enabled?",
        category: "Verification"
      },
      {
        id: 4,
        question: "What documents do I need for scholarship application?",
        category: "Documentation"
      },
      {
        id: 5,
        question: "My scholarship is delayed, what should I do?",
        category: "Troubleshooting"
      },
      {
        id: 6,
        question: "What are the helpline numbers?",
        category: "Contact Info"
      }
    ];

    res.json({ success: true, suggestions });
  } catch (error) {
    console.error('Error getting suggestions:', error);
    res.status(500).json({ message: 'Failed to get suggestions' });
  }
};

export const translateMessage = async (req, res) => {
  try {
    const { text, targetLanguage } = req.body;

    res.json({
      success: true,
      translation: text,
      originalText: text,
      targetLanguage,
      note: 'Translation service temporarily unavailable'
    });

  } catch (error) {
    console.error('Translation error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Translation failed'
    });
  }
};