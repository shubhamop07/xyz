import React from 'react';
import { ResponsiveLine } from '@nivo/line';
import { useGlobalData } from '../../context/data/DataState';

export default function UsageA() {
    const { bulbGraphCurrent, bulbGraphVoltage, bulbGraphPower } = useGlobalData();

    const commonProps = {
        margin: { bottom: 60, left: 60, right: 30, top: 50 },
        xScale: { type: 'point' },
        curve: 'monotoneX',
        lineWidth: 3,
        colors: { scheme: 'set1' },
        pointSize: 10,
        pointColor: { theme: 'background' },
        pointBorderWidth: 2,
        pointBorderColor: { from: 'serieColor' },
        pointLabelYOffset: -12,
        useMesh: true,
        enableArea: true, // Enables area under the line
        tooltip: ({ point }) => (
            <div style={{ padding: '10px', background: 'white', border: '1px solid #ccc' }}>
                <strong>{point.serieId}</strong><br />
                <strong>X:</strong> {point.data.x}<br />
                <strong>Y:</strong> {point.data.y}
            </div>
        ),
    };

    return (
        <>
            <div className='predicTrend' style={{ height: '50vh', width: '100%', marginBottom: '20px' }}>
                <h2>Current Usage</h2>
                <ResponsiveLine
                    data={bulbGraphCurrent}
                    axisBottom={{
                        tickSize: 7,
                        tickPadding: 10,
                        tickRotation: 0,
                        legend: 'Seconds',
                        legendOffset: 36,
                        legendPosition: 'middle',
                    }}
                    axisLeft={{
                        tickSize: 2,
                        tickPadding: 10,
                        tickRotation: 0,
                        legend: 'Current (A)',
                        legendOffset: -50,
                        legendPosition: 'middle',
                    }}
                    {...commonProps}
                />
            </div>

            <div className='predicTrend' style={{ height: '50vh', width: '100%', marginBottom: '20px' }}>
                <h2>Voltage Usage</h2>
                <ResponsiveLine
                    data={bulbGraphVoltage}
                    axisBottom={{
                        tickSize: 7,
                        tickPadding: 10,
                        tickRotation: 0,
                        legend: 'Seconds',
                        legendOffset: 36,
                        legendPosition: 'middle',
                    }}
                    axisLeft={{
                        tickSize: 2,
                        tickPadding: 10,
                        tickRotation: 0,
                        legend: 'Voltage (V)',
                        legendOffset: -50,
                        legendPosition: 'middle',
                    }}
                    {...commonProps}
                />
            </div>

            <div className='predicTrend' style={{ height: '50vh', width: '100%' }}>
                <h2>Power Usage</h2>
                <ResponsiveLine
                    data={bulbGraphPower}
                    axisBottom={{
                        tickSize: 7,
                        tickPadding: 10,
                        tickRotation: 0,
                        legend: 'Seconds',
                        legendOffset: 36,
                        legendPosition: 'middle',
                    }}
                    axisLeft={{
                        tickSize: 2,
                        tickPadding: 10,
                        tickRotation: 0,
                        legend: 'Power (W)',
                        legendOffset: -50,
                        legendPosition: 'middle',
                    }}
                    {...commonProps}
                />
            </div>
        </>
    );
}
