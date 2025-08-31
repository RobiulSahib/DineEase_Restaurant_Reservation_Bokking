// import React from 'react'
// import HeroSection from '../../components/HeroSection'
// import About from '../../components/About'
// import Qualities from '../../components/Qualities'
// import Menu from '../../components/Menu'
// import WhoAreWe from '../../components/WhoAreWe'
// import Team from '../../components/Team'
// import Reservation from '../../components/Reservation'
// import Footer from '../../components/Footer'

// const Home = () => {
//   return (
//     <>
//       <HeroSection/>
//       <About/>
//       <Qualities/>
//       <Menu/>
//       <WhoAreWe/>
//       <Team/>
//       <Reservation/>
//       <Footer/>
//     </>
//   )
// }

// export default Home;

import React from 'react';
import HeroSection from '../../components/HeroSection';
import About from '../../components/About';
import Qualities from '../../components/Qualities';
import Menu from '../../components/Menu';
import WhoAreWe from '../../components/WhoAreWe';
import Team from '../../components/Team';
import Reservation from '../../components/Reservation';
import Footer from '../../components/Footer';
import Feedback from '../../components/Feedback'; // 1. IMPORT THE NEW COMPONENT

const Home = () => {
  return (
    <>
      <HeroSection/>
      <About/>
      <Qualities/>
      <Menu/>
      <WhoAreWe/>
      <Team/>
      <Reservation/>
      <Feedback /> {/* 2. ADD IT HERE, BEFORE THE FOOTER */}
      <Footer/>
    </>
  );
};

export default Home;