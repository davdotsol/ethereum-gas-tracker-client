// TrendChart.tsx
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface TrendChartProps {
  gasData: { date: Date; price: number }[];
  timePeriod: string;
}

const TrendChart: React.FC<TrendChartProps> = ({ gasData, timePeriod }) => {
  const chartRef = useRef<SVGSVGElement>(null);

  // Function to compute moving average
  const movingAverage = (
    data: { date: Date; price: number }[],
    windowSize: number
  ) => {
    const movingAvg = [];
    for (let i = 0; i < data.length - windowSize + 1; i++) {
      const window = data.slice(i, i + windowSize);
      const avg = window.reduce((sum, d) => sum + d.price, 0) / windowSize;
      movingAvg.push({ date: window[windowSize - 1].date, price: avg });
    }
    return movingAvg;
  };

  // Function to compute exponential smoothing
  const exponentialSmoothing = (
    data: { date: Date; price: number }[],
    alpha: number,
    windowSize: number
  ) => {
    const smoothedData = [];
    data.forEach((d, i) => {
      if (i === 0) {
        smoothedData.push({ date: d.date, price: d.price });
      } else {
        const smoothedPrice =
          alpha * d.price + (1 - alpha) * smoothedData[i - 1].price;
        smoothedData.push({ date: d.date, price: smoothedPrice });
      }
    });
    return smoothedData.slice(windowSize - 1); // Slice to maintain the length of the array after smoothing
  };

  const filterDataForWeeklyPeriod = (data: { date: Date; price: number }[]) => {
    // Logic to filter data for weekly period
    return data;
  };

  const filterDataForMonthlyPeriod = (
    data: { date: Date; price: number }[]
  ) => {
    // Logic to filter data for monthly period
    return data;
  };

  const filterDataForDailyPeriod = (data: { date: Date; price: number }[]) => {
    // Logic to filter data for monthly period
    return data;
  };

  useEffect(() => {
    if (!gasData.length || !chartRef.current) return;

    const data = gasData.map((d) => ({
      date: new Date(d.date),
      price: d.price,
    }));

    // Filter data based on selected time period
    let filteredData;
    if (timePeriod === 'weekly') {
      // Logic to filter data for weekly period
      filteredData = filterDataForWeeklyPeriod(data);
    } else if (timePeriod === 'monthly') {
      // Logic to filter data for monthly period
      filteredData = filterDataForMonthlyPeriod(data);
    } else {
      // Default to daily period
      filteredData = filterDataForDailyPeriod(data);
    }

    const movingAvgData = movingAverage(filteredData, 7); // Calculate moving average with a window size of 7 days
    const smoothedData = exponentialSmoothing(filteredData, 0.2); // Calculate smoothed data with alpha value of 0.2

    const margin = { top: 20, right: 30, bottom: 30, left: 60 };
    const width = 600 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const svg = d3
      .select(chartRef.current)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    const x = d3
      .scaleTime()
      .domain(d3.extent(filteredData, (d) => d.date))
      .range([0, width]);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(filteredData, (d) => d.price)])
      .nice()
      .range([height, 0]);

    const line = d3
      .line()
      .x((d) => x(d.date))
      .y((d) => y(d.price));

    svg
      .append('g')
      .attr('transform', 'translate(0,' + height + ')')
      .call(d3.axisBottom(x));

    svg.append('g').call(d3.axisLeft(y));

    svg
      .append('path')
      .datum(filteredData)
      .attr('fill', 'none')
      .attr('stroke', '#00A8CC')
      .attr('stroke-width', 1.5)
      .attr('d', line);

    // Draw moving average line
    const movingAvgLine = d3
      .line()
      .x((d) => x(d.date))
      .y((d) => y(d.price));

    svg
      .append('path')
      .datum(movingAvgData)
      .attr('fill', 'none')
      .attr('stroke', '#FF6347') // Choose a color for the moving average line
      .attr('stroke-width', 1.5)
      .attr('d', movingAvgLine);

    // Draw smoothed line
    const smoothedLine = d3
      .line()
      .x((d) => x(d.date))
      .y((d) => y(d.price));

    svg
      .append('path')
      .datum(smoothedData)
      .attr('fill', 'none')
      .attr('stroke', '#FFA500') // Choose a color for the smoothed line
      .attr('stroke-width', 1.5)
      .attr('d', smoothedLine);
  }, [gasData]);

  return <svg ref={chartRef}></svg>;
};

export default TrendChart;
