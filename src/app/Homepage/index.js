'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import Header from '@/app/Header'
import Footer from '@/app/Footer'
import HeroSection from '@/app/HeroSection'
import PriceChart from '../PriceChart'
import PriceCard from '../PriceCard'

const MainSection = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 10rem;
  margin-top: 2rem;
  @media (max-width: 768px) {
    padding: 0 2rem;
  }
`;

function Homepage() {
  const [shareData, setShareData] = useState({});
  const [chartData, setChartData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Use the API URL from environment variable
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || '/api';
        
        // Log the API URL for debugging
        console.log('API URL:', apiUrl);
        
        const shareResponse = await axios.get(`${apiUrl}/share`);
        const chartResponse = await axios.get(`${apiUrl}/chartData`);
        
        // Log the responses for debugging
        console.log('Share data response:', shareResponse.data);
        console.log('Chart data response:', chartResponse.data);
        
        setShareData(shareResponse.data?.[0] || {});
        setChartData(chartResponse.data?.data?.[0] || {});
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to load data. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Header />
      <HeroSection />
      <MainSection>
        {error && (
          <div style={{ color: 'red', textAlign: 'center', padding: '20px' }}>
            {error}
          </div>
        )}
        
        {isLoading ? (
          <div style={{ textAlign: 'center', padding: '20px' }}>
            Loading data...
          </div>
        ) : (
          <>
            <PriceCard shareData={shareData} />
            <PriceChart chartData={chartData} />
          </>
        )}
      </MainSection>
      <Footer />
    </div>
  );
}

export default Homepage;