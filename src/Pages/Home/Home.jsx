import { Helmet } from "react-helmet-async";
import Banner from "./Banner/Banner";
import Category from "./Category/Category";
import Featured from "./Featured/Featured";
import PopularMenu from "./PopularMenu/PopularMenu";
import Recommends from "./Recommends/Recommends";
import Testimonials from "./Testimonials/Testimonials";


const Home = () => {
    return (
        <div>
                <Helmet>
                <title>
                BOSS RESTAURANT | Home
                </title>
            </Helmet>
            <Banner></Banner>
            <Category></Category>
            <PopularMenu></PopularMenu>
            <Recommends></Recommends>
            <Featured></Featured>
            <Testimonials></Testimonials>
        </div>
    );
};

export default Home;