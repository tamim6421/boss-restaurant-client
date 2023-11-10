import FoodCard from "../../../Component/FoodCard/FoodCard";


const OrderTabs = ({items}) => {
    return (
        <div>
             <div className="grid gap-8 md:grid-cols-3">
            {
                items.map(item => <FoodCard key={item._id} item={item}></FoodCard>)
            }
            </div>
        </div>
    );
};

export default OrderTabs;