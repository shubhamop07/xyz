import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import './Dashboard.css'; // Ensure the CSS file has updated styles

export default function Dashboard(props) {
  const [activeZone, setActiveZone] = useState(null);

  const handleZoneClick = (zone) => {
    setActiveZone(zone);
  };

  return (
    <>
      <main className='col-md-9 ms-sm-auto col-lg-10 px-md-4'>
        <div className='d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom'>
          <h1 className='h2'>Dashboard</h1>
          <div className='btn-toolbar mb-2 mb-md-0'>
            <div className='btn-group me-2'>
              <button type='button' className='btn btn-sm btn-outline-secondary'>
                Share
              </button>
              <button type='button' className='btn btn-sm btn-outline-secondary'>
                Download Usage
              </button>
            </div>
            <button type='button' className='btn btn-sm btn-outline-secondary dropdown-toggle'>
              <span data-feather='calendar' className='align-text-bottom'></span>
              This week
            </button>
          </div>
        </div>

        <div className='container-fluid'>
          <div className="heading">
            <h2>{activeZone ? `Current Zone: ${activeZone}` : "Select a Zone"}</h2>
          </div>

          <div className="main-container">
            <div className="section-card">
              <div className="icon">📊</div> {/* Wrapping icon for styling */}
              <h2>Zone A</h2>
              <p>Monitor consumption in Zone A</p>
              <Link
                to="/panel/dashboard/zone_A"
                className={`zone-card nav-link ${activeZone === 'Zone-A' ? 'active' : ''}`}
                onClick={() => handleZoneClick('Zone-A')}
              >
                View Details
              </Link>
            </div>

            <div className="section-card">
              <div className="icon">📊</div>
              <h2>Zone B</h2>
              <p>Monitor consumption in Zone B</p>
              <Link
                to="/panel/dashboard/zone_B"
                className={`zone-card nav-link ${activeZone === 'Zone-B' ? 'active' : ''}`}
                onClick={() => handleZoneClick('Zone-B')}
              >
                View Details
              </Link>
            </div>

            <div className="section-card">
              <div className="icon">📊</div>
              <h2>Zone C</h2>
              <p>Monitor consumption in Zone C</p>
              <Link
                to="/panel/dashboard/zone_C"
                className={`zone-card nav-link ${activeZone === 'Zone-C' ? 'active' : ''}`}
                onClick={() => handleZoneClick('Zone-C')}
              >
                View Details
              </Link>
            </div>
          </div>

          <Outlet />
        </div>
      </main>
    </>
  );
}
