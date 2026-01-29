function Footer() {
  return (
    <footer style={{ backgroundColor: '#1a4d8f', color: 'white', padding: '32px 0', marginTop: '60px' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '32px', marginBottom: '24px' }}>
          
          {/* About Section */}
          <div>
            <h3 style={{ marginBottom: '16px' }}>About ScholarSure</h3>
            <p style={{ fontSize: '14px', lineHeight: '1.6', opacity: 0.9 }}>
              An initiative by the Ministry of Social Justice & Empowerment to create awareness about DBT-enabled Aadhaar-seeded bank accounts for seamless scholarship disbursement.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 style={{ marginBottom: '16px' }}>Quick Links</h3>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ marginBottom: '8px' }}><a href="https://socialjustice.gov.in" style={{ color: 'white', textDecoration: 'none', opacity: 0.9 }}>Ministry Website</a></li>
              <li style={{ marginBottom: '8px' }}><a href="https://pfms.nic.in" style={{ color: 'white', textDecoration: 'none', opacity: 0.9 }}>PFMS Portal</a></li>
              <li style={{ marginBottom: '8px' }}><a href="https://scholarships.gov.in" style={{ color: 'white', textDecoration: 'none', opacity: 0.9 }}>NSP Portal</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 style={{ marginBottom: '16px' }}>Contact Us</h3>
            <p style={{ fontSize: '14px', lineHeight: '1.8', opacity: 0.9 }}>
              📧 support@scholarsure.gov.in<br />
              📞 1800-XXX-XXXX (Toll Free)<br />
              🕐 Mon-Fri: 9:00 AM - 6:00 PM
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.2)', paddingTop: '20px', textAlign: 'center' }}>
          <p style={{ fontSize: '14px', opacity: 0.8 }}>
            © 2025 Government of India. All Rights Reserved. | Designed for Smart India Hackathon 2025
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;