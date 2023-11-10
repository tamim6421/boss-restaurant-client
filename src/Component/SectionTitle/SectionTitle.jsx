

const SectionTitle = ({title, subTitle}) => {
    return (
        <div className=" md:w-3/12 text-center mx-auto my-10">
            <p className="text-yellow-500 mb-3">---{subTitle}---</p>
            <h3 className="text-3xl uppercase border-y-4 py-4 ">{title}</h3>
        </div>
    );
};

export default SectionTitle;