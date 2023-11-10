import { Link } from "react-router-dom";
import Cover from "../../../Shared/Cover/Cover";
import MenuItems from "../../../Shared/MenuItem/MenuItems";


const MenuCategory = ({items, title ,coverImg}) => {
    return (
        <div className="pt-8">
            {
                 title && <Cover
                  img={coverImg}
                  title={title}
                   ></Cover>
            }
              <div className="grid md:grid-cols-2 gap-8 my-5 mb-7">
                {
                    items.map( item => <MenuItems key={item._id} item = {item}> </MenuItems>)
                }
            </div>
           <Link to={`/orderFood/${title}`}> <button className="btn btn-outline border-0 block mx-auto mb-20 drop-shadow-lg font-bold border-b-4 border-orange-500 text-orange-500 hover:bg-orange-500">Order now</button></Link>
        </div>
    );
};

export default MenuCategory;