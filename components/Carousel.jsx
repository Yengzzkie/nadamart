import React, { Component } from "react";
import Slider from "react-slick";

function Carousel() {
  const settings = {
    customPaging: function(i) {
      return (
        <a>
          <img src={"https://images.unsplash.com/photo-1744190070186-ceeba324c2d6?q=80&w=3687&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} />
        </a>
      );
    },
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  return (
    <div className="slider-container">
      <Slider {...settings}>
        <div>
          <img src={"https://images.unsplash.com/photo-1744190070186-ceeba324c2d6?q=80&w=3687&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} />
        </div>
        <div>
          <img src={"https://plus.unsplash.com/premium_photo-1673264933110-1f5cdbe5fef4?q=80&w=3687&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} />
        </div>
        <div>
          <img src={"https://images.unsplash.com/photo-1744190070186-ceeba324c2d6?q=80&w=3687&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} />
        </div>
        <div>
          <img src={"https://images.unsplash.com/photo-1744190070186-ceeba324c2d6?q=80&w=3687&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} />
        </div>
      </Slider>
    </div>
  );
}

export default Carousel;
