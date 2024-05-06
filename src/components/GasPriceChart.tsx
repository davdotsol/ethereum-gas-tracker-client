'use client'; // GasPriceChart.js
import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import TrendChart from './TrendChart';
import VolatilityChart from './VolatilityChart';

import { gasPriceData } from '../data/gasPriceData';
import { time } from 'console';

const GasPriceAnalytics = () => {
  const [timePeriod, setTimePeriod] = useState('daily'); // Default time period
  const [gasData, setGasData] = useState<{ date: Date; price: number }[]>([]); // Gas price data
  const trendChartRef = useRef(null);
  const volatilityChartRef = useRef(null);

  // Fetch gas price data from API
  useEffect(() => {
    // Fetch data from API based on selected time period (daily, weekly, monthly)
    // Replace the API endpoint with your actual data source
    fetchGasPriceData();
  }, [timePeriod]);

  const fetchGasPriceData = async () => {
    try {
      // Fetch gas price data based on selected time period
      // const response = await fetch(`API_ENDPOINT_HERE/${timePeriod}`);
      // const data = await response.json();
      setGasData(gasPriceData);
    } catch (error) {
      console.error('Error fetching gas price data:', error);
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-teal-blue font-bold text-lg mb-2">
        Gas Price Analytics
      </h2>
      <div className="mb-4">
        <h3 className="text-dark-blue text-lg font-semibold mb-2">
          Trend Analysis
        </h3>
        <select
          value={timePeriod}
          onChange={(e) => setTimePeriod(e.target.value)}
          className="border border-gray-300 p-2 rounded"
        >
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
        <TrendChart gasData={gasData} timePeriod={timePeriod} />
      </div>
      <div>
        <h3 className="text-dark-blue text-lg font-semibold mb-2">
          Volatility Measures
        </h3>
        {/* <VolatilityChart gasData={gasData} /> */}
      </div>
    </div>
  );
};

export default GasPriceAnalytics;
