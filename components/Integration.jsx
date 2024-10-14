import React from 'react';
import './Integrations.css'; // Import the CSS file for animations and styling

export default function Integrations() {
  return (
    <div className="integrations-container">
      <h1 className="integrations-title">System Integrations</h1>
      <p className="integrations-description">Manage and view all system integrations here.</p>

      <div className="card integration-card fade-in">
        <div className="card-header">
          <h5 className="card-title">Available Integrations</h5>
        </div>
        <div className="card-body">
          <ul className="integration-list">
            <li className="integration-item">Integration with Solar Panel System</li>
            <li className="integration-item">Integration with Smart Grid Monitoring</li>
            <li className="integration-item">Integration with Energy Consumption Tracker</li>
            <li className="integration-item">Integration with Weather Forecast API</li>
          </ul>
        </div>
      </div>

      <div className="card integration-card fade-in">
        <div className="card-header">
          <h5 className="card-title">Upcoming Integrations</h5>
        </div>
        <div className="card-body">
          <ul className="integration-list">
            <li className="integration-item">AI-Based Energy Saving Suggestions</li>
            <li className="integration-item">Battery Storage Monitoring System</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
