

const MenuItems = ({item}) => {
    const{name, image, recipe, price} = item
    // console.log(item)
    return (
       <div>
         <div className="flex space-x-4 mb-5">
            <img style={{borderRadius: '0 200px 200px 200px'}} className="w-[100px] " src={image} alt="" />
            <div>
                <h3 className="uppercase"> {name} ----------- </h3>
                <p> {recipe} </p>
            </div>
            <p className="text-yellow-500"> ${price} </p>
        </div>
        
    
       </div>
    )    
};

export default MenuItems;