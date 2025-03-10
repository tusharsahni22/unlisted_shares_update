'use client'
import React, { use } from 'react';
import styled from 'styled-components';

const Card = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  margin-bottom: 2rem;
`;

const ShareName = styled.h2`
  font-size: 1.5rem;
  color: #1a237e;
  margin-bottom: 1rem;
`;

const PriceContainer = styled.div`
  display: flex;
  align-items: baseline;
  margin-bottom: 1rem;
`;

const CurrentPrice = styled.span`
  font-size: 2.5rem;
  font-weight: bold;
  color: #333;
`;

const PriceChange = styled.span`
  font-size: 1.2rem;
  margin-left: 1rem;
  color: ${props => props.$isPositive ? '#4caf50' : '#f44336'};
`;

const UpdateTime = styled.div`
  font-size: 0.9rem;
  color: #666;
  margin-top: 1rem;
`;

const SharePriceCard = ({ shareData }) => {
  const { name, currentPrice, priceChange, percentChange, lastUpdated } = shareData;
  const isPositive = priceChange >= 0;

  return (
    <Card>
      <ShareName>{name}</ShareName>
      <PriceContainer>
        <CurrentPrice>₹{currentPrice}</CurrentPrice>
        <PriceChange $isPositive={isPositive}>
          {isPositive ? '+' : ''}{priceChange} ({isPositive ? '+' : ''}{percentChange}%)
        </PriceChange>
      </PriceContainer>
      <UpdateTime>Last updated: {lastUpdated}</UpdateTime>
    </Card>
  );
};

export default SharePriceCard; 