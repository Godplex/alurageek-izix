export const settingsCarousel = {
  arrows: false,
  dots: false,
  infinite: true,
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
        slidesToShow: 4,
        dots: true,
      },
    },
    {
      breakpoint: 720,
      settings: {
        slidesToShow: 2,
        dots: true,
        rows: 2,
      },
    },
  ],
};
