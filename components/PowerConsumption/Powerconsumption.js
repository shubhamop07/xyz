import { Link, Outlet } from 'react-router-dom';
import { useGlobalData } from '../../context/data/DataState';
import { useState } from 'react';
import { toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 
import './Power.css'; // Make sure you have this file for styling

export default function Devices() {
  const { loading } = useGlobalData();
  const [selectedZone, setSelectedZone] = useState(null); // Track selected zone
  const [selectedPeriod, setSelectedPeriod] = useState('This week'); // Default period selection

  // Handle sharing functionality
  const handleShare = () => {
    toast.success('Data shared successfully!');
  };

  // Handle export functionality
  const handleExport = () => {
    toast.success('Data exported successfully!');
  };

  // Update selected zone on click
  const handleZoneClick = (zone) => {
    setSelectedZone(zone);
  };

  // Update the period (week, month, etc.)
  const handlePeriodChange = (event) => {
    setSelectedPeriod(event.target.value);
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <main className='col-md-9 ms-sm-auto col-lg-10 px-md-4'>
      <div className='header'>
        <h1 className='h2'>Power Consumption</h1>
        <div className='btn-toolbar'>
          <button className='btn btn-sm btn-outline-secondary' onClick={handleShare}>Share</button>
          <button className='btn btn-sm btn-outline-secondary' onClick={handleExport}>Export</button>
          <Link to="/panel/powerconsumption/main" className='btn btn-sm btn-outline-secondary mx-2'>
            Main Line Consumption
          </Link>
          <select
            className='form-select form-select-sm mx-2'
            value={selectedPeriod}
            onChange={handlePeriodChange}
            aria-label="Select time period"
          >
            <option value="This week">This week</option>
            <option value="Last week">Last week</option>
            <option value="This month">This month</option>
            <option value="Last month">Last month</option>
          </select>
        </div>
      </div>

      <div className='container-fluid'>
        <div className="main-container">
          {/* Updated Zone Cards with Power Icons */}
          <div className="section-card">
            <span className="icon">⚡</span> {/* Power-themed icon */}
            <h2>Zone A</h2>
            <p>Track energy consumption in Zone A</p>
            <Link
              to="/panel/powerconsumption/zone_a"
              className={`zone-card nav-link ${selectedZone === 'Zone-A' ? 'active' : ''}`}
              onClick={() => handleZoneClick('Zone-A')}
            >
              View Details
            </Link>
          </div>

          <div className="section-card">
            <span className="icon">🔌</span> {/* Plug icon for Zone B */}
            <h2>Zone B</h2>
            <p>Monitor power usage in Zone B</p>
            <Link
              to="/panel/powerconsumption/zone_b"
              className={`zone-card nav-link ${selectedZone === 'Zone-B' ? 'active' : ''}`}
              onClick={() => handleZoneClick('Zone-B')}
            >
              View Details
            </Link>
          </div>

          <div className="section-card">
            <span className="icon"> 💡</span> {/* Light bulb icon for Zone C */}
            <h2>Zone C</h2>
          
            <p>Analyze power consumption in Zone C</p>
            <Link
              to="/panel/powerconsumption/zone_c"
              className={`zone-card nav-link ${selectedZone === 'Zone-C' ? 'active' : ''}`}
              onClick={() => handleZoneClick('Zone-C')}
            >
              View Details
            </Link>
          </div>
        </div>

        {/* Outlet for nested routes */}
        <div className="mt-4">
          <Outlet />
        </div>
      </div>
    </main>
  );
}
