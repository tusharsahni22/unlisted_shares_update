'use client'
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

const ChartContainer = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  margin-bottom: 2rem;
`;

const ChartTitle = styled.h3`
  font-size: 1.2rem;
  color: #1a237e;
  margin-bottom: 1rem;
`;

const TimeFrameSelector = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const TimeFrameButton = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  background-color: ${props => props.$active ? '#1a237e' : '#e0e0e0'};
  color: ${props => props.$active ? '#fff' : '#333'};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${props => props.$active ? '#1a237e' : '#d0d0d0'};
  }
`;

const CustomTooltip = styled.div`
  background-color: #fff;
  border: 1px solid #ccc;
  padding: 0.5rem;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const TooltipLabel = styled.p`
  margin: 0;
  font-weight: bold;
  color: #333;
`;

const TooltipValue = styled.p`
  margin: 0;
  color: #666;
`;

const PriceChart = ({ chartData }) => {
  const [timeFrame, setTimeFrame] = useState('daily');
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    if (chartData && chartData[timeFrame]) {
      setFilteredData(chartData[timeFrame]);
    }
  }, [timeFrame, chartData]);

  const handleTimeFrameChange = (frame) => {
    setTimeFrame(frame);
  };

  const CustomTooltipContent = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <CustomTooltip>
          <TooltipLabel>{label}</TooltipLabel>
          <TooltipValue>Price: ₹{payload[0].value}</TooltipValue>
        </CustomTooltip>
      );
    }
    return null;
  };

  return (
    <ChartContainer>
      <ChartTitle>CSK Share Price History</ChartTitle>
      <TimeFrameSelector>
        <TimeFrameButton 
          $active={timeFrame === 'daily'} 
          onClick={() => handleTimeFrameChange('daily')}
        >
          Daily
        </TimeFrameButton>
        <TimeFrameButton 
          $active={timeFrame === 'weekly'} 
          onClick={() => handleTimeFrameChange('weekly')}
        >
          Weekly
        </TimeFrameButton>
        <TimeFrameButton 
          $active={timeFrame === 'monthly'} 
          onClick={() => handleTimeFrameChange('monthly')}
        >
          Monthly
        </TimeFrameButton>
      </TimeFrameSelector>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={filteredData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis domain={['auto', 'auto']} />
          <Tooltip content={<CustomTooltipContent />} />
          <Line 
            type="monotone" 
            dataKey="price" 
            stroke="#f9a825" 
            strokeWidth={2} 
            dot={{ r: 3 }} 
            activeDot={{ r: 6 }} 
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

export default PriceChart; 