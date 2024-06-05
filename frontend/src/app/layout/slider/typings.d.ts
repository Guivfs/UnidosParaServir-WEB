declare module 'slick-carousel/slick/slick' {
    interface SlickOptions {
      slidesToShow: number;
      slidesToScroll: number;
      autoplay: boolean;
      autoplaySpeed: number;
      dots: boolean;
      arrows: boolean;
      responsive: Array<{
        breakpoint: number;
        settings: {
          slidesToShow: number;
          slidesToScroll: number;
          infinite?: boolean;
          dots?: boolean;
        };
      }>;
    }
  
    interface JQuery {
      slick(options?: SlickOptions): JQuery;
    }
  }
  