import React from 'react';
import HeroSection from '../../components/hero/HeroSection';
import PopularCourses from '../../components/courses/PopularCourses';
import WhyChooseUs from '../../components/why-choose-us/WhyChooseUs';
import Testimonials from '../../components/testimonials/Testimonials';
import QuickContact from '../../components/contact/QuickContact';
import Reviews from '../../components/reviews/Reviews';

function Home() {
  return (
    <>
      <HeroSection />
      <PopularCourses />
      <WhyChooseUs />
      <Testimonials />
      <QuickContact />
      <Reviews />
    </>
  );
}

export default Home;
