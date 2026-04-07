import { Link } from 'react-router-dom';

function Navbar({ user, logout }) {
  return (
    <nav className="gov-header" style={{ padding: '12px 0', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
        
        {/* Logo Section */}
        <Link to="/" style={{ textDecoration: 'none', color: 'white', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ fontSize: '32px' }}>🇮🇳</div>
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0 }}>ScholarSure</h1>
            <p style={{ fontSize: '12px', margin: 0, opacity: 0.9 }}>Ministry of Social Justice & Empowerment</p>
          </div>
        </Link>

        {/* Navigation Links */}
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginTop: '8px' }}>
          {!user ? (
            <>
              <Link to="/" style={{ color: 'white', textDecoration: 'none', fontWeight: '500' }}>Home</Link>
              <Link to="/login" className="btn btn-outline" style={{ padding: '8px 16px', backgroundColor: 'white', color: 'var(--primary-color)', borderRadius: '4px' }}>Login</Link>
              <Link to="/register" className="btn btn-secondary" style={{ padding: '8px 16px' }}>Register</Link>
            </>
          ) : (
            <>
              <Link to="/dashboard" style={{ color: 'white', textDecoration: 'none', fontWeight: '500' }}>Dashboard</Link>
              <Link to="/modules" style={{ color: 'white', textDecoration: 'none', fontWeight: '500' }}>Learn</Link>
              <Link to="/quiz" style={{ color: 'white', textDecoration: 'none', fontWeight: '500' }}>Quiz</Link>
              <Link to="/profile" style={{ color: 'white', textDecoration: 'none', fontWeight: '500' }}>Profile</Link>
              <Link to="/dbt-checker" style={{ color: 'white', textDecoration: 'none', fontWeight: '500' }}>DBT Checker</Link>
              <button onClick={logout} className="btn btn-outline" style={{ padding: '8px 16px', backgroundColor: 'white', color: 'var(--danger-color)', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Logout</button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;