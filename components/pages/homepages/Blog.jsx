import React from "react";
import FeatureBg from "../FeatureBg";
import Footer from "@components/landing/Footer";
import Subscription from "@components/landing/Subscription";

const Blog = () => {
  return (
    <section>
      <FeatureBg
        heading="News/Blog"
        subheading="Stay current with our well-informed blog"
      />

     {/* Centered Coming Soon */}
      <div className="flex items-center justify-center min-h-[40vh]">
        <h2 className="text-2xl md:text-4xl font-bold text-haven-blue text-center">
          🚧 Coming Soon 🚧
        </h2>
      </div>


      <Subscription />

      <Footer />
    </section>
    
  );
};

export default Blog;
