import React, { useState } from 'react';
import styles from './CitizenReport.module.css';

const SECTORS = [
  { id: 'health', label: 'Healthcare', icon: '🏥' },
  { id: 'flood', label: 'Flood Relief', icon: '🌊' },
  { id: 'food', label: 'Food', icon: '🍲' },
  { id: 'edu', label: 'Education', icon: '📚' },
  { id: 'safety', label: 'Women Safety', icon: '🛡️' }
];

const CitizenReport = ({ onSubmitSuccess }) => {
  const [report, setReport] = useState({ sector: '', urgency: 1, lat: '', lng: '' });
  const [loading, setLoading] = useState(false);

  const handleLocation = () => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setReport({ ...report, lat: pos.coords.latitude.toFixed(4), lng: pos.coords.longitude.toFixed(4) });
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // POST /api/tasks logic here
    setTimeout(() => {
      setLoading(false);
      onSubmitSuccess();
    }, 1000);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Submit Citizen Report</h2>
      <div className={styles.sectorGrid}>
        {SECTORS.map(s => (
          <button 
            key={s.id} 
            className={`${styles.tile} ${report.sector === s.id ? styles.activeTile : ''}`}
            onClick={() => setReport({...report, sector: s.id})}
          >
            <span>{s.icon}</span>
            <p>{s.label}</p>
          </button>
        ))}
      </div>

      <div className={styles.urgencySection}>
        <p>Urgency Level</p>
        <div className={styles.urgencyBar}>
          {[1, 2, 3, 4, 5].map(num => (
            <button
              key={num}
              className={styles.urgencyBtn}
              style={{ backgroundColor: report.urgency >= num ? `var(--urgency-${num})` : '#333' }}
              onClick={() => setReport({...report, urgency: num})}
            >
              {num}
            </button>
          ))}
        </div>
      </div>

      <button onClick={handleLocation} className={styles.locBtn}>
        📍 {report.lat ? `${report.lat}, ${report.lng}` : 'Use My Location'}
      </button>

      <button className={styles.submitBtn} onClick={handleSubmit} disabled={loading}>
        {loading ? <div className={styles.spinner}></div> : 'Submit Report'}
      </button>
    </div>
  );
};

export default CitizenReport;
