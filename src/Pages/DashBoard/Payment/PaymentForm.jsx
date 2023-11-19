import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxios from "../../../Hooks/useAxios";
import useCart from "../../../Hooks/useCart";
import useAuth from "../../../Hooks/useAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";





const PaymentForm = () => {
    const [error, setError] = useState('')
    const [clientSecret, setClientSecret] = useState('')
    const [transactionId, setTransactionId] = useState('')
    const stripe = useStripe()
    const elements = useElements()
    const axiosSecure = useAxios()
    const {user} = useAuth()
    const [cart, refetch] = useCart()
    const navigate = useNavigate()


    const totalPrice = cart.reduce( (total, item) => total + item.price ,0)
    // console.log(totalPrice)



    useEffect( () =>{
      if(totalPrice > 0){
        axiosSecure.post('/create-payment-intent', {price: totalPrice})
        .then(res =>{
        //  console.log(res.data.clientSecret)
         setClientSecret(res.data.clientSecret)
        })
      }
    } ,[ axiosSecure, totalPrice])



  const handelPayment = async (event) => {
    event.preventDefault();

    if(!stripe || !elements){
        return 
    }
    const card = elements.getElement(CardElement);
    if (card == null) {
        return;
      }

      const {error, paymentMethod} = await stripe.createPaymentMethod({
        type: 'card',
        card
      })

      if(error){
        console.log('payment error', error)
        setError(error.message)
      }else{
        console.log('paymentMethod', paymentMethod)
        setError('')
      }

    //   confirm payment 
    const {paymentIntent, error: confirmError} = await stripe.confirmCardPayment(clientSecret, {
        payment_method:{
            card : card,
            billing_details:{
                email: user?.email || 'anonymous',
                name: user?.displayName || 'anonymous'
            }
        }
    })
    if(confirmError){
        console.log("confirm Error", confirmError)
    }
    else{
        console.log('payment Intent', paymentIntent)
        if(paymentIntent.status === "succeeded"){
            console.log('transaction id', paymentIntent.id)
            setTransactionId(paymentIntent.id)

            // now save the payment in the database 
            const payment = {
                email : user.email,
                price : totalPrice,
                transactionId: paymentIntent.id,
                date : new Date(),  //convert utc date 
                cartIds: cart.map( item => item._id),
                menuItemIds : cart.map(item => item.cartId),
                status: 'pending',
            }

            // send data to the db 
          const res = await  axiosSecure.post('/payments', payment)
          console.log('payment save to db',res.data)
          refetch()
          if(res?.data?.paymentResult?.insertedId){
            Swal.fire({
                position: "top-center",
                icon: "success",
                title: "Payment Successful",
                showConfirmButton: false,
                timer: 1500
              });

            //   redirect to payment history page 
            navigate('/dashboard/paymentHistory')
          }
        }
    }
  };




  return (
    <div className="w-3/6 p-5 mx-auto py-10 rounded-lg shadow-md bg-slate-100">
      <form onSubmit={handelPayment}>

        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        ></CardElement>

        <button className="btn btn-warning btn-sm px-4 mt-3" type="submit" disabled={!stripe || !clientSecret}>
          Pay
        </button>

          <p className="text-red-500">{error}</p>
          {transactionId && <p className="text-green-500"> Your Transaction Id :  {transactionId} </p> }

      </form>
    </div>
  );
};

export default PaymentForm;
