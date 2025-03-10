'ise-client'
import React from 'react'
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

const shareData = {
    "name": "Chennai Super Kings (CSK) Shares",
    "currentPrice": 195,
    "priceChange": 3,
    "percentChange": 1.56,
    "lastUpdated": "March 8, 2025"
};

const charData = {
  "daily": [
    {
      "date": "Feb 6",
      "price": 180.55
    },
    {
      "date": "Feb 7",
      "price": 179.34
    },
    {
      "date": "Feb 8",
      "price": 184.56
    },
    {
      "date": "Feb 9",
      "price": 179.75
    },
    {
      "date": "Feb 10",
      "price": 180.43
    },
    {
      "date": "Feb 11",
      "price": 178.33
    },
    {
      "date": "Feb 12",
      "price": 181.25
    },
    {
      "date": "Feb 13",
      "price": 184.22
    },
    {
      "date": "Feb 14",
      "price": 182.75
    },
    {
      "date": "Feb 15",
      "price": 184.24
    },
    {
      "date": "Feb 16",
      "price": 183.85
    },
    {
      "date": "Feb 17",
      "price": 181.45
    },
    {
      "date": "Feb 18",
      "price": 182.39
    },
    {
      "date": "Feb 19",
      "price": 186.88
    },
    {
      "date": "Feb 20",
      "price": 187.76
    },
    {
      "date": "Feb 21",
      "price": 184.57
    },
    {
      "date": "Feb 22",
      "price": 189.14
    },
    {
      "date": "Feb 23",
      "price": 188.07
    },
    {
      "date": "Feb 24",
      "price": 185.55
    },
    {
      "date": "Feb 25",
      "price": 188.53
    },
    {
      "date": "Feb 26",
      "price": 187.35
    },
    {
      "date": "Feb 27",
      "price": 194.58
    },
    {
      "date": "Feb 28",
      "price": 191.23
    },
    {
      "date": "Mar 1",
      "price": 189.34
    },
    {
      "date": "Mar 2",
      "price": 192.7
    },
    {
      "date": "Mar 3",
      "price": 187.64
    },
    {
      "date": "Mar 4",
      "price": 188.44
    },
    {
      "date": "Mar 5",
      "price": 190.43
    },
    {
      "date": "Mar 6",
      "price": 191.56
    },
    {
      "date": "Mar 7",
      "price": 191.45
    },
    {
      "date": "Mar 8",
      "price": 196.07
    }
  ],
  "weekly": [
    {
      "date": "Dec 14",
      "price": 186.45
    },
    {
      "date": "Dec 21",
      "price": 179.99
    },
    {
      "date": "Dec 28",
      "price": 185.01
    },
    {
      "date": "Jan 4",
      "price": 181.73
    },
    {
      "date": "Jan 11",
      "price": 184.27
    },
    {
      "date": "Jan 18",
      "price": 194.51
    },
    {
      "date": "Jan 25",
      "price": 195.57
    },
    {
      "date": "Feb 1",
      "price": 189.73
    },
    {
      "date": "Feb 8",
      "price": 196.18
    },
    {
      "date": "Feb 15",
      "price": 199.8
    },
    {
      "date": "Feb 22",
      "price": 197.33
    },
    {
      "date": "Mar 1",
      "price": 197.5
    },
    {
      "date": "Mar 8",
      "price": 201.64
    }
  ],
  "monthly": [
    {
      "date": "Mar 2024",
      "price": 190.01
    },
    {
      "date": "Apr 2024",
      "price": 185.44
    },
    {
      "date": "May 2024",
      "price": 185.14
    },
    {
      "date": "Jun 2024",
      "price": 186.19
    },
    {
      "date": "Jul 2024",
      "price": 190.76
    },
    {
      "date": "Aug 2024",
      "price": 198.76
    },
    {
      "date": "Sep 2024",
      "price": 192.5
    },
    {
      "date": "Oct 2024",
      "price": 197.76
    },
    {
      "date": "Nov 2024",
      "price": 209.73
    },
    {
      "date": "Dec 2024",
      "price": 205.82
    },
    {
      "date": "Jan 2025",
      "price": 207.26
    },
    {
      "date": "Feb 2025",
      "price": 219.92
    },
    {
      "date": "Mar 2025",
      "price": 209.03
    }
  ]
};

function Homepage() {
  return (
    <div>
        <Header/>
        <HeroSection/>
        <MainSection>
          <PriceCard shareData={shareData}/>
          <PriceChart chartData={charData}/>
        </MainSection>        
        <Footer/>
    </div>
  )
}

export default Homepage