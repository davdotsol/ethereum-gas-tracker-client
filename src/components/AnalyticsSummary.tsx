'use client';

import { useEffect, useState } from 'react';

interface GasData {
  baseFeePerGas: string;
}

interface Analytics {
  averageGasPrice: string | null;
  medianGasPrice: string | null;
  modeGasPrice: string | null;
  minGasPrice: string | null;
  maxGasPrice: string | null;
}

export default function AnalyticsSummary(): JSX.Element {
  const [timePeriod, setTimePeriod] = useState<string>('daily');
  const [analytics, setAnalytics] = useState<Analytics>({
    averageGasPrice: null,
    medianGasPrice: null,
    modeGasPrice: null,
    minGasPrice: null,
    maxGasPrice: null,
  });

  useEffect(() => {
    fetchData(timePeriod); // Fetch data on initial render and when timePeriod changes
  }, [timePeriod]); // Adding timePeriod as a dependency

  const fetchData = async (period: string): Promise<void> => {
    try {
      const response = await fetch(
        `https://ethereum-gas-tracker-beta.vercel.app/api/gas-prices?period=${period}`
      );
      const data: GasData[] = await response.json();
      if (data && data.length > 0) {
        const prices: number[] = data
          .map((item) => parseFloat(item.baseFeePerGas))
          .sort((a, b) => a - b);
        const averagePrice: number = calculateAverage(prices);
        const medianPrice: number = calculateMedian(prices);
        const modePrice: number = calculateMode(prices);
        const minPrice: number = prices[0];
        const maxPrice: number = prices[prices.length - 1];

        setAnalytics({
          averageGasPrice: averagePrice.toFixed(2),
          medianGasPrice: medianPrice.toFixed(2),
          modeGasPrice: modePrice.toFixed(2),
          minGasPrice: minPrice.toFixed(2),
          maxGasPrice: maxPrice.toFixed(2),
        });
      }
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <div className="mb-4">
        <label htmlFor="timePeriod" className="font-medium text-gray-700">
          Select Time Period:{' '}
        </label>
        <select
          id="timePeriod"
          value={timePeriod}
          onChange={(e) => setTimePeriod(e.target.value)}
          className="ml-2 p-2 border rounded"
        >
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
      </div>
      <h2 className="text-sky-blue font-bold text-lg mb-2">
        Gas Price Analytics
      </h2>
      <ul>
        <li>
          Average Gas Price:{' '}
          <strong>{analytics.averageGasPrice || 'Loading...'}</strong>
        </li>
        <li>
          Median Gas Price:{' '}
          <strong>{analytics.medianGasPrice || 'Loading...'}</strong>
        </li>
        <li>
          Mode Gas Price:{' '}
          <strong>{analytics.modeGasPrice || 'Loading...'}</strong>
        </li>
        <li>
          Minimum Gas Price:{' '}
          <strong>{analytics.minGasPrice || 'Loading...'}</strong>
        </li>
        <li>
          Maximum Gas Price Today:{' '}
          <strong>{analytics.maxGasPrice || 'Loading...'}</strong>
        </li>
      </ul>
    </div>
  );
}

function calculateAverage(prices: number[]): number {
  return prices.reduce((sum, price) => sum + price, 0) / prices.length;
}

function calculateMedian(prices: number[]): number {
  const midIndex: number = Math.floor(prices.length / 2);
  return prices.length % 2 !== 0
    ? prices[midIndex]
    : (prices[midIndex - 1] + prices[midIndex]) / 2;
}

function calculateMode(prices: number[]): number {
  const frequency: Record<number, number> = {};
  let maxFreq: number = 0;
  let mode: number = prices[0];

  for (const price of prices) {
    frequency[price] = (frequency[price] || 0) + 1;
    if (frequency[price] > maxFreq) {
      maxFreq = frequency[price];
      mode = price;
    }
  }

  return mode;
}
