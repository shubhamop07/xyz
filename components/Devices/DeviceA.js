import React, { useState } from 'react';
import { useGlobalData } from '../../context/data/DataState';

export default function DeviceA() {

  const { kitchen } = useGlobalData();

  // State for dynamic hours of use per device
  const [usageHours, setUsageHours] = useState({
    Bulb: 24,
    Induction: 24,
    Heater: 24,
  });

  function handleHoursChange(device, newHours) {
    setUsageHours((prev) => ({ ...prev, [device]: newHours }));
  }

  // Function to calculate the electricity cost based on user input
  function calculateElectricityCost(powerWatt, hoursPerDay) {
    const powerKW = powerWatt / 1000; // Convert watts to kilowatts
    const energyDayKWh = powerKW * hoursPerDay; // kWh per day (based on hours of use)
    const energyMonthKWh = energyDayKWh * 30; // kWh per month

    // Tiered pricing structure
    let ratePerUnit;
    if (energyMonthKWh <= 50) {
      ratePerUnit = 2;
    } else if (energyMonthKWh <= 150) {
      ratePerUnit = 2.5;
    } else if (energyMonthKWh <= 250) {
      ratePerUnit = 5.25;
    } else if (energyMonthKWh <= 500) {
      ratePerUnit = 6.3;
    } else if (energyMonthKWh <= 800) {
      ratePerUnit = 7.1;
    } else {
      ratePerUnit = 7.1; // For consumption above 800 kWh
    }

    const costPerDay = (energyDayKWh * ratePerUnit).toFixed(2);
    const costPerMonth = (energyMonthKWh * ratePerUnit).toFixed(2);

    return { costPerDay, costPerMonth };
  }

  function bill() {
    return (
      <table className='table table-striped table-bordered'>
        <thead className='bg-success'>
          <tr>
            <th style={{ color: `white`, fontSize: `20px` }} className='center' colSpan={4} scope='col'>
              Bill Generated
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className='table-primary'>
            <th className='center' colSpan={2} scope='col'>
              Device Units
            </th>
            <th className='center' colSpan={2} scope='col'>
              Charge (in Rs.)
            </th>
          </tr>
          <tr className='table-primary'>
            <th scope='col'>Device</th>
            <th scope='col'>Units</th>
            <th scope='col'>Per Day</th>
            <th scope='col'>Per Month</th>
          </tr>
          <tr className='table-primary'>
            <th scope='row'>Machine-1 (Bulb)</th>
            <td>{(kitchen.Bulb['ActivePower'] / 1000).toFixed(2)}</td>
            <td>{calculateElectricityCost(kitchen.Bulb['ActivePower'], usageHours.Bulb).costPerDay}</td>
            <td>{calculateElectricityCost(kitchen.Bulb['ActivePower'], usageHours.Bulb).costPerMonth}</td>
          </tr>
          <tr className='table-primary'>
            <th scope='row'>Machine-2 (Induction)</th>
            <td>{(kitchen.Induction['ActivePower'] / 1000).toFixed(2)}</td>
            <td>{calculateElectricityCost(kitchen.Induction['ActivePower'], usageHours.Induction).costPerDay}</td>
            <td>{calculateElectricityCost(kitchen.Induction['ActivePower'], usageHours.Induction).costPerMonth}</td>
          </tr>
          <tr className='table-primary'>
            <th scope='row'>Machine-3 (Heater)</th>
            <td>{(kitchen.Heater['ActivePower'] / 1000).toFixed(2)}</td>
            <td>{calculateElectricityCost(kitchen.Heater['ActivePower'], usageHours.Heater).costPerDay}</td>
            <td>{calculateElectricityCost(kitchen.Heater['ActivePower'], usageHours.Heater).costPerMonth}</td>
          </tr>
        </tbody>
      </table>
    );
  }

  return (
    <>
      <div className='table-responsive' style={{ borderRadius: `20px` }}>
        <table className='table table-striped table-bordered'>
          <thead className='bg-success'>
            <tr>
              <th style={{ color: `white`, fontSize: `20px` }} className='center' colSpan={4} scope='col'>
                Zone-A Data
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className='table-primary'>
              <th className='center' colSpan={2} scope='col'>
                Machine Temperature (oC)
              </th>
              <th className='center' colSpan={2} scope='col'>
                {kitchen['Temprature(oC)']} °C
              </th>
            </tr>
            <tr className='table-primary'>
              <th scope='col'>Device</th>
              <th scope='col'>Active Power (Watt)</th>
              <th scope='col'>Voltage (Volt)</th>
              <th scope='col'>Current (A)</th>
            </tr>
            <tr className='table-primary'>
              <th scope='row'>Machine-1</th>
              <td>{kitchen.Bulb['ActivePower']}</td>
              <td>{kitchen.Bulb['Voltage(Volt)']}</td>
              <td>{kitchen.Bulb['Current(A)']}</td>
            </tr>
            <tr className='table-primary'>
              <th scope='row'>Machine-2</th>
              <td>{kitchen.Induction['ActivePower']}</td>
              <td>{kitchen.Induction['Voltage(Volt)']}</td>
              <td>{kitchen.Induction['Current(A)']}</td>
            </tr>
            <tr className='table-primary'>
              <th scope='row'>Machine-3</th>
              <td>{kitchen.Heater['ActivePower']}</td>
              <td>{kitchen.Heater['Voltage(Volt)']}</td>
              <td>{kitchen.Heater['Current(A)']}</td>
            </tr>
          </tbody>
        </table>

        <hr />

        <div>
          <h4>Adjust Usage Hours:</h4>
          <div className="form-group">
            <label>Machine-1 (Bulb) Usage Hours: {usageHours.Bulb} hrs</label>
            <input
              type="range"
              min="0"
              max="24"
              value={usageHours.Bulb}
              onChange={(e) => handleHoursChange('Bulb', e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Machine-2 (Induction) Usage Hours: {usageHours.Induction} hrs</label>
            <input
              type="range"
              min="0"
              max="24"
              value={usageHours.Induction}
              onChange={(e) => handleHoursChange('Induction', e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Machine-3 (Heater) Usage Hours: {usageHours.Heater} hrs</label>
            <input
              type="range"
              min="0"
              max="24"
              value={usageHours.Heater}
              onChange={(e) => handleHoursChange('Heater', e.target.value)}
            />
          </div>
        </div>

        <hr />

        {bill()}
      </div>
    </>
  );
}
