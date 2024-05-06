'use client';
// VolatilityChart.tsx
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface VolatilityChartProps {
  data: { date: Date; price: number }[];
}

const VolatilityChart: React.FC<VolatilityChartProps> = ({ gasData }) => {
  const chartRef = useRef<SVGSVGElement>(null);

  // Function to compute standard deviation
  const standardDeviation = (data) => {
    // Implementation of standard deviation calculation
  };

  // Function to compute variance
  const variance = (data) => {
    // Implementation of variance calculation
  };

  // Function to draw volatility chart
  const drawVolatilityChart = () => {
    // Implementation of volatility chart drawing using D3.js
  };

  useEffect(() => {
    if (!gasData.length || !chartRef.current) return;

    const data = gasData.map((d) => ({
      date: new Date(d.date),
      price: d.price,
    }));

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
      .domain(d3.extent(data, (d) => d.date))
      .range([0, width]);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.price)])
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

    // Draw line
    svg
      .append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', '#C1DADF')
      .attr('stroke-width', 1.5)
      .attr('d', line);
  }, [gasData]);

  return <svg ref={chartRef}></svg>;
};

export default VolatilityChart;
