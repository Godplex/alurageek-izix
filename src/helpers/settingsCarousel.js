export const settingsCarousel = (items) => {
  return {
    arrows: false,
    dots: false,
    infinite: (items > 6) ? true : false,
    autoplay: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplaySpeed: 4000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 960,
        settings: {
          infinite: (items > 4) ? true : false,
          slidesToShow: 4,
          dots: true,
        },
      },
      {
        breakpoint: 720,
        settings: {
          infinite: (items > 2) ? true : false,
          slidesToShow: 2,
          dots: true,
          rows: 2,
        },
      },
    ],
  }
};
