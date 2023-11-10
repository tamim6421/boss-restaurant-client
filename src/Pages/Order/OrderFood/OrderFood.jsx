import { useState } from "react";
import orderCover from "../../../assets/shop/order.jpg";
import Cover from "../../Shared/Cover/Cover";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import useMenu from "../../../Hooks/useMenu";
import OrderTabs from "../OrderTabs/OrderTabs";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const OrderFood = () => {
    const categories = ['salad', 'pizza', 'soup', 'dessert', 'drinks']
    const {category} = useParams()
    const initialIndex = categories.indexOf(category)
    const [tabIndex, setTabIndex] = useState(initialIndex)
    const [menu] = useMenu()
   
    console.log(category)

    const dessert = menu.filter( item => item.category === 'dessert')
    const pizza = menu.filter( item => item.category === 'pizza')
    const salad = menu.filter( item => item.category === 'salad')
    const soup = menu.filter( item => item.category === 'soup')
    const drinks = menu.filter( item => item.category === 'drinks')


  return (
    <div>
           <Helmet>
                <title>
                BOSS RESTAURANT | Order
                </title>
            </Helmet>

      <Cover img={orderCover} title={"Order Foods"}></Cover>

      <Tabs defaultIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
        <TabList>
          <Tab>Salad</Tab>
          <Tab>Pizza</Tab>
          <Tab>Soup</Tab>
          <Tab>Dessert</Tab>
          <Tab>Soup</Tab>
          
        </TabList>
        <TabPanel>
           <OrderTabs items={salad}></OrderTabs>
        </TabPanel>
        <TabPanel>
        <OrderTabs items={pizza}></OrderTabs>
        </TabPanel>
        <TabPanel>
        <OrderTabs items={soup}></OrderTabs>
        </TabPanel>
        <TabPanel>
        <OrderTabs items={dessert}></OrderTabs>
        </TabPanel>
        <TabPanel>
        <OrderTabs items={drinks}></OrderTabs>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default OrderFood;
