import React from "react";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import img1 from "../../../../src/assets/sliderImg/slider1.jpg";
import img2 from "../../../../src/assets/sliderImg/slider2.jpg";
import img3 from "../../../../src/assets/sliderImg/slider3.jpg";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import { NavLink } from "react-router";

const Banner = () => {
  const banner = [
    {
      title: "Real-Time Asset Tracking & Analytics",
      subtitle:
        "Gain instant insights into your asset utilization with powerful analytics dashboards. Monitor asset lifecycle, track maintenance schedules, and optimize resource allocation across your organization with data-driven decisions.",
      imgLocation: img1,
    },
    {
      title: "Seamless Employee Self-Service Portal",
      subtitle:
        "Empower your workforce with intuitive self-service capabilities. Employees can request assets, track approvals, and manage their assigned resources effortlessly, reducing HR workload and improving satisfaction rates.",
      imgLocation: img2,
    },
    {
      title: "Streamline Your Corporate Asset Management",
      subtitle:
        "AssetVerse empowers HR departments and employees to track, assign, and manage company assets with unprecedented efficiency. Reduce administrative overhead by 60% while maintaining complete visibility over your corporate inventory.",
      imgLocation: img3,
    },
  ];
  return (
    <div className="mb-14">
      <Swiper
        className="mySwiper"
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination]}
      >
        {banner.map((item, index) => (
          <SwiperSlide key={index}>
            {/* <div className="rounded-2xl overflow-hidden">
              <div
                className={`w-full h-[300px] sm:h-[550px] bg-[linear-gradient(90deg,#000000ba,#00000000),url("${item.imgLocation}")] bg-no-repeat bg-cover bg-center `}
              >
              
                <div className="h-full  flex justify-start px-20">
                  <div className=" h-full sm:w-3/5 flex flex-col justify-center items-start gap-5 text-white overflow-hidden">
                    <h3 className="text-3xl sm:text-6xl font-bold">
                      {item.title}
                    </h3>
                    <p className="text-sm leading-snug  sm:text-lg max-w-11/12 ">
                      {item.subtitle}
                    </p>
                    <NavLink to="/dashboard">
                      <button className="btn btn-outline rounded-full ">
                        Get Started Now
                      </button>
                    </NavLink>
                  </div>
                </div>
              </div>

            </div> */}

            <div className="relative rounded-2xl overflow-hidden h-[300px] sm:h-[400px] md:h-[550px]">
              {/* Image */}
              <img
                src={item.imgLocation}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover"
              />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 sm:from-black/70 to-transparent" />

              {/* Content */}
              <div className="relative h-full flex px-4 sm:px-20">
                <div className="sm:w-3/5 flex flex-col justify-center gap-4 sm:gap-6 text-white">
                  <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm md:text-md lg:text-lg leading-snug max-w-[90%]">
                    {item.subtitle}
                  </p>

                  <NavLink to="/dashboard">
                    <button className="btn btn-outline rounded-full">
                      Get Started Now
                    </button>
                  </NavLink>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
