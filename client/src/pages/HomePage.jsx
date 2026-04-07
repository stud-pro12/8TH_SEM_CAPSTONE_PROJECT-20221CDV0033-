import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section style={{ background: 'linear-gradient(135deg, #ff9933 0%, #1a4d8f 100%)', color: 'white', padding: '80px 20px', textAlign: 'center' }}>
        <div className="container">
          <div style={{ fontSize: '64px', marginBottom: '16px' }}>🎓</div>
          <h1 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '16px' }}>Welcome to ScholarSure</h1>
          <p style={{ fontSize: '20px', marginBottom: '32px', maxWidth: '700px', margin: '0 auto 32px' }}>
            Understanding DBT-Enabled Bank Accounts for Faster Scholarship Disbursement
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/register" className="btn" style={{ padding: '16px 32px', backgroundColor: 'white', color: '#1a4d8f', fontSize: '18px', fontWeight: 'bold', textDecoration: 'none', borderRadius: '4px' }}>
              Get Started Free
            </Link>
            <Link to="/login" className="btn btn-outline" style={{ padding: '16px 32px', backgroundColor: 'transparent', color: 'white', border: '2px solid white', fontSize: '18px', fontWeight: 'bold', textDecoration: 'none', borderRadius: '4px' }}>
              Login
            </Link>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section style={{ padding: '60px 20px', backgroundColor: 'white' }}>
        <div className="container">
          <h2 style={{ fontSize: '36px', textAlign: 'center', marginBottom: '48px', color: '#1a4d8f' }}>Why ScholarSure?</h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
            
            {/* Card 1 */}
            <div className="card" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>⚠️</div>
              <h3 style={{ fontSize: '22px', marginBottom: '12px', color: '#c41e3a' }}>The Problem</h3>
              <p style={{ color: '#666' }}>
                Students face scholarship delays because they don't understand the difference between Aadhaar-linked and DBT-enabled accounts.
              </p>
            </div>

            {/* Card 2 */}
            <div className="card" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>✅</div>
              <h3 style={{ fontSize: '22px', marginBottom: '12px', color: '#138808' }}>Our Solution</h3>
              <p style={{ color: '#666' }}>
                Interactive learning modules, quizzes, and step-by-step guidance to make your account DBT-ready in minutes.
              </p>
            </div>

            {/* Card 3 */}
            <div className="card" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>🏆</div>
              <h3 style={{ fontSize: '22px', marginBottom: '12px', color: '#ff9933' }}>Get Certified</h3>
              <p style={{ color: '#666' }}>
                Complete all modules, pass the quiz, and earn a government-recognized certificate of completion.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={{ padding: '60px 20px', backgroundColor: '#f5f5f5' }}>
        <div className="container">
          <h2 style={{ fontSize: '36px', textAlign: 'center', marginBottom: '48px', color: '#1a4d8f' }}>What You'll Learn</h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px' }}>
            
            <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '8px', borderLeft: '4px solid #1a4d8f' }}>
              <h4 style={{ fontSize: '18px', marginBottom: '8px' }}>📚 Module 1: Understanding Aadhaar</h4>
              <p style={{ fontSize: '14px', color: '#666' }}>Learn what Aadhaar is and why it matters</p>
            </div>

            <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '8px', borderLeft: '4px solid #ff9933' }}>
              <h4 style={{ fontSize: '18px', marginBottom: '8px' }}>💰 Module 2: What is DBT?</h4>
              <p style={{ fontSize: '14px', color: '#666' }}>Direct Benefit Transfer explained simply</p>
            </div>

            <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '8px', borderLeft: '4px solid #138808' }}>
              <h4 style={{ fontSize: '18px', marginBottom: '8px' }}>🔗 Module 3: Linking Your Account</h4>
              <p style={{ fontSize: '14px', color: '#666' }}>Step-by-step account linking process</p>
            </div>

            <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '8px', borderLeft: '4px solid #c41e3a' }}>
              <h4 style={{ fontSize: '18px', marginBottom: '8px' }}>❌ Module 4: Common Mistakes</h4>
              <p style={{ fontSize: '14px', color: '#666' }}>Avoid these pitfalls in your application</p>
            </div>

            <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '8px', borderLeft: '4px solid #1a4d8f' }}>
              <h4 style={{ fontSize: '18px', marginBottom: '8px' }}>📝 Module 5: Complete Guide</h4>
              <p style={{ fontSize: '14px', color: '#666' }}>Documents and verification process</p>
            </div>
        

            <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '8px', borderLeft: '4px solid #ff9933' }}>
              <h4 style={{ fontSize: '18px', marginBottom: '8px' }}>🎯 Final Quiz</h4>
              <p style={{ fontSize: '14px', color: '#666' }}>Test your knowledge and get certified</p>
            </div>
          </div>
        </div>
      </section>

      {/* NEW SECTION - Eligibility */}
      <section style={{ padding: '60px 20px', backgroundColor: 'white' }}>
        <div className="container">
          <h2 style={{ fontSize: '36px', textAlign: 'center', marginBottom: '48px', color: '#1a4d8f' }}>
            Who Should Use ScholarSure?
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '48px' }}>
            
            {/* Card 1 */}
            <div className="card" style={{ textAlign: 'center', borderTop: '4px solid #1a4d8f' }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>🎓</div>
              <h3 style={{ fontSize: '20px', marginBottom: '12px', color: '#1a4d8f' }}>College Students</h3>
              <p style={{ color: '#666', fontSize: '15px' }}>
                Undergraduate and postgraduate students applying for government scholarships under SC, ST, OBC, and minority schemes.
              </p>
            </div>

            {/* Card 2 */}
            <div className="card" style={{ textAlign: 'center', borderTop: '4px solid #ff9933' }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>🏫</div>
              <h3 style={{ fontSize: '20px', marginBottom: '12px', color: '#ff9933' }}>School Students</h3>
              <p style={{ color: '#666', fontSize: '15px' }}>
                Class 9-12 students applying for pre-matric and post-matric scholarships through the National Scholarship Portal.
              </p>
            </div>

            {/* Card 3 */}
            <div className="card" style={{ textAlign: 'center', borderTop: '4px solid #138808' }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>👨‍👩‍👧‍👦</div>
              <h3 style={{ fontSize: '20px', marginBottom: '12px', color: '#138808' }}>Parents & Guardians</h3>
              <p style={{ color: '#666', fontSize: '15px' }}>
                Parents helping their children understand DBT requirements and ensuring their bank accounts are scholarship-ready.
              </p>
            </div>

            {/* Card 4 */}
            <div className="card" style={{ textAlign: 'center', borderTop: '4px solid #c41e3a' }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>🏛️</div>
              <h3 style={{ fontSize: '20px', marginBottom: '12px', color: '#c41e3a' }}>College Staff</h3>
              <p style={{ color: '#666', fontSize: '15px' }}>
                Scholarship coordinators, administrators, and faculty guiding students through the scholarship application process.
              </p>
            </div>

            {/* Card 5 */}
            <div className="card" style={{ textAlign: 'center', borderTop: '4px solid #1a4d8f' }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>💼</div>
              <h3 style={{ fontSize: '20px', marginBottom: '12px', color: '#1a4d8f' }}>Job Seekers</h3>
              <p style={{ color: '#666', fontSize: '15px' }}>
                Unemployed youth applying for skill development and employment generation scheme scholarships.
              </p>
            </div>

            {/* Card 6 */}
            <div className="card" style={{ textAlign: 'center', borderTop: '4px solid #ff9933' }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>🌾</div>
              <h3 style={{ fontSize: '20px', marginBottom: '12px', color: '#ff9933' }}>Rural Students</h3>
              <p style={{ color: '#666', fontSize: '15px' }}>
                Students from rural areas with limited access to digital literacy resources and banking guidance.
              </p>
            </div>

          </div>

          {/* Scholarship Schemes Covered */}
          <div style={{ backgroundColor: '#f0f7ff', padding: '32px', borderRadius: '8px', marginTop: '32px' }}>
            <h3 style={{ fontSize: '24px', textAlign: 'center', marginBottom: '24px', color: '#1a4d8f' }}>
              📋 Scholarship Schemes Covered
            </h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
              
              <div style={{ padding: '16px', backgroundColor: 'white', borderRadius: '4px', borderLeft: '3px solid #1a4d8f' }}>
                <strong style={{ color: '#1a4d8f' }}>Pre-Matric Scholarships</strong>
                <p style={{ fontSize: '14px', color: '#666', margin: '8px 0 0 0' }}>
                  For SC, ST, OBC students in Classes 9-10
                </p>
              </div>

              <div style={{ padding: '16px', backgroundColor: 'white', borderRadius: '4px', borderLeft: '3px solid #ff9933' }}>
                <strong style={{ color: '#ff9933' }}>Post-Matric Scholarships</strong>
                <p style={{ fontSize: '14px', color: '#666', margin: '8px 0 0 0' }}>
                  For SC, ST, OBC students in Classes 11-12 and higher education
                </p>
              </div>

              <div style={{ padding: '16px', backgroundColor: 'white', borderRadius: '4px', borderLeft: '3px solid #138808' }}>
                <strong style={{ color: '#138808' }}>Merit-cum-Means Scholarships</strong>
                <p style={{ fontSize: '14px', color: '#666', margin: '8px 0 0 0' }}>
                  For minority community students
                </p>
              </div>

              <div style={{ padding: '16px', backgroundColor: 'white', borderRadius: '4px', borderLeft: '3px solid #c41e3a' }}>
                <strong style={{ color: '#c41e3a' }}>Central Sector Schemes</strong>
                <p style={{ fontSize: '14px', color: '#666', margin: '8px 0 0 0' }}>
                  For meritorious students from economically weaker sections
                </p>
              </div>

              <div style={{ padding: '16px', backgroundColor: 'white', borderRadius: '4px', borderLeft: '3px solid #1a4d8f' }}>
                <strong style={{ color: '#1a4d8f' }}>State Government Schemes</strong>
                <p style={{ fontSize: '14px', color: '#666', margin: '8px 0 0 0' }}>
                  Various state-specific scholarship programs
                </p>
              </div>

              <div style={{ padding: '16px', backgroundColor: 'white', borderRadius: '4px', borderLeft: '3px solid #ff9933' }}>
                <strong style={{ color: '#ff9933' }}>PWD Scholarships</strong>
                <p style={{ fontSize: '14px', color: '#666', margin: '8px 0 0 0' }}>
                  For students with disabilities
                </p>
              </div>

            </div>
          </div>

          {/* Who Benefits Most */}
          <div style={{ marginTop: '48px', textAlign: 'center' }}>
            <h3 style={{ fontSize: '24px', marginBottom: '24px', color: '#1a4d8f' }}>
              ✨ This Platform is Especially Helpful For:
            </h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', maxWidth: '900px', margin: '0 auto' }}>
              
              <div style={{ padding: '16px', backgroundColor: '#e8f5e9', borderRadius: '8px' }}>
                <div style={{ fontSize: '32px', marginBottom: '8px' }}>🆕</div>
                <strong style={{ fontSize: '16px', color: '#138808' }}>First-Time Applicants</strong>
                <p style={{ fontSize: '13px', color: '#666', margin: '4px 0 0 0' }}>
                  Learn everything from scratch
                </p>
              </div>

              <div style={{ padding: '16px', backgroundColor: '#fff3e0', borderRadius: '8px' }}>
                <div style={{ fontSize: '32px', marginBottom: '8px' }}>❌</div>
                <strong style={{ fontSize: '16px', color: '#ff9933' }}>Rejected Applicants</strong>
                <p style={{ fontSize: '13px', color: '#666', margin: '4px 0 0 0' }}>
                  Fix account issues and reapply
                </p>
              </div>

              <div style={{ padding: '16px', backgroundColor: '#f3e5f5', borderRadius: '8px' }}>
                <div style={{ fontSize: '32px', marginBottom: '8px' }}>🌏</div>
                <strong style={{ fontSize: '16px', color: '#7b1fa2' }}>Non-English Speakers</strong>
                <p style={{ fontSize: '13px', color: '#666', margin: '4px 0 0 0' }}>
                  Available in 10+ Indian languages
                </p>
              </div>

              <div style={{ padding: '16px', backgroundColor: '#e3f2fd', borderRadius: '8px' }}>
                <div style={{ fontSize: '32px', marginBottom: '8px' }}>📱</div>
                <strong style={{ fontSize: '16px', color: '#1976d2' }}>Rural Area Students</strong>
                <p style={{ fontSize: '13px', color: '#666', margin: '4px 0 0 0' }}>
                  Works on basic phones via SMS
                </p>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* Stats Section */}
      <section style={{ padding: '60px 20px', backgroundColor: '#1a4d8f', color: 'white' }}></section>

      {/* Stats Section */}
      <section style={{ padding: '60px 20px', backgroundColor: '#1a4d8f', color: 'white' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '32px', textAlign: 'center' }}>
            
            <div>
              <div style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '8px' }}>10,000+</div>
              <p style={{ fontSize: '18px', opacity: 0.9 }}>Students Enrolled</p>
            </div>

            <div>
              <div style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '8px' }}>5</div>
              <p style={{ fontSize: '18px', opacity: 0.9 }}>Learning Modules</p>
            </div>

            <div>
              <div style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '8px' }}>95%</div>
              <p style={{ fontSize: '18px', opacity: 0.9 }}>Success Rate</p>
            </div>

            <div>
              <div style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '8px' }}>24/7</div>
              <p style={{ fontSize: '18px', opacity: 0.9 }}>Available Online</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ padding: '80px 20px', textAlign: 'center', backgroundColor: 'white' }}>
        <div className="container">
          <h2 style={{ fontSize: '36px', marginBottom: '16px', color: '#1a4d8f' }}>Ready to Get Started?</h2>
          <p style={{ fontSize: '18px', color: '#666', marginBottom: '32px', maxWidth: '600px', margin: '0 auto 32px' }}>
            Join thousands of students who have successfully enabled their DBT accounts
          </p>
          <Link to="/register" className="btn btn-primary" style={{ padding: '16px 48px', fontSize: '18px', textDecoration: 'none' }}>
            Register Now - It's Free!
          </Link>
        </div>
      </section>
    </div>
  );
}

export default HomePage;