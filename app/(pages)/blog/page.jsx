import Blog from "@components/pages/homepages/Blog";
import React from "react";

export const metadata = {
  title: "Our Blog - Supracarer",
  description: "Stay updated with intutive News/Blog.",
};

const page = () => {
  return (
    <div>
      <Blog />
    </div>
  );
};

export default page;
