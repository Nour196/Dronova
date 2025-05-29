import React, { useEffect, useRef, useState } from 'react';

const Slide = () => {
  // Refs for DOM elements
  const nextRef = useRef(null);
  const prevRef = useRef(null);
  const carouselRef = useRef(null);
  const sliderRef = useRef(null);
  const thumbnailBorderRef = useRef(null);
  const timeRef = useRef(null);
  
  // Refs for timeouts
  const runTimeOutRef = useRef(null);
  const runNextAutoRef = useRef(null);

  // State for active slide
  const [activeSlide, setActiveSlide] = useState(null);

  // Configuration constants
  const timeRunning = 3000;
  const timeAutoNext = 7000;

  useEffect(() => {
    // Initialize thumbnail
    const thumbnailItems = thumbnailBorderRef.current?.querySelectorAll('.thumbnail .item');
    if (thumbnailBorderRef.current && thumbnailItems && thumbnailItems.length > 0) {
      thumbnailBorderRef.current.appendChild(thumbnailItems[0]);
    }

    // Set up auto-rotation
    runNextAutoRef.current = setTimeout(() => {
      nextRef.current?.click();
    }, timeAutoNext);

    // Cleanup function
    return () => {
      clearTimeout(runTimeOutRef.current);
      clearTimeout(runNextAutoRef.current);
    };
  }, []);

  const handleSlideClick = (index) => {
    setActiveSlide(activeSlide === index ? null : index);
  };

  const navigateToSlide = (index) => {
    const sliderItems = sliderRef.current?.querySelectorAll('.list .item');
    if (!sliderItems) return;

    // Move the target slide to the front
    const targetSlide = sliderItems[index];
    if (targetSlide) {
      sliderRef.current.prepend(targetSlide);
      setActiveSlide(index);
    }
  };

  const showSlider = (type) => {
    const sliderItems = sliderRef.current?.querySelectorAll('.list .item');
    const thumbnailItems = thumbnailBorderRef.current?.querySelectorAll('.thumbnail .item');
    
    if (!sliderItems || !thumbnailItems) return;
    
    if (type === 'next') {
      sliderRef.current.appendChild(sliderItems[0]);
      thumbnailBorderRef.current.appendChild(thumbnailItems[0]);
      carouselRef.current.classList.add('next');
    } else {
      sliderRef.current.prepend(sliderItems[sliderItems.length - 1]);
      thumbnailBorderRef.current.prepend(thumbnailItems[thumbnailItems.length - 1]);
      carouselRef.current.classList.add('prev');
    }

    clearTimeout(runTimeOutRef.current);
    runTimeOutRef.current = setTimeout(() => {
      carouselRef.current?.classList.remove('next');
      carouselRef.current?.classList.remove('prev');
    }, timeRunning);

    clearTimeout(runNextAutoRef.current);
    runNextAutoRef.current = setTimeout(() => {
      nextRef.current?.click();
    }, timeAutoNext);
  };

  return (
    <div className="bg-black text-gray-200 font-poppins text-xs w-full" id='slides'>
      {/* Carousel */}
      <div ref={carouselRef} className="carousel h-[100vh] mt-[-50px] w-full overflow-hidden relative">
        {/* List items */}
        <div ref={sliderRef} className="list">
          {/* Item 1 */}
          <div 
            className={`item w-full h-full absolute inset-0 ${activeSlide === 0 ? 'active' : ''}`}
            onClick={() => handleSlideClick(0)}
          >
            <img src="src/components/logo.webp" className="w-full h-full object-cover" alt="Slide 1" />
            <div className="content absolute top-[20%] w-full max-w-[80%] left-1/2 transform -translate-x-1/2 pr-[30%] box-border text-white text-shadow">
              <div className="author font-bold tracking-[10px] animate-showContent">Agriculture</div>
              <div className="title text-5xl font-bold leading-[1.3em] animate-showContent animation-delay-1-2s">DESIGN SLIDER</div>
              <div className="topic text-5xl font-bold leading-[1.3em] text-[#f1683a] animate-showContent animation-delay-1-4s">ANIMAL</div>
              <div className="des animate-showContent animation-delay-1-6s">
              Optimize farming with drone-powered irrigation, crop health analysis, and large-scale field surveillance.
              </div>
              <div className="buttons grid grid-cols-2 w-[260px] gap-[5px] mt-[20px] animate-showContent animation-delay-1-8s">
                <button className="bg-gray-200 border-none tracking-[3px] font-poppins font-medium h-[40px]">SEE MORE</button>
              </div>
            </div>
          </div>

          {/* Item 2 */}
          <div 
            className={`item w-full h-full absolute inset-0 ${activeSlide === 1 ? 'active' : ''}`}
            onClick={() => handleSlideClick(1)}
          >
            <img src="src/components/logo.webp" className="w-full h-full object-cover" alt="Slide 2" />
            <div className="content absolute top-[20%] w-full max-w-[80%] left-1/2 transform -translate-x-1/2 pr-[30%] box-border text-white text-shadow">
              <div className="author font-bold tracking-[10px]">Industry</div>
              <div className="title text-5xl font-bold leading-[1.3em]">IndustryR</div>
              <div className="topic text-5xl font-bold leading-[1.3em] text-[#f1683a]">ANIMAL</div>
              <div className="des">
              Use drones for factory inspections, construction site monitoring, and infrastructure assessments with speed and precision.
              </div>
              <div className="buttons grid grid-cols-2 w-[260px] gap-[5px] mt-[20px]">
                <button className="bg-gray-200 border-none tracking-[3px] font-poppins font-medium h-[40px]">SEE MORE</button>
              </div>
            </div>
          </div>

          {/* Item 3 */}
          <div 
            className={`item w-full h-full absolute inset-0 ${activeSlide === 2 ? 'active' : ''}`}
            onClick={() => handleSlideClick(2)}
          >
            <img src="src/components/logo.webp" className="w-full h-full object-cover" alt="Slide 3" />
            <div className="content absolute top-[20%] w-full max-w-[80%] left-1/2 transform -translate-x-1/2 pr-[30%] box-border text-white text-shadow">
              <div className="author font-bold tracking-[10px]">Security</div>
              <div className="title text-5xl font-bold leading-[1.3em]">Security</div>
              <div className="topic text-5xl font-bold leading-[1.3em] text-[#f1683a]">ANIMAL</div>
              <div className="des">
              Enhance security with aerial monitoring, real-time surveillance, and rapid incident response.
              </div>
              <div className="buttons grid grid-cols-2 w-[260px] gap-[5px] mt-[20px]">
                <button className="bg-gray-200 border-none tracking-[3px] font-poppins font-medium h-[40px]">SEE MORE</button>
              </div>
            </div>
          </div>

          {/* Item 4 */}
          <div 
            className={`item w-full h-full absolute inset-0 ${activeSlide === 3 ? 'active' : ''}`}
            onClick={() => handleSlideClick(3)}
          >
            <img src="src/components/IMG_20210408_185429.jpg" className="w-full h-full object-cover" alt="Slide 4" />
            <div className="content absolute top-[20%] w-full max-w-[80%] left-1/2 transform -translate-x-1/2 pr-[30%] box-border text-white text-shadow">
              <div className="author font-bold tracking-[10px]">Customize</div>
              <div className="title text-5xl font-bold leading-[1.3em]">Customize</div>
              <div className="topic text-5xl font-bold leading-[1.3em] text-[#f1683a]">ANIMAL</div>
              <div className="des">
              Choose the right drone, camera, and features to match your specific needs.
              </div>
              <div className="buttons grid grid-cols-2 w-[260px] gap-[5px] mt-[20px]">
                <button className="bg-gray-200 border-none tracking-[3px] font-poppins font-medium h-[40px]">SEE MORE</button>
              </div>
            </div>
          </div>

          {/* Item 5 */}
          <div 
            className={`item w-full h-full absolute inset-0 ${activeSlide === 4 ? 'active' : ''}`}
            onClick={() => handleSlideClick(4)}
          >
            <img src="src/components/logo.webp" className="w-full h-full object-cover" alt="Slide 5" />
            <div className="content absolute top-[20%] w-full max-w-[80%] left-1/2 transform -translate-x-1/2 pr-[30%] box-border text-white text-shadow">
              <div className="author font-bold tracking-[10px]">Agriculture</div>
              <div className="title text-5xl font-bold leading-[1.3em]">Agriculture</div>
              <div className="topic text-5xl font-bold leading-[1.3em] text-[#f1683a]">Agriculture</div>
              <div className="des">
              Optimize farming with drone-powered irrigation, crop health analysis, and large-scale field surveillance.
              </div>
              <div className="buttons grid grid-cols-2 w-[260px] gap-[5px] mt-[20px]">
                <button className="bg-gray-200 border-none tracking-[3px] font-poppins font-medium h-[40px]">SEE MORE</button>
              </div>
            </div>
          </div>

          {/* Item 6 */}
          <div 
            className={`item w-full h-full absolute inset-0 ${activeSlide === 5 ? 'active' : ''}`}
            onClick={() => handleSlideClick(5)}
          >
            <img src="src/assets/drone1.jfif" className="w-full h-full object-cover" alt="Slide 6" />
            <div className="content absolute top-[20%] w-full max-w-[80%] left-1/2 transform -translate-x-1/2 pr-[30%] box-border text-white text-shadow">
              <div className="author font-bold tracking-[10px]">Customize</div>
              <div className="title text-5xl font-bold leading-[1.3em]">Customize</div>
              <div className="topic text-5xl font-bold leading-[1.3em] text-[#f1683a]">Customize</div>
              <div className="des">
              Choose the right drone, camera, and features to match your specific needs.
              </div>
              <div className="buttons grid grid-cols-2 w-[260px] gap-[5px] mt-[20px]">
                <button className="bg-gray-200 border-none tracking-[3px] font-poppins font-medium h-[40px]">SEE MORE</button>
              </div>
            </div>
          </div>
        </div>
       

        {/* Thumbnail */}
        <div ref={thumbnailBorderRef} className="thumbnail absolute bottom-[50px] left-1/2 w-max z-[100] flex gap-[20px]">
          <div 
            className="item w-[150px] h-[220px] flex-shrink-0 relative cursor-pointer"
            onClick={() => navigateToSlide(0)}
          >
            <img src="src/components/logo.webp" className="w-full h-full object-cover rounded-[20px]" alt="Thumb 1" />
            <div className="content text-white absolute bottom-[10px] left-[10px] right-[10px]">
          
            </div>
          </div>
          <div 
            className="item w-[150px] h-[220px] flex-shrink-0 relative cursor-pointer"
            onClick={() => navigateToSlide(1)}
          >
            <img src="src/components/logo.webp" className="w-full h-full object-cover rounded-[20px]" alt="Thumb 2" />
            <div className="content text-white absolute bottom-[10px] left-[10px] right-[10px]">
             
            </div>
          </div>
          <div 
            className="item w-[150px] h-[220px] flex-shrink-0 relative cursor-pointer"
            onClick={() => navigateToSlide(2)}
          >
            <img src="src/components/logo.webp" className="w-full h-full object-cover rounded-[20px]" alt="Thumb 3" />
            <div className="content text-white absolute bottom-[10px] left-[10px] right-[10px]">
              
            </div>
          </div>
          <div 
            className="item w-[150px] h-[220px] flex-shrink-0 relative cursor-pointer"
            onClick={() => navigateToSlide(3)}
          >
            <img src="src/components/IMG_20210408_185429.jpg" className="w-full h-full object-cover rounded-[20px]" alt="Thumb 4" />
            <div className="content text-white absolute bottom-[10px] left-[10px] right-[10px]">
             
            </div>
          </div>
        </div>

        {/* Arrows */}
        <div className="arrows absolute top-[80%] right-[52%] z-[100] w-[300px] max-w-[30%] flex gap-[10px] items-center">
          <button
            ref={prevRef}
            onClick={() => showSlider('prev')}
            className="w-[40px] h-[40px] rounded-full bg-[#eee4] border-none text-white font-mono font-bold transition duration-500 hover:bg-white hover:text-black"
          >
            &lt;
          </button>
          <button
            ref={nextRef}
            onClick={() => showSlider('next')}
            className="w-[40px] h-[40px] rounded-full bg-[#eee4] border-none text-white font-mono font-bold transition duration-500 hover:bg-white hover:text-black"
          >
            &gt;
          </button>
        </div>

        {/* Time running */}
        <div ref={timeRef} className="time absolute z-[1000] w-0 h-[3px] bg-[#f1683a] left-0 top-0"></div>
      </div>

      {/* Styles */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
        
        .text-shadow {
          text-shadow: 0 5px 10px rgba(0, 0, 0, 0.3);
        }
        
        .animate-showContent {
          animation: showContent 0.5s 1s linear 1 forwards;
          opacity: 0;
          filter: blur(10px);
          transform: translateY(30px);
        }
        
        .animation-delay-1-2s {
          animation-delay: 1.2s !important;
        }
        
        .animation-delay-1-4s {
          animation-delay: 1.4s !important;
        }
        
        .animation-delay-1-6s {
          animation-delay: 1.6s !important;
        }
        
        .animation-delay-1-8s {
          animation-delay: 1.8s !important;
        }
        
        @keyframes showContent {
          to {
            opacity: 1;
            filter: blur(0);
            transform: translateY(0);
          }
        }
        
        .carousel.next .list .item:nth-child(1) img {
          animation: showImage 0.5s linear 1 forwards;
        }
        
        @keyframes showImage {
          to {
            bottom: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border-radius: 0;
          }
        }
        
        .carousel.next .thumbnail .item:nth-last-child(1) {
          animation: showThumbnail 0.5s linear 1 forwards;
        }
        
        @keyframes showThumbnail {
          from {
            width: 0;
            opacity: 0;
          }
        }
        
        .carousel.next .thumbnail {
          animation: effectNext 0.5s linear 1 forwards;
        }
        
        @keyframes effectNext {
          from {
            transform: translateX(150px);
          }
        }
        
        .carousel.next .time,
        .carousel.prev .time {
          animation: runningTime 3s linear 1 forwards;
        }
        
        @keyframes runningTime {
          from { width: 100% }
          to { width: 0 }
        }
        
        .carousel.prev .list .item:nth-child(2) img {
          animation: outFrame 0.5s linear 1 forwards;
        }
        
        @keyframes outFrame {
          to {
            width: 150px;
            height: 220px;
            bottom: 50px;
            left: 50%;
            border-radius: 20px;
          }
        }
        
        .carousel.prev .thumbnail .item:nth-child(1) {
          animation: showThumbnail 0.5s linear 1 forwards;
        }
        
        .carousel.prev .list .item:nth-child(2) .content .author,
        .carousel.prev .list .item:nth-child(2) .content .title,
        .carousel.prev .list .item:nth-child(2) .content .topic,
        .carousel.prev .list .item:nth-child(2) .content .des,
        .carousel.prev .list .item:nth-child(2) .content .buttons {
          animation: contentOut 1.5s linear 1 forwards !important;
        }
        
        @keyframes contentOut {
          to {
            transform: translateY(-150px);
            filter: blur(20px);
            opacity: 0;
          }
        }
        
        @media (max-width: 678px) {
          .carousel .list .item .content {
            padding-right: 0;
          }
          .carousel .list .item .content .title {
            font-size: 30px;
          }
        }

        .item {
          transition: transform 0.3s ease;
          cursor: pointer;
        }

        .item:not(.active):hover {
          transform: scale(1.05);
        }

        .item.active {
          transform: scale(1.1);
          z-index: 10;
        }

        .item.active:hover {
          transform: scale(1.15);
        }

        .thumbnail .item {
          transition: transform 0.3s ease;
        }

        .thumbnail .item:hover {
          transform: scale(1.1);
        }
      `}</style>
    </div>
  );
};

export default Slide;