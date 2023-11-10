import SectionTitle from "../../../Component/SectionTitle/SectionTitle";
import featured from "../../../assets/home/featured.jpg"
import './Featured.css'


const Featured = () => {
    return (
        <div className="featured bg-fixed text-white pt-5 my-20">
            <SectionTitle
            subTitle={'Check it Out'}
            title = {"Featured Items"}
            ></SectionTitle>
            <section className="md:flex justify-center bg-slate-700 bg-opacity-50 items-center px-36  pb-20 pt-12 text-white">
               <div>
               <img className="rounded-lg" src={featured} alt="" />
               </div>
               <div className="ml-10">
                <p>Aug 20, 2019</p>
                <p className="uppercase text-2xl">where can i get some ?</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi deserunt debitis sapiente mollitia iure distinctio hic iste magni at nostrum amet consectetur adipisicing elit. Excepturi deserunt debitis sapiente mollitia iure distinctio hic iste magni at nostrum.</p>
                <button className="btn btn-outline border-0 border-b-4 mt-4 text-white"> Order now</button>
               </div>
            </section>
        </div>
    );
};

export default Featured;