import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaFileAlt, FaShoppingCart, FaUsers, FaChartBar, FaLayerGroup } from 'react-icons/fa';

export default function Sidemenu() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <nav
      id='sidebarMenu'
      className='col-md-3 col-lg-2 d-md-block bg-light sidebar collapse'
      style={{
        backgroundColor: '#f8f9fa',
        borderRight: '1px solid #dee2e6',
        height: '100vh',
        paddingTop: '20px',
      }}
    >
      <div className='position-sticky pt-3 sidebar-sticky'>
        <ul className='nav flex-column'>
          <li className='nav-item'>
            <Link
              to='/panel/dashboard'
              className='nav-link active'
              style={{
                color: '#007bff',
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <FaHome className='me-2' />
              Dashboard
            </Link>
          </li>
          <li className='nav-item'>
            <Link className='nav-link' to='/panel/usage' style={{ display: 'flex', alignItems: 'center' }}>
              <FaFileAlt className='me-2' />
              Energy Consumption
            </Link>
          </li>
          <li className='nav-item'>
            <Link className='nav-link' to='/panel/savingmethods' style={{ display: 'flex', alignItems: 'center' }}>
              <FaShoppingCart className='me-2' />
              Saving Methods
            </Link>
          </li>
          <li className='nav-item'>
            <div className='nav-link d-flex'>
              <FaUsers className='me-2 align-text-bottom' />
              <Link
                className='nav-link'
                style={{
                  display: 'inline-flex',
                  padding: 'unset',
                  alignItems: 'center',
                }}
                to='/panel/powerconsumption'
              >
                Power Consumption
              </Link>
              <button
                type='button'
                className={`btn dropdown-toggle ${dropdownOpen ? 'show' : ''}`}
                onClick={toggleDropdown}
                aria-expanded={dropdownOpen}
                style={{
                  backgroundColor: 'transparent',
                  border: 'none',
                }}
              >
              </button>
              <div className={`dropdown-menu ${dropdownOpen ? 'show' : ''}`}>
                <Link to='/panel/powerconsumption/zone_A' className='dropdown-item'>
                  Zone-A
                </Link>
                <Link to='/panel/powerconsumption/zone_B' className='dropdown-item'>
                  Zone-B
                </Link>
                <Link to='/panel/powerconsumption/zone_C' className='dropdown-item'>
                  Zone-C
                </Link>
                <div className='dropdown-divider'></div>
                <Link to='/panel/powerconsumption/main' className='dropdown-item'>
                  All
                </Link>
              </div>
            </div>
          </li>
          <li className='nav-item'>
            <Link className='nav-link' to='/panel/energycalculator' style={{ display: 'flex', alignItems: 'center' }}>
              <FaChartBar className='me-2' />
              Energy Calculator
            </Link>
          </li>
          <li className='nav-item'>
            <Link className='nav-link' to='/panel/integrations' style={{ display: 'flex', alignItems: 'center' }}>
              <FaLayerGroup className='me-2' />
              Integrations
            </Link>
          </li>
        </ul>

        <h6 className='sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-uppercase'>
          <span>Saved Reports</span>
        </h6>
        <ul className='nav flex-column mb-2'>
          <li className='nav-item'>
            <a className='nav-link' href='#' style={{ display: 'flex', alignItems: 'center' }}>
              <FaFileAlt className='me-2' />
              Current month
            </a>
          </li>
          <li className='nav-item'>
            <a className='nav-link' href='#' style={{ display: 'flex', alignItems: 'center' }}>
              <FaFileAlt className='me-2' />
              Last quarter
            </a>
          </li>
          <li className='nav-item'>
            <a className='nav-link' href='#' style={{ display: 'flex', alignItems: 'center' }}>
              <FaFileAlt className='me-2' />
              Social engagement
            </a>
          </li>
          <li className='nav-item'>
            <a className='nav-link' href='#' style={{ display: 'flex', alignItems: 'center' }}>
              <FaFileAlt className='me-2' />
              Year-end sale
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
