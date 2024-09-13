"use client";
import React, { useState, useEffect, useRef } from "react";

const Counter = ({ target }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const handleIntersect = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !hasAnimated) {
          observer.unobserve(ref.current);
          let start = 0;
          const duration = 2000; // 2 seconds to count
          const incrementTime = Math.abs(Math.floor(duration / target));

          const timer = setInterval(() => {
            start += 1;
            setCount((prevCount) => prevCount + 1);
            if (start === target) {
              clearInterval(timer);
              setHasAnimated(true);
            }
          }, incrementTime);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, {
      threshold: 0.5, // Trigger when 50% of the element is in view
    });

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [target, hasAnimated]);

  return (
    <div ref={ref} className="number">
      {count} +
    </div>
  );
};

const AboutUs = () => {
  const imageRef = useRef(null);
  const textRef = useRef(null);
  const [isImageVisible, setIsImageVisible] = useState(false);
  const [isTextVisible, setIsTextVisible] = useState(false);

  useEffect(() => {
    const handleScroll = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target === imageRef.current) {
            setIsImageVisible(true);
            observer.unobserve(imageRef.current);
          }
          if (entry.target === textRef.current) {
            setIsTextVisible(true);
            observer.unobserve(textRef.current);
          }
        }
      });
    };

    const observer = new IntersectionObserver(handleScroll, {
      threshold: 0.5, // Trigger when 50% of the element is in view
    });

    observer.observe(imageRef.current);
    observer.observe(textRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div className="section8">
      <div className="container col-xxl-8 px-4 py-5">
        <div className="row flex-lg-row-reverse align-items-center g-3 py-5">
          <div
            ref={imageRef}
            className={`col-10 col-sm-8 col-lg-4 px-2 ${
              isImageVisible ? "fade-in-left" : "hidden"
            }`}
          >
            <img
              src="/assets/_347853df-4f67-48eb-8852-c96e432dd868-removebg-preview.png"
              className="d-block mx-lg-auto img-fluid"
              alt="Zero Hunger"
              width="450"
              height="450"
              loading="lazy"
            />
          </div>
          <div
            ref={textRef}
            className={`col-lg-8 px-6 ${
              isTextVisible ? "fade-in-right" : "hidden"
            }`}
          >
            <h2 className="display-7 fw-bold lh-1 mb-3 story">
              A Short Story About Zero Hunger
            </h2>
            <p className="story-info">
              Two years ago, a group of passionate young developers stumbled
              upon a startling statistic: nearly 9 million people die each year
              from hunger and hunger-related diseases, while tons of food go to
              waste daily. Deeply moved by this, they began researching the
              causes of food insecurity and waste. They spent hours speaking
              with grassroots organizations, reading everything from "The End of
              Poverty" to tech solutions for sustainable development, and
              realized technology could bridge the gap. Inspired by their
              findings, they founded the Zero Hunger Initiative, a platform
              aimed at connecting surplus food from communities to those in
              need, reducing waste and feeding the hungry.
            </p>
            <div className="d-grid gap-2 d-md-flex justify-content-md-start">
              <div className="Portfolio">
                <div className="happy number" data-target="650">
                  <Counter target={650} />
                </div>
                <div>People Connected</div>
              </div>
              <div className="Portfolio">
                <div className="year number" data-target="2">
                  <Counter target={2} />
                </div>
                <div>Years of Experience</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
