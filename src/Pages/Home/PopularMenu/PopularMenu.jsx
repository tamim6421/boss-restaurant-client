
import SectionTitle from "../../../Component/SectionTitle/SectionTitle";
import MenuItems from "../../Shared/MenuItem/MenuItems";
import useMenu from "../../../Hooks/useMenu";


const PopularMenu = () => {
    const [menu] = useMenu()
    const popular = menu.filter( item => item.category === 'popular' )
    // console.log(popular)

    // const [menu, setMenu] = useState([])
    // useEffect( () =>{
    //     fetch('menu.json')
    //     .then(res => res.json())
    //     .then( data =>{
    //         const popularItem = data.filter(item => item.category === 'popular')
    //         setMenu(popularItem)
    //     })
    // } ,[] )

    // console.log(menu)


    return (
        <section>
            <SectionTitle
            subTitle={'From Our Menu'}
            title={'Popular Items'}
            ></SectionTitle>

            <div className="grid md:grid-cols-2 gap-8 mb-7">
                {
                    popular.map( item => <MenuItems key={item._id} item = {item}> </MenuItems>)
                }
            </div>
            <button className="btn btn-outline block mx-auto border-0 border-b-4 mb-10 mt-2">View full menu</button>
        </section>
    );
};

export default PopularMenu;