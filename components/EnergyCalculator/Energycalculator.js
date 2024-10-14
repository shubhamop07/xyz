import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale, // x-axis
  LinearScale, // y-axis
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import './calc.css'; // Import your styles

// Register Chart.js components
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend);

export default function EnergyCalculator() {
    const [wattage, setWattage] = useState('');
    const [hours, setHours] = useState('');
    const [rate, setRate] = useState('');
    const [days, setDays] = useState('');
    const [result, setResult] = useState('');
    const [costHistory, setCostHistory] = useState([]);

    // Function to calculate the cost
    const calculateCost = () => {
        const wattageNum = parseFloat(wattage);
        const hoursNum = parseFloat(hours);
        const rateNum = parseFloat(rate);
        const daysNum = parseFloat(days);

        if (isNaN(wattageNum) || isNaN(hoursNum) || isNaN(rateNum) || isNaN(daysNum)) {
            setResult('Please enter valid values.');
        } else {
            const dailyCost = (wattageNum * hoursNum) / 1000 * rateNum;
            const totalCost = dailyCost * daysNum;
            setResult(`Total cost: Rs ${totalCost.toFixed(2)}`); 
            
            // Update cost history
            setCostHistory(prevHistory => {
                const newHistory = [...prevHistory, { days: daysNum, cost: totalCost }];
                saveToLocalStorage(newHistory);
                return newHistory;
            });
        }
    };

    // Function to clear input fields
    const clearFields = () => {
        setWattage('');
        setHours('');
        setRate('');
        setDays('');
        setResult('');
    };

    // Function to save calculation history to local storage
    const saveToLocalStorage = (data) => {
        localStorage.setItem('costHistory', JSON.stringify(data));
    };

    // Function to load calculation history from local storage
    const loadFromLocalStorage = () => {
        const storedHistory = JSON.parse(localStorage.getItem('costHistory'));
        if (storedHistory && Array.isArray(storedHistory)) {
            setCostHistory(storedHistory);
        } else {
            setCostHistory([]); // Initialize with empty array if no valid history found
        }
    };

    // Chart data preparation
    const chartData = {
        labels: costHistory.map(item => `Day ${item.days}`), 
        datasets: [
            {
                label: 'Cost Over Days',
                data: costHistory.map(item => item.cost),
                borderColor: 'rgba(75,192,192,1)',
                backgroundColor: 'rgba(75,192,192,0.2)',
                fill: true,
            }
        ]
    };

    // Load data on component mount
    useEffect(() => {
        loadFromLocalStorage();
    }, []);

    return (
        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h2">Electricity Calculator</h1>
            </div>

            <div className="container-fluid">
                <div className="calculator">
                    <h2>Electricity Cost Calculator</h2>
                    <div className="input-section">
                        <label htmlFor="wattage">Appliance Wattage (W):</label>
                        <input 
                            type="number" 
                            id="wattage" 
                            value={wattage}
                            onChange={e => setWattage(e.target.value)} 
                            min="1" 
                            step="1" 
                            required
                        />
                    </div>
                    <div className="input-section">
                        <label htmlFor="hours">Hours Used Per Day:</label>
                        <input 
                            type="number" 
                            id="hours" 
                            value={hours}
                            onChange={e => setHours(e.target.value)} 
                            min="1" 
                            step="1" 
                            required
                        />
                    </div>
                    <div className="input-section">
                        <label htmlFor="rate">Rate per kWh (Rs):</label>
                        <input 
                            type="number" 
                            id="rate" 
                            value={rate}
                            onChange={e => setRate(e.target.value)} 
                            min="0" 
                            step="0.01" 
                            required
                        />
                    </div>
                    <div className="input-section">
                        <label htmlFor="days">Number of Days:</label>
                        <input 
                            type="number" 
                            id="days" 
                            value={days}
                            onChange={e => setDays(e.target.value)} 
                            min="1" 
                            step="1" 
                            required
                        />
                    </div>
                    <button onClick={calculateCost}>Calculate</button>
                    <button onClick={clearFields}>Clear</button>
                    <div id="result" className="result-section">{result}</div>
                </div>
                
                {costHistory.length > 0 && (
                    <div className="chart-section">
                        <h3>Cost History</h3>
                        <Line data={chartData} />
                    </div>
                )}
            </div>
        </main>
    );
}
