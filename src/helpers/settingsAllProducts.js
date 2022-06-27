
export const settingsAllProducts = (items) => {

  return {
    arrows: false,
    dots: false,
    infinite: (items > 18) ? true : false,
    autoplay: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplaySpeed: 4000,
    cssEase: "linear",
    rows: 3,
    responsive: [
      {
        breakpoint: 960,
        settings: {
          infinite: (items > 12) ? true : false,
          slidesToShow: 4,
          dots: true,
        },
      },
      {
        breakpoint: 720,
        settings: {
          infinite: (items > 6) ? true : false,
          slidesToShow: 2,
          dots: true,
        },
      },
    ],
  }

};
