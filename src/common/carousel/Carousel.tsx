import { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CryptoCard from "../crypto-card/CryptoCard";
import type { CryptoToken } from "../../features/crypto/cryptoSlice";
import arrowLeftIcon from "../../assets/icons/arrow-left.svg";
import arrowRightIcon from "../../assets/icons/arrow-right.svg";

type CarouselProps = {
  slides: CryptoToken[];
  isFullView: boolean;
};

const Carousel = ({ slides, isFullView }: CarouselProps) => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const sliderRef = useRef<Slider | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    function updateWidth() {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.getBoundingClientRect().width);
      }
    }

    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const filteredSlides = isFullView
    ? slides.filter((s) => s.isFavorite)
    : slides;

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: `${containerWidth * 0.3 - 50}px`,
    arrows: false,
    beforeChange: (_: number, next: number) => setCurrentSlide(next),
    swipe: false,
    draggable: false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          swipe: true,
          draggable: true,
        },
      },
    ],
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-center w-full">
        <div className="w-full overflow-hidden" ref={containerRef}>
          <Slider {...settings} ref={sliderRef}>
            {filteredSlides.map((slide, index) => {
              const isCenter = index === currentSlide;
              return (
                <div key={slide.short}>
                  <CryptoCard
                    isFullView={isFullView}
                    isCenter={isCenter}
                    slide={slide}
                  />
                </div>
              );
            })}
          </Slider>
        </div>
      </div>
      <div className="flex justify-center gap-20 mt-16 mb-8">
        <button onClick={() => sliderRef.current?.slickPrev()}>
          <img src={arrowLeftIcon} />
        </button>
        <button onClick={() => sliderRef.current?.slickNext()}>
          <img src={arrowRightIcon} />
        </button>
      </div>
    </div>
  );
};

export default Carousel;
