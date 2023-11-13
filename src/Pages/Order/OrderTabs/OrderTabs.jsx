import FoodCard from "../../../Component/FoodCard/FoodCard";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';



const OrderTabs = ({items}) => {
    const pagination = {
        clickable: true,
        renderBullet: function (index, className) {
          return '<span class="' + className + '">' + (index + 1) + '</span>';
        },
      };

    return (
        <div className=" my-10">
             <Swiper
        pagination={pagination}
        modules={[Pagination]}
        className="mySwiper"
      ></Swiper>
            
            <SwiperSlide>
            <div className="grid gap-8 md:grid-cols-3">
            {
                items?.map(item => <FoodCard key={item._id} item={item}></FoodCard>)
            }
            </div>

            </SwiperSlide>
          
        </div>
    );
};

export default OrderTabs;