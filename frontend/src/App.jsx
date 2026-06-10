import React, { useState, useEffect } from 'react';
import { Upload, Activity, History, Trash2, Camera, Info, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

const API_URL = 'http://localhost:8000';

function App() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [error, setError] = useState(null);

  // Load history from localStorage on mount
  useEffect(() => {
    const savedHistory = localStorage.getItem('dr_history');
    if (savedHistory) setHistory(JSON.parse(savedHistory));
  }, []);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type.startsWith('image/')) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
      setError(null);
      setResult(null);
    } else {
      setError('Please select a valid image file (JPEG/PNG).');
    }
  };

  const handleSubmit = async () => {
    if (!file) return;

    setLoading(true);
    setError(null);
    
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch(`${API_URL}/predict`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Failed to analyze image. Ensure backend is running.');
      
      const data = await response.json();
      setResult(data);

      // Save to history
      const newHistory = [
        { 
          id: Date.now(), 
          prediction: data.prediction, 
          confidence: data.confidence, 
          date: new Date().toLocaleString() 
        },
        ...history
      ].slice(0, 5); // Keep last 5
      
      setHistory(newHistory);
      localStorage.setItem('dr_history', JSON.stringify(newHistory));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('dr_history');
  };

  return (
    <div className="auth-container">
      {/* Header */}
      <header style={{ textAlign: 'center', marginBottom: '3rem' }} className="animate-fade">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginBottom: '1rem' }}>
          <Activity size={48} color="#0ea5e9" />
          <h1 style={{ margin: 0 }}>RetinaScan AI</h1>
        </div>
        <p className="subtitle">Advanced Diabetic Retinopathy Detection Portal</p>
        <div style={{ background: 'rgba(234, 179, 8, 0.1)', color: '#eab308', padding: '0.5rem 1rem', borderRadius: '8px', display: 'inline-block', fontSize: '0.875rem', border: '1px solid rgba(234, 179, 8, 0.2)' }}>
          For Educational Purposes Only
        </div>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '2rem' }}>
        {/* Main Section */}
        <main>
          <div className="glass-card animate-fade">
            <h2 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Camera size={24} /> Upload Retinal Scan
            </h2>

            {!preview ? (
              <label className="upload-zone">
                <input type="file" onChange={handleFileChange} hidden accept="image/*" />
                <Upload size={48} style={{ marginBottom: '1rem', color: '#94a3b8' }} />
                <p style={{ fontWeight: 600, color: '#f8fafc' }}>Click to Browse or Drag Fundus Image</p>
                <p style={{ fontSize: '0.875rem', color: '#94a3b8', marginTop: '0.5rem' }}>Supports JPG, PNG (Max 5MB)</p>
              </label>
            ) : (
              <div style={{ textAlign: 'center' }}>
                <img 
                  src={preview} 
                  alt="Preview" 
                  style={{ width: '100%', maxHeight: '400px', objectFit: 'contain', borderRadius: '12px', border: '1px solid var(--border)' }} 
                />
                <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                  <button className="btn-primary" onClick={() => { setFile(null); setPreview(null); setResult(null); }}>
                    Clear Image
                  </button>
                  <button className="btn-primary" onClick={handleSubmit} disabled={loading || result}>
                    {loading ? <><Loader2 className="animate-spin" /> Analyzing...</> : 'Start Diagnosis'}
                  </button>
                </div>
              </div>
            )}

            {error && (
              <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid #ef4444', borderRadius: '12px', color: '#ef4444', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <AlertCircle size={20} /> {error}
              </div>
            )}

            {result && (
              <div className="result-card animate-fade" style={{ background: 'var(--glass)', borderRadius: '16px', border: '1px solid var(--border)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <h3 style={{ color: '#0ea5e9', marginBottom: '0.5rem' }}>Diagnosis Result</h3>
                    <div style={{ fontSize: '1.5rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      {result.prediction}
                      <CheckCircle color="#10b981" />
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ color: '#94a3b8', fontSize: '0.875rem' }}>Confidence</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#10b981' }}>{result.confidence}</div>
                  </div>
                </div>

                <div className="confidence-bar-bg">
                  <div className="confidence-bar-fill" style={{ width: result.confidence }}></div>
                </div>

                <div style={{ marginTop: '1rem', display: 'flex', gap: '0.75rem', background: 'rgba(14, 165, 233, 0.05)', padding: '1rem', borderRadius: '12px' }}>
                  <Info size={20} color="#0ea5e9" style={{ flexShrink: 0 }} />
                  <p style={{ fontSize: '0.95rem', lineHeight: 1.5, color: '#cbd5e1' }}>{result.explanation}</p>
                </div>
              </div>
            )}
          </div>
        </main>

        {/* Sidebar History */}
        <aside>
          <div className="glass-card animate-fade" style={{ minHeight: '400px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem', margin: 0 }}>
                <History size={20} /> Recent Scans
              </h2>
              {history.length > 0 && (
                <button onClick={clearHistory} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}>
                  <Trash2 size={18} />
                </button>
              )}
            </div>

            {history.length === 0 ? (
              <div style={{ textAlign: 'center', color: '#94a3b8', marginTop: '4rem' }}>
                <Activity size={32} style={{ opacity: 0.2, marginBottom: '1rem' }} />
                <p>No recent activity</p>
              </div>
            ) : (
              history.map((item) => (
                <div key={item.id} className="history-item animate-fade">
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>{item.prediction}</div>
                    <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{item.date}</div>
                  </div>
                  <div style={{ fontWeight: 700, color: '#10b981', fontSize: '0.875rem' }}>
                    {item.confidence}
                  </div>
                </div>
              ))
            )}
          </div>
        </aside>
      </div>

      <footer style={{ marginTop: '4rem', textAlign: 'center', color: '#64748b', fontSize: '0.875rem', paddingBottom: '2rem' }}>
        <p>&copy; 2026 RetinaScan AI • B.Tech 4th Semester Mini Project</p>
      </footer>
    </div>
  );
}

export default App;
