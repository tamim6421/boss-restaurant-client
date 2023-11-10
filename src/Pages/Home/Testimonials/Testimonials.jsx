import SectionTitle from "../../../Component/SectionTitle/SectionTitle";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useEffect, useState } from "react";
import { Rating } from "@smastrom/react-rating";
import '@smastrom/react-rating/style.css'

const Testimonials = () => {
    const [review, setReview] = useState([])

    useEffect( () =>{
        fetch('http://localhost:5000/review')
        .then( res => res.json())
        .then( data =>{
            setReview(data)
        })
    } ,[] )


    return (
        <div className="my-20">
            <SectionTitle
            subTitle={'What Our Client Say'}
            title={"testimonials"}
            ></SectionTitle>
            <section>
            <Swiper
        cssMode={true}
        navigation={true}
        pagination={true}
        mousewheel={true}
        keyboard={true}
        modules={[Navigation, Pagination, Mousewheel, Keyboard]}
        className="mySwiper"
      >
        
            {
                review?.map( view => <SwiperSlide key={view._id}>
                  <div className="mx-24 my-16 space-y-4 flex flex-col items-center">
                  <Rating
                        style={{ maxWidth: 180 }}
                        value={view.rating}
                        readOnly
                        />

                  <p> {view.details} </p>
                    <p className="text-2xl  text-orange-400"> {view.name} </p>
                    </div>  

                </SwiperSlide> )
            }
      </Swiper>
            </section>
        </div>
    );
};

export default Testimonials;