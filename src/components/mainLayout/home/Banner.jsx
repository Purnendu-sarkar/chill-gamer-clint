import React from "react";
import Slider from "react-slick";
import { Typewriter } from "react-simple-typewriter";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Banner = () => {
  const settings = {
    dots: true, 
    infinite: true,
    slidesToShow: 1, 
    slidesToScroll: 1, 
    autoplay: true, 
    autoplaySpeed: 3000, 
  };

  return (
    <div className="w-full max-w-6xl mx-auto my-8">
      <Slider {...settings}>
        {/* Slide 1 */}
        <div className="relative">
          <img
            src="https://via.placeholder.com/1200x400/0000FF/FFFFFF?text=ChillGamer+Welcome"
            alt="Welcome to ChillGamer"
            className="w-full h-auto object-cover rounded-lg"
          />
          <div className="absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-50 text-white p-8 rounded-lg">
            <h2 className="text-3xl font-bold mb-4">
              Welcome to ChillGamer
            </h2>
            <p className="text-lg">
              <Typewriter
                words={[
                  "Your ultimate gaming platform!",
                  "Discover tips, reviews, and news!",
                ]}
                loop={0}
                cursor
                cursorStyle="_"
                typeSpeed={70}
                deleteSpeed={50}
                delaySpeed={1000}
              />
            </p>
          </div>
        </div>

        {/* Slide 2 */}
        <div className="relative">
          <img
            src="https://via.placeholder.com/1200x400/008000/FFFFFF?text=Latest+Reviews"
            alt="Latest Reviews"
            className="w-full h-auto object-cover rounded-lg"
          />
          <div className="absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-50 text-white p-8 rounded-lg">
            <h2 className="text-3xl font-bold mb-4">Latest Reviews</h2>
            <p className="text-lg">
              <Typewriter
                words={[
                  "Stay updated with the newest games!",
                  "Check out community opinions!",
                ]}
                loop={0}
                cursor
                cursorStyle="_"
                typeSpeed={70}
                deleteSpeed={50}
                delaySpeed={1000}
              />
            </p>
          </div>
        </div>

        {/* Slide 3 */}
        <div className="relative">
          <img
            src="https://t4.ftcdn.net/jpg/03/21/46/67/360_F_321466763_iagrZEUcy7HqZWlkm4berdYcAyePpJQN.jpg"
            alt="Join Our Community"
            className="w-full h-auto object-cover rounded-lg"
          />
          <div className="absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-50 text-white p-8 rounded-lg">
            <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
            <p className="text-lg">
              <Typewriter
                words={[
                  "Sign up today!",
                  "Share your reviews and ratings!",
                ]}
                loop={0}
                cursor
                cursorStyle="_"
                typeSpeed={70}
                deleteSpeed={50}
                delaySpeed={1000}
              />
            </p>
          </div>
        </div>
      </Slider>
    </div>
  );
};

export default Banner;
