import React from 'react';
import ReactSpeedometer from 'react-d3-speedometer';
import { useGlobalData } from '../../context/data/DataState';
import './MeterA.css'; // Import CSS file if needed

export default function MeterB() {
    const { 
        bulbGaugeVoltage,
        bulbGaugePower,
        bulbGaugeCurrent,
        heaterGaugePower,
        heaterGaugeCurrent,
        heaterGaugeVoltage,
        inductionGaugeCurrent,
        inductionGaugeVoltage,
        inductionGaugePower,
    } = useGlobalData();

    return (
        <>
            {[{
                title: "Machine-1",
                power: bulbGaugePower,
                current: bulbGaugeCurrent,
                voltage: bulbGaugeVoltage,
            }, {
                title: "Machine-2",
                power: heaterGaugePower,
                current: heaterGaugeCurrent,
                voltage: heaterGaugeVoltage,
            }, {
                title: "Machine-3",
                power: inductionGaugePower,
                current: inductionGaugeCurrent,
                voltage: inductionGaugeVoltage,
            }].map((machine, index) => (
                <div className="machine" key={index}>
                    <h2>{machine.title}</h2>
                    <div className="gauge-container">
                        <Gauge title="Power" value={machine.power} maxValue={20} />
                        <Gauge title="Current" value={machine.current} maxValue={1} />
                        <Gauge title="Voltage" value={machine.voltage} maxValue={500} />
                    </div>
                </div>
            ))}
        </>
    );
}

const Gauge = ({ title, value, maxValue }) => {
    const gradientColors = {
        startColor: "#FFD700", // Yellow for low
        midColor: "#FFA500",   // Orange for medium
        endColor: "#FF4500",   // Red for high
    };

    return (
        <div className="gauge">
            <h5>{`Zone-B ${title}`}</h5>
            <div className={`${title.toLowerCase()}`}>
                <ReactSpeedometer
                    maxValue={maxValue}
                    value={value}
                    segments={3} // Use 3 segments for gradient
                    currentValueText="" // Remove the current value display
                    needleColor="#000" // Professional-looking black needle
                    startColor={gradientColors.startColor}
                    midColor={gradientColors.midColor}
                    endColor={gradientColors.endColor}
                    textColor="#003" // Color of the displayed value text
                    ringWidth={50} // Adjust the ring width for a more prominent look
                    needleTransitionDuration={3000} // Smooth transition for the needle
                    needleTransition="easeElastic" // Smooth transition effect
                />
            </div>
        </div>
    );
};
