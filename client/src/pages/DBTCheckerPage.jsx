import { useState } from 'react';
import { checkDBTStatus, verifyAadhaar, getBankDetails } from '../utils/api';

function DBTCheckerPage() {
  const [formData, setFormData] = useState({
    accountNumber: '',
    ifscCode: '',
    aadhaarNumber: ''
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [step, setStep] = useState(1);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Format inputs
    let formattedValue = value;
    if (name === 'ifscCode') {
      formattedValue = value.toUpperCase();
    } else if (name === 'aadhaarNumber' || name === 'accountNumber') {
      formattedValue = value.replace(/\D/g, ''); // Only numbers
    }

    setFormData({ ...formData, [name]: formattedValue });
    setError('');
  };

  const handleVerifyAadhaar = async () => {
    if (formData.aadhaarNumber.length !== 12) {
      setError('Aadhaar must be 12 digits');
      return;
    }

    setLoading(true);
    try {
      const response = await verifyAadhaar({ aadhaarNumber: formData.aadhaarNumber });
      if (response.data.valid) {
        setStep(2);
        setError('');
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError('Error verifying Aadhaar');
    } finally {
      setLoading(false);
    }
  };

  const handleCheckStatus = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    setResult(null);

    try {
      const response = await checkDBTStatus(formData);
      setResult(response.data.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Error checking DBT status');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({ accountNumber: '', ifscCode: '', aadhaarNumber: '' });
    setResult(null);
    setError('');
    setStep(1);
  };

  return (
    <div style={{ padding: '40px 20px', backgroundColor: '#f5f5f5', minHeight: 'calc(100vh - 200px)' }}>
      <div className="container" style={{ maxWidth: '900px' }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{ fontSize: '64px', marginBottom: '16px' }}>🔍</div>
          <h1 style={{ fontSize: '36px', color: '#1a4d8f', marginBottom: '12px' }}>
            DBT Status Checker
          </h1>
          <p style={{ fontSize: '18px', color: '#666' }}>
            Verify if your bank account is ready to receive scholarships
          </p>
        </div>

        {!result ? (
          <>
            {/* Info Alert */}
            <div className="alert alert-info" style={{ marginBottom: '32px' }}>
              <strong>📌 What you'll need:</strong><br />
              • Your 12-digit Aadhaar number<br />
              • Bank account number<br />
              • IFSC code (found on cheque or passbook)
            </div>

            {/* Form */}
            <div className="card">
              <form onSubmit={handleCheckStatus}>
                
                {/* Step 1: Aadhaar Verification */}
                {step === 1 && (
                  <div>
                    <h3 style={{ fontSize: '20px', marginBottom: '20px', color: '#1a4d8f' }}>
                      Step 1: Verify Aadhaar Number
                    </h3>
                    
                    <div>
                      <label htmlFor="aadhaarNumber">Aadhaar Number *</label>
                      <input
                        type="text"
                        id="aadhaarNumber"
                        name="aadhaarNumber"
                        value={formData.aadhaarNumber}
                        onChange={handleChange}
                        maxLength="12"
                        placeholder="Enter 12-digit Aadhaar number"
                        required
                      />
                      <p style={{ fontSize: '12px', color: '#666', marginTop: '-8px' }}>
                        Example: 123456789012
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={handleVerifyAadhaar}
                      className="btn btn-primary"
                      style={{ width: '100%' }}
                      disabled={loading || formData.aadhaarNumber.length !== 12}
                    >
                      {loading ? 'Verifying...' : 'Verify & Continue →'}
                    </button>
                  </div>
                )}

                {/* Step 2: Bank Details */}
                {step === 2 && (
                  <div>
                    <h3 style={{ fontSize: '20px', marginBottom: '20px', color: '#1a4d8f' }}>
                      Step 2: Enter Bank Details
                    </h3>

                    <div style={{ marginBottom: '16px', padding: '12px', backgroundColor: '#e8f5e9', borderRadius: '4px' }}>
                      <strong>✓ Aadhaar Verified:</strong> {formData.aadhaarNumber.replace(/(\d{4})(\d{4})(\d{4})/, '$1-$2-$3')}
                    </div>

                    {/* Account Number */}
                    <div>
                      <label htmlFor="accountNumber">Bank Account Number *</label>
                      <input
                        type="text"
                        id="accountNumber"
                        name="accountNumber"
                        value={formData.accountNumber}
                        onChange={handleChange}
                        placeholder="Enter your bank account number"
                        required
                      />
                    </div>

                    {/* IFSC Code */}
                    <div>
                      <label htmlFor="ifscCode">IFSC Code *</label>
                      <input
                        type="text"
                        id="ifscCode"
                        name="ifscCode"
                        value={formData.ifscCode}
                        onChange={handleChange}
                        maxLength="11"
                        placeholder="e.g., SBIN0001234"
                        required
                      />
                      <p style={{ fontSize: '12px', color: '#666', marginTop: '-8px' }}>
                        Found on cheque or bank passbook
                      </p>
                    </div>

                    <div style={{ display: 'flex', gap: '12px' }}>
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="btn btn-outline"
                        style={{ flex: 1 }}
                      >
                        ← Back
                      </button>
                      <button
                        type="submit"
                        className="btn btn-success"
                        style={{ flex: 2 }}
                        disabled={loading}
                      >
                        {loading ? 'Checking Status...' : 'Check DBT Status ✓'}
                      </button>
                    </div>
                  </div>
                )}

                {error && (
                  <div className="alert alert-error" style={{ marginTop: '20px' }}>
                    {error}
                  </div>
                )}
              </form>
            </div>
          </>
        ) : (
          <>
            {/* Results */}
            <div className="card" style={{ marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h2 style={{ fontSize: '24px', color: '#1a4d8f', margin: 0 }}>
                  Verification Results
                </h2>
                <span style={{
                  padding: '8px 16px',
                  borderRadius: '20px',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  backgroundColor: result.overallStatus === 'READY' ? '#e8f5e9' : '#fff3e0',
                  color: result.overallStatus === 'READY' ? '#138808' : '#ff9933'
                }}>
                  {result.overallStatus === 'READY' ? '✓ READY FOR SCHOLARSHIPS' : '⚠️ ACTION REQUIRED'}
                </span>
              </div>

              {/* Account Info */}
              <div style={{ padding: '16px', backgroundColor: '#f9f9f9', borderRadius: '8px', marginBottom: '24px' }}>
                <p style={{ margin: '4px 0', fontSize: '14px' }}>
                  <strong>Bank:</strong> {result.bankName}
                </p>
                <p style={{ margin: '4px 0', fontSize: '14px' }}>
                  <strong>Account:</strong> {result.accountNumber}
                </p>
                <p style={{ margin: '4px 0', fontSize: '14px' }}>
                  <strong>Aadhaar:</strong> {result.aadhaarNumber}
                </p>
                <p style={{ margin: '4px 0', fontSize: '14px' }}>
                  <strong>IFSC:</strong> {result.ifscCode}
                </p>
              </div>

              {/* Status Checks */}
              <h3 style={{ fontSize: '18px', marginBottom: '16px', color: '#1a4d8f' }}>
                Verification Checklist
              </h3>

              <div style={{ display: 'grid', gap: '12px' }}>
                {Object.entries(result.checks).map(([key, check]) => (
                  <div
                    key={key}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: '12px',
                      backgroundColor: check.status ? '#e8f5e9' : '#ffebee',
                      borderLeft: `4px solid ${check.status ? '#138808' : '#c41e3a'}`,
                      borderRadius: '4px'
                    }}
                  >
                    <span style={{ fontSize: '24px', marginRight: '12px' }}>
                      {check.status ? '✅' : '❌'}
                    </span>
                    <span style={{ fontSize: '14px' }}>{check.message}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommendations */}
            {result.recommendations && result.recommendations.length > 0 && (
              <div className="card">
                <h3 style={{ fontSize: '20px', marginBottom: '16px', color: '#1a4d8f' }}>
                  {result.overallStatus === 'READY' ? '🎉 Next Steps' : '📋 Action Items'}
                </h3>

                {result.recommendations.map((rec, index) => (
                  <div key={index} style={{ marginBottom: '20px' }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      marginBottom: '8px'
                    }}>
                      <span style={{
                        padding: '4px 8px',
                        borderRadius: '4px',
                        fontSize: '12px',
                        fontWeight: 'bold',
                        backgroundColor: 
                          rec.priority === 'HIGH' ? '#ffebee' :
                          rec.priority === 'MEDIUM' ? '#fff3e0' : '#e8f5e9',
                        color:
                          rec.priority === 'HIGH' ? '#c41e3a' :
                          rec.priority === 'MEDIUM' ? '#ff9933' : '#138808'
                      }}>
                        {rec.priority}
                      </span>
                      <h4 style={{ fontSize: '16px', margin: 0 }}>{rec.action}</h4>
                    </div>
                    <ol style={{ marginLeft: '20px', lineHeight: '1.8' }}>
                      {rec.steps.map((step, idx) => (
                        <li key={idx} style={{ fontSize: '14px', color: '#666' }}>{step}</li>
                      ))}
                    </ol>
                  </div>
                ))}
              </div>
            )}

            {/* Actions */}
            <div style={{ display: 'flex', gap: '12px', marginTop: '24px', flexWrap: 'wrap' }}>
              <button
                onClick={resetForm}
                className="btn btn-primary"
              >
                Check Another Account
              </button>
              <button
                onClick={() => window.print()}
                className="btn btn-outline"
              >
                📄 Print Report
              </button>
            </div>
          </>
        )}

        {/* Help Section */}
        <div className="card" style={{ marginTop: '32px', backgroundColor: '#f0f7ff', border: '2px solid #1a4d8f' }}>
          <h3 style={{ fontSize: '18px', marginBottom: '12px', color: '#1a4d8f' }}>
            Need Help?
          </h3>
          <div style={{ fontSize: '14px', lineHeight: '1.8' }}>
            <p><strong>📞 PFMS Helpline:</strong> 1800-118-111</p>
            <p><strong>📞 Aadhaar Helpline:</strong> 1947</p>
            <p><strong>🌐 Official Website:</strong> pfms.nic.in</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DBTCheckerPage;