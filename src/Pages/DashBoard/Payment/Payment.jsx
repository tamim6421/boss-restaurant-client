import { loadStripe } from "@stripe/stripe-js";
import SectionTitle from "../../../Component/SectionTitle/SectionTitle";
import { Elements } from "@stripe/react-stripe-js";
import PaymentForm from "./PaymentForm";





// todo: add pk-- publishable key 
const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_PK)

const Payment = () => {
    return (
        <div>
            <SectionTitle title={"Payment"} subTitle={"Please pay to eat"}></SectionTitle>
            <div>
                <Elements stripe={stripePromise}>

                <PaymentForm></PaymentForm>

                </Elements>
            </div>
        </div>
    );
};

export default Payment;