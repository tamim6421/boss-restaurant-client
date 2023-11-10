

const FoodCard = ({item}) => {
    const{name, image, recipe, price} = item
  return (
    <div className="card  bg-base-100 shadow-xl">
      <figure>
        <img
          src={image}
          alt="Shoes"
        />
      </figure>
        <p className="absolute right-2 top-0 px-4 rounded-lg bg-slate-900 p-1 text-white text-lg font-semibold"> ${price} </p>
      <div className="card-body flex flex-col items-center text-center">
        <h2 className="card-title">{name}</h2>
        <p>{recipe}</p>
      
        <div className="card-actions justify-center">
          <button className="btn btn-outline border-0 border-b-4 bg-orange-50 border-orange-500 text-orange-500 hover:bg-orange-500">add to cart</button>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
