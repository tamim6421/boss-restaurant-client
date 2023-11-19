import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../../Component/SectionTitle/SectionTitle";
import useAuth from "../../../Hooks/useAuth";
import useAxios from "../../../Hooks/useAxios";


const PaymentHistory = () => {
    const {user} = useAuth()
    const axiosSecure = useAxios()


    const {data: payments=[]} = useQuery({
        queryKey: ['payments', user?.email],
        queryFn: async () =>{
            const res = await axiosSecure.get(`/payments/${user?.email}`)
            return res.data
        }
    })
    // console.log(payments)
    

    return (
        <div>
            <SectionTitle subTitle={'See Your Payment'} title={"payment history"}></SectionTitle>
            <div>
                <h1>Total Payments: {payments.length} </h1>

                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                        <tr>
                            <th>Num</th>
                            <th>Price</th>
                            <th>Transaction Id </th>
                            <th>Status </th>
                        </tr>
                        </thead>
                        <tbody>
                       
                       {
                        payments?.map( (item, idx) =>  <tr key={item._id}>
                            <th>{idx + 1}</th>
                            <td> $ {item.price}</td>
                            <td>{item.transactionId}</td>
                            <td>{item.status}</td>
                        </tr>
                     )
                       }
                        </tbody>
                    </table>
                    </div>
            </div>
        </div>
    );
};

export default PaymentHistory;