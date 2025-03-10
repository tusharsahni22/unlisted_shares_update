'ise-client'
import React,{useEffect,useState} from 'react'
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

  useEffect(()=>{
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/share
      `).then((response) => {
      setShareData(response.data?.[0]);
    }).catch((error) => {
      console.error('Error fetching data:', error);
    });
  },[])

  useEffect(()=>{
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/chartData
      `).then((response) => {
        console.log("first",response.data.data)
      setChartData(response.data.data?.[0]);
    }).catch((error) => {
      console.error('Error fetching data:', error);
    });
  },[])

  return (
    <div>
        <Header/>
        <HeroSection/>
        <MainSection>
          <PriceCard shareData={shareData}/>
          <PriceChart chartData={chartData}/>
        </MainSection>        
        <Footer/>
    </div>
  )
}

export default Homepage