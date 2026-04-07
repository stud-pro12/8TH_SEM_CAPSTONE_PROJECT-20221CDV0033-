import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllModules } from '../utils/api';

function ModulesPage({ user }) {
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);

  // Default modules if database is empty
  const defaultModules = [
    {
      moduleNumber: 1,
      title: 'Understanding Aadhaar',
      description: 'Learn about Aadhaar and its importance in government schemes',
      duration: '10 minutes',
      order: 1
    },
    {
      moduleNumber: 2,
      title: 'What is DBT?',
      description: 'Understanding Direct Benefit Transfer and its benefits',
      duration: '12 minutes',
      order: 2
    },
    {
      moduleNumber: 3,
      title: 'Linking Your Bank Account',
      description: 'Step-by-step guide to link Aadhaar with your bank account',
      duration: '15 minutes',
      order: 3
    },
    {
      moduleNumber: 4,
      title: 'Common Mistakes to Avoid',
      description: 'Learn about common errors students make and how to avoid them',
      duration: '10 minutes',
      order: 4
    },
    {
      moduleNumber: 5,
      title: 'Complete Documentation Guide',
      description: 'All documents needed and verification process explained',
      duration: '18 minutes',
      order: 5
    }
  ];

  useEffect(() => {
    fetchModules();
  }, []);

  const fetchModules = async () => {
    try {
      const response = await getAllModules();
      if (response.data.modules.length > 0) {
        setModules(response.data.modules);
      } else {
        setModules(defaultModules);
      }
    } catch (error) {
      console.error('Error fetching modules:', error);
      setModules(defaultModules);
    } finally {
      setLoading(false);
    }
  };

  const isModuleCompleted = (moduleNumber) => {
    return user.completedModules?.includes(moduleNumber) || false;
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div style={{ padding: '40px 20px', backgroundColor: '#f5f5f5', minHeight: 'calc(100vh - 200px)' }}>
      <div className="container">
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{ fontSize: '36px', color: '#1a4d8f', marginBottom: '12px' }}>Learning Modules</h1>
          <p style={{ fontSize: '18px', color: '#666' }}>
            Complete all 5 modules to master DBT account knowledge
          </p>
        </div>

        {/* Modules List */}
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          {modules.map((module, index) => (
            <Link 
              key={module.moduleNumber} 
              to={`/modules/${module.moduleNumber}`}
              style={{ textDecoration: 'none', display: 'block', marginBottom: '20px' }}
            >
              <div className="card" style={{ cursor: 'pointer', position: 'relative' }}>
                
                {/* Module Number Badge */}
                <div style={{ 
                  position: 'absolute', 
                  top: '20px', 
                  left: '20px', 
                  width: '50px', 
                  height: '50px', 
                  backgroundColor: isModuleCompleted(module.moduleNumber) ? '#138808' : '#1a4d8f',
                  color: 'white',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '24px',
                  fontWeight: 'bold'
                }}>
                  {isModuleCompleted(module.moduleNumber) ? '✓' : index + 1}
                </div>

                {/* Module Content */}
                <div style={{ marginLeft: '80px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '8px' }}>
                    <h3 style={{ fontSize: '22px', color: '#1a4d8f', margin: 0 }}>
                      {module.title}
                    </h3>
                    {isModuleCompleted(module.moduleNumber) && (
                      <span className="badge badge-success">Completed</span>
                    )}
                  </div>
                  
                  <p style={{ color: '#666', fontSize: '16px', marginBottom: '12px' }}>
                    {module.description}
                  </p>
                  
                  <div style={{ display: 'flex', gap: '16px', fontSize: '14px', color: '#999' }}>
                    <span>⏱️ {module.duration}</span>
                    <span>📖 Module {module.moduleNumber} of 5</span>
                  </div>
                </div>

                {/* Arrow */}
                <div style={{ 
                  position: 'absolute', 
                  right: '20px', 
                  top: '50%', 
                  transform: 'translateY(-50%)',
                  fontSize: '24px',
                  color: '#1a4d8f'
                }}>
                  →
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Next Step */}
        <div className="card" style={{ maxWidth: '800px', margin: '40px auto 0', textAlign: 'center', backgroundColor: '#f0f7ff', border: '2px solid #1a4d8f' }}>
          <h3 style={{ fontSize: '20px', color: '#1a4d8f', marginBottom: '12px' }}>
            📝 Ready for the Quiz?
          </h3>
          <p style={{ color: '#666', marginBottom: '20px' }}>
            Complete all modules and test your knowledge to earn your certificate
          </p>
          <Link to="/quiz" className="btn btn-primary">
            Take the Quiz
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ModulesPage;