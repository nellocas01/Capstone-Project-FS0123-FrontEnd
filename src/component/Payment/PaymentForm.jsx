import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [paymentError, setPaymentError] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe non è pronto ancora
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (error) {
      setPaymentError(error.message);
      setPaymentSuccess(null);
    } else {
      // Esegui richiesta al backend per confermare il pagamento utilizzando il paymentMethod.id
      const response = await fetch("/conferma-pagamento", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ paymentMethodId: paymentMethod.id }),
      });

      if (response.ok) {
        setPaymentError(null);
        setPaymentSuccess("Pagamento confermato con successo!");
      } else {
        const errorData = await response.json();
        setPaymentError(errorData.message);
        setPaymentSuccess(null);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      {paymentError && <div>{paymentError}</div>}
      {paymentSuccess && <div>{paymentSuccess}</div>}
      <button type="submit" disabled={!stripe}>
        Paga
      </button>
    </form>
  );
};

export default PaymentForm;
