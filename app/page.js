"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import Image from "next/image";
import React from "react";

gsap.registerPlugin(SplitText);
const page = () => {
  useGSAP(() => {
    const splitTextIntoLines = (selector, options = {}) => {
      const defaults = {
        type: "lines",
        mask: "lines",
        linesClass: "line",
        ...options,
      };

      return SplitText.create(selector, defaults);
    };
    splitTextIntoLines(".preloader-copy p");
    splitTextIntoLines(".preloader-counter p");

    gsap.set(["nav", ".hero-img", ".hero-content"], {
      y: "35svh",
    });
    const animateCounter = (selector, duration = 5, delay = 0) => {
      const counterElement = document.querySelector(selector);
      let currentValue = 0;
      const updateInterval = 200;
      const maxDuration = duration * 1000;
      const startTime = Date.now();

      setTimeout(() => {
        const updateCounter = () => {
          const elapsedTime = Date.now() - startTime;
          const progress = elapsedTime / maxDuration;

          if (currentValue < 100 && elapsedTime < maxDuration) {
            const target = Math.floor(progress * 100);
            const jump = Math.floor(Math.random() * 25) + 5;
            currentValue = Math.min(currentValue + jump, target, 100);

            counterElement.textContent = currentValue
              .toString()
              .padStart(2, "0");
            setTimeout(updateCounter, updateInterval + Math.random() * 100);
          } else {
            counterElement.textContent = "100";
          }
        };

        updateCounter();
      }, delay * 1000);
    };
    animateCounter(".preloader-counter p", 4.5, 2);

    const tl = gsap.timeline();

    tl.to([".preloader-copy p .line", ".preloader-counter p .line"], {
      y: "0%",
      duration: 1,
      stagger: 0.075,
      ease: "power3.out",
      delay: 1,
    })
      .to(
        ".preloader-revealer",
        {
          scale: 0.1,
          duration: 0.75,
          ease: "power2.out",
        },
        "<"
      )
      .to(".preloader-revealer", {
        scale: 0.25,
        duration: 1,
        ease: "power3.out",
      })
      .to(".preloader-revealer", {
        scale: 0.5,
        duration: 0.75,
        ease: "power3.out",
      })
      .to(".preloader-revealer", {
        scale: 0.75,
        duration: 0.5,
        ease: "power2.out",
      })
      .to(".preloader-revealer", {
        scale: 1,
        duration: 1,
        ease: "power3.out",
      })
      .to(
        ".preloader",
        {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
          duration: 1.25,
          ease: "power3.out",
        },
        "-=1"
      )
      .to(
        ["nav", ".hero-img", ".hero-content"],
        {
          y: "0%",
          duration: 1.25,
          ease: "power3.out",
        },
        "<"
      );
  });
  return (
    <div>
      <div className="preloader">
        <div className="preloader-revealer"></div>

        <div className="preloader-copy">
          <div className="preloader-copy-col">
            <p>
              Handpicked collections shaped by artistry, balancing rare elements
              with a focus on purity.
            </p>
          </div>
          <div className="preloader-copy-col">
            <p>
              Explore timeless essentials built with care, thoughtfully designed
              to guide you.
            </p>
          </div>
        </div>

        <div className="preloader-counter">
          <p>00</p>
        </div>
      </div>

      <nav>
        <div className="nav-logo">
          <a href="#">Atelier Vale</a>
        </div>

        <div className="nav-links">
          <a href="#">Collections</a>
          <a href="#">New Arrivals</a>
          <a href="#">The Atelier</a>
          <a href="#">Support</a>
        </div>

        <div className="nav-cta">
          <a href="#">Create Account</a>
        </div>
      </nav>

      <section className="hero">
        <div className="hero-img">
          <Image src="/hero.jpg" alt="" width={600} height={600} />
        </div>

        <div className="hero-content">
          <div className="product-name">
            <p>[ Ember No. 04 ]</p>
          </div>
          <div className="product-link">
            <a href="#">View the Collection</a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default page;
