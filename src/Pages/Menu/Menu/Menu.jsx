import { Helmet } from "react-helmet-async";
import Cover from "../../Shared/Cover/Cover";

import menuImg from '../../../assets/menu/banner3.jpg'
import desertImg from '../../../assets/menu/dessert-bg.jpeg'
import pizzaImg from '../../../assets/menu/pizza-bg.jpg'
import saladImg from '../../../assets/menu/salad-bg.jpg'
import soupImg from '../../../assets/menu/soup-bg.jpg'


import useMenu from "../../../Hooks/useMenu";
import SectionTitle from "../../../Component/SectionTitle/SectionTitle";
import MenuCategory from "./MenuCategory/MenuCategory";


const Menu = () => {
    const [menu] = useMenu()
    const dessert = menu.filter( item => item.category === 'dessert')
    const pizza = menu.filter( item => item.category === 'pizza')
    const salad = menu.filter( item => item.category === 'salad')
    const soup = menu.filter( item => item.category === 'soup')
    const offered = menu.filter( item => item.category === 'offered')
    // console.log(dessert)
    return (
        <div>
            <Helmet>
                <title>
                BOSS RESTAURANT | Menu
                </title>
            </Helmet>

            <Cover
             img={menuImg}
             title={"our menu"}
              ></Cover>

            <SectionTitle
            subTitle={"Don't miss"}
            title={"Today's Offer"}
            ></SectionTitle>


            {/* offered menu items  */}
            <MenuCategory items={offered}></MenuCategory>

            {/* desert menu items  */}
            <MenuCategory 
            items={dessert}
            title={"dessert"}
            coverImg = {desertImg}
            ></MenuCategory>


            {/* pizza menu items  */}
            <MenuCategory 
            items={pizza}
            title={"pizza"}
            coverImg = {pizzaImg}
            ></MenuCategory>


            {/* salad menu items  */}
            <MenuCategory 
            items={salad}
            title={"salad"}
            coverImg = {saladImg}
            ></MenuCategory>


            {/* salad menu items  */}
            <MenuCategory 
            items={soup}
            title={"soup"}
            coverImg = {soupImg}
            ></MenuCategory>

            
           

        
        </div>
    );
};

export default Menu;