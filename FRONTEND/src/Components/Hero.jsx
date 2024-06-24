import React from "react";
import image from "../assets/image6.jpg";
const Hero = () => {
  return (
    <div className="">
      <nav className="flex justify-center items-center py-2 ">
        
          <h1 className='text-slate-700 font-bold text-3xl lg:text-6xl '>
            Find your next <span className='text-slate-500'> perfect </span>
            place with ease
          </h1>
          
  
      </nav>
      <div className="h-[500px] relative">
        <img
          src={image}
          alt=""
          className="w-full h-full object-cover rounded-md relative"
        />

        {/* {offerListings &&
          offerListings.length > 0 &&
          offerListings.map((listing) => (
            <SwiperSlide>
            
            </SwiperSlide>
          ))} */}
      </div>

    </div>
  );
};

export default Hero;
