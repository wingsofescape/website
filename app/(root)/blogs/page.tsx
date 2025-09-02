import Image from "next/image";
import React from "react";
import HeroBannerImage from "@/public/images/blogs/blogsHeroBanner.jpg";

function Blogs() {
  return (
    <div>
      <Image
        alt="Page Banner Image"
        src={HeroBannerImage}
        style={{ height: "90vh", width: "100%" }}
        className="object-cover"
      />
    </div>
  );
}

export default Blogs;
