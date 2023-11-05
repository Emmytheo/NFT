import { Stack } from '@mui/material';
import { useState } from 'react';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    slidesToSlide: 1 // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 764 },
    items: 2,
    slidesToSlide: 2 // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 764, min: 0 },
    items: 1,
    // slidesToSlide: 1 // optional, default to 1.
  }
};

const TicketsCarousel = (props) =>{
  const { deviceType, elements, resp } = props;
  const [respnsv, setRespnsv] = useState(responsive);

  // useEffect(()=>{
  //   if(resp && resp.mobile){
  //     let respp = respnsv;
  //     respp.mobile.items = resp.mobile.items;
  //     setRespnsv(respp);
  //   }
  // }, [resp, respnsv])
  
  return(
    <Carousel
        swipeable={true}
        draggable={false}
        showDots={true}
        responsive={respnsv}
        ssr={false} // means to render carousel on server-side.
        infinite={true}
        autoPlay={false}
        autoPlaySpeed={6000}
        keyBoardControl={true}
        customTransition="all .5"
        transitionDuration={500}
        containerClass="carousel-container"
        removeArrowOnDeviceType={[""]}
        deviceType={deviceType}
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
    >
      {
        elements.map(item => (
          <Stack marginX={1} paddingY={2} paddingX={1} >
            {item}
          </Stack>
        ))
      }
    </Carousel>
    );
}

export default TicketsCarousel