import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  CardElement,
  useStripe,
  useElements,
  Elements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import CheckOutForm from "./CheckOutForm";

const PaymentForm = () => {
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements || !clientSecret) {
      return;
    }

    // Utilizza il clientSecret ottenuto dal server
    const { error, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: elements.getElement(PaymentElement),
        },
      }
    );

    if (error) {
      // Gestisci l'errore di pagamento
    } else {
      // Pagamento confermato con successo
    }
  };

  // Resto del codice...

  // const stripe = useStripe();
  // const elements = useElements();
  // const [paymentError, setPaymentError] = useState(null);
  // const [paymentSuccess, setPaymentSuccess] = useState(null);

  // useEffect(() => {
  //   fetch("/config").then(async (r) => {
  //     const { publishKey } = await r.json();

  //     setStripePromise(loadStripe(publishKey));
  //   });
  // }, []);

  useEffect(() => {
    fetch("/config")
      .then((response) => response.json())
      .then((data) => {
        setStripePromise(loadStripe(data.publishableKey));
      });
  }, []);

  // useEffect(() => {
  //   fetch("/crea-pagamento", {
  //     method: "POST",
  //     body: JSON.stringify({}),
  //   }).then(async (result) => {
  //     var { clientSecret } = await result.json();
  //     setClientSecret(clientSecret);
  //   });
  // }, []);

  useEffect(() => {
    fetch("/crea-pagamento", {
      method: "POST",
      body: JSON.stringify({}),
    })
      .then((response) => response.json())
      .then((data) => {
        setClientSecret(data.clientSecret);
      });
  }, []);

  // const handleSubmit = async (event) => {
  //   event.preventDefault();

  //   if (!stripe || !elements) {
  //     // Stripe non è pronto ancora
  //     return;
  //   }

  //   const { error, paymentMethod } = await stripe.createPaymentMethod({
  //     type: "card",
  //     card: elements.getElement(CardElement),
  //   });

  //   if (error) {
  //     setPaymentError(error.message);
  //     setPaymentSuccess(null);
  //   } else {
  //     // Esegui richiesta al backend per confermare il pagamento utilizzando il paymentMethod.id
  //     const response = await fetch("/conferma-pagamento", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ paymentMethodId: paymentMethod.id }),
  //     });

  //     if (response.ok) {
  //       setPaymentError(null);
  //       setPaymentSuccess("Pagamento confermato con successo!");
  //     } else {
  //       const errorData = await response.json();
  //       setPaymentError(errorData.message);
  //       setPaymentSuccess(null);
  //     }
  //   }
  // };

  return (
    // <form onSubmit={handleSubmit}>
    <>
      <h4>Inserisci i dati per il pagamento</h4>
      {clientSecret && stripePromise && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CardElement />
          <CheckOutForm clientSecret={clientSecret} />
          {/* {paymentError && <div>{paymentError}</div>}
          {paymentSuccess && <div>{paymentSuccess}</div>} */}
          <button type="submit" disabled={!stripe}>
            Paga
          </button>
        </Elements>
      )}
    </>
  );
};

export default PaymentForm;
