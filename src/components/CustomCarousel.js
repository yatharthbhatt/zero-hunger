"use client";
import { Carousel } from "react-bootstrap";
import Image from "next/image"; // Use next/image for optimization

export default function CustomCarousel() {
  return (
    <Carousel indicators controls className="h-[80vh]">
      <Carousel.Item>
        <div className="carousel-image-container">
          <Image
            src="/assets/Tang-Hall-community-Centre-volunteers.jpg"
            alt="First slide"
            fill
            className="object-cover"
          />
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <div className="carousel-image-container">
          <Image
            src="/assets/Copy-of-image00020-1.jpeg"
            alt="Second slide"
            fill
            className="object-cover"
          />
        </div>
      </Carousel.Item>

      <Carousel.Item>
        <div className="carousel-image-container">
          <Image
            src="/assets/402913_48a67215742f44179ca2f87adf37a116~mv2.jpg"
            alt="Third slide"
            fill
            className="object-cover"
          />
        </div>
      </Carousel.Item>
    </Carousel>
  );
}
