// pages/index.js
import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import CustomCarousel from "../components/CustomCarousel";
import HeroSection from "../components/HeroSection";
import AboutUs from "../components/About-us";

export default function Home() {
  return (
    <div>
      <CustomCarousel />
      <HeroSection />
      <AboutUs />
    </div>
  );
}
