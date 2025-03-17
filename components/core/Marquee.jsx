import React from "react";

const Marquee = () => {


  return (
    <div className="w-full h-[300px] md:h-[400px] lg:h-[400px] bg-news-letter bg-cover bg-[center_top_-50px] flex items-center overflow-hidden relative">
      {/* Marquee Container */}
      <div className="absolute flex whitespace-nowrap animate-marquee">
        {/* Duplicate text ensures seamless looping */}
        <h1
          className="text-transparent text-4xl md:text-6xl lg:text-8xl font-light tracking-wide uppercase px-4"
          style={{
            WebkitTextStroke: "0.9px black",
            whiteSpace: "nowrap",
          }}
        >
         Home Care • Elderly Care • Home Care • Elderly Care • Home Care • Elderly Care • 
        </h1>
        <h1
          className="text-transparent text-4xl md:text-6xl lg:text-8xl font-light tracking-wide uppercase px-4"
          style={{
            WebkitTextStroke: "0.9px black",
            whiteSpace: "nowrap",
          }}
        >
         Home Care • Elderly Care • Home Care • Elderly Care • Home Care • Elderly Care • 
        </h1>
      </div>

   
    </div>
  );
};

export default Marquee;
