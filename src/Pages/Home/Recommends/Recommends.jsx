import SectionTitle from "../../../Component/SectionTitle/SectionTitle";
import img1 from '../../../assets/home/slide1.jpg'
import img2 from '../../../assets/home/slide2.jpg'
import img3 from '../../../assets/home/slide3.jpg'


const Recommends = () => {
    return (
        <div className="my-20">
            <SectionTitle
            subTitle={'Should Try'}
            title={'Chef recommended'}
            ></SectionTitle>
            <div className="grid gap-5 grid-cols-1 md:grid-cols-3">
            <div className="card  bg-base-100 shadow-xl">
                <figure className="px-5 pt-5">
                    <img src={img1} alt="Shoes" className="rounded-xl" />
                </figure>
                <div className="card-body items-center text-center">
                    <h2 className="card-title">Caeser Salad</h2>
                    <p> Lorem ipsum dolor sit amet consectetur adipisicing.</p>
                    <div className="card-actions">
                    <button className="btn btn-outline border-0 border-b-4 border-orange-400">add to cart</button>
                    </div>
                </div>
                </div>
            <div className="card  bg-base-100 shadow-xl">
                <figure className="px-5 pt-5">
                    <img src={img2} alt="Shoes" className="rounded-xl" />
                </figure>
                <div className="card-body items-center text-center">
                    <h2 className="card-title">Caeser Salad</h2>
                    <p> Lorem ipsum dolor sit amet consectetur adipisicing.</p>
                    <div className="card-actions">
                    <button className="btn btn-outline border-0 border-b-4 border-orange-400">add to cart</button>
                    </div>
                </div>
                </div>
            <div className="card  bg-base-100 shadow-xl">
                <figure className="px-5 pt-5">
                    <img src={img3} alt="Shoes" className="rounded-xl" />
                </figure>
                <div className="card-body items-center text-center">
                    <h2 className="card-title">Caeser Salad</h2>
                    <p> Lorem ipsum dolor sit amet consectetur adipisicing.</p>
                    <div className="card-actions">
                    <button className="btn btn-outline border-0 border-b-4 border-orange-400">add to cart</button>
                    </div>
                </div>
                </div>
            </div>
        </div>
    );
};

export default Recommends;