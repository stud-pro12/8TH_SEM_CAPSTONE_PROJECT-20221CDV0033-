# ScholarSure

AI-Powered Scholarship Readiness Platform for Indian Students

---

## Overview

ScholarSure is a web-based platform designed to help students in India understand and verify whether their bank accounts are ready to receive government scholarships through Direct Benefit Transfer (DBT).

A large number of scholarship delays occur because students are unaware of the difference between Aadhaar-linked accounts and DBT-enabled accounts. ScholarSure addresses this gap by combining structured learning, account verification, AI-based assistance, and SMS notifications into a single platform.

---

## Problem Statement

Government scholarship systems in India process millions of applications every year. A significant portion of these applications are delayed due to incorrect bank account configurations.

Many students assume that linking Aadhaar to their bank account is sufficient. In reality, DBT enablement is also required. This misunderstanding leads to delays, rejections, and financial stress.

---

## Proposed Solution

ScholarSure takes a preventive approach by ensuring that students are properly informed and technically ready before applying for scholarships.

The platform integrates four main components:

* Structured learning modules that simplify complex financial processes
* A DBT verification system to check account readiness
* A multilingual AI chatbot for real-time assistance
* An SMS notification system for offline communication

---

## Features

### Learning Modules

The platform provides five short modules that explain:

* Aadhaar fundamentals
* The concept of DBT
* Bank account linking methods
* Common mistakes during application
* Required documentation

The content is written in simple language and designed for quick completion.

---

### DBT Status Checker

The verification system evaluates whether a student's bank account is ready to receive scholarship funds. It checks:

* Aadhaar linkage
* DBT enablement status
* Name consistency
* Account activity

Based on the results, the system provides clear next steps to resolve issues.

---

### AI Chatbot

The chatbot offers real-time support for student queries related to scholarships, DBT, and banking processes. It supports multiple Indian languages and includes fallback responses to ensure reliability even when external APIs are unavailable.

---

### SMS Notification System

The platform sends important updates via SMS, including:

* Module completion status
* Quiz results
* Certificate availability
* DBT verification outcomes

This ensures accessibility for users with limited or no internet connectivity.

---

## System Architecture

ScholarSure follows a layered architecture built on the MERN stack:

* Frontend: React.js
* Backend: Node.js with Express.js
* Database: MongoDB Atlas
* AI Integration: Google Gemini API
* Messaging: Twilio SMS API

The system is deployed on cloud infrastructure, enabling scalability and high availability.

---

## Security

The platform incorporates multiple security measures:

* Password hashing using bcrypt
* JWT-based authentication
* HTTPS encryption for data transmission
* Masking of Aadhaar numbers (no full storage)
* Server-side validation of all inputs

---

## Results

A pilot study was conducted with 200 students across multiple states. The results showed:

* Significant improvement in understanding of DBT concepts
* High module completion rates compared to typical online learning platforms
* Reduction in scholarship application errors
* Strong engagement with chatbot and verification features

---

## Limitations

* The DBT verification system currently uses simulation logic and does not yet integrate with official PFMS APIs
* SMS functionality is limited by trial usage in development environments
* Administrative dashboards for institutions are not yet implemented

---

## Future Scope

Planned improvements include:

* Integration with official government APIs for real-time verification
* Administrative dashboards for colleges and authorities
* Offline learning capabilities
* WhatsApp-based chatbot integration
* Expansion to cover additional scholarship processes

---

## Tech Stack

* React.js
* Node.js
* Express.js
* MongoDB
* Google Gemini API
* Twilio API

---

## Setup Instructions

```bash
# Clone the repository
git clone https://github.com/your-username/scholarsure.git

# Navigate to project directory
cd scholarsure

# Install dependencies
npm install

# Start frontend
npm run dev

# Start backend
node server.js
```

Environment variables required:

* MongoDB connection URI
* JWT secret key
* Gemini API key
* Twilio credentials

---

## Contribution

Contributions are welcome. You can fork the repository and submit pull requests for improvements or new features.

---

## Author

Tousif Nawaz
B.Tech, Computer Science and DevOps
Presidency University, Bengaluru

---

## License

This project is developed for academic and research purposes and can be extended for public or institutional use.

---
