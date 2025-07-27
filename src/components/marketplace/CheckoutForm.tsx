import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const CheckoutForm = ({ listing }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      // Here you would typically send the paymentMethod.id to your server
      // to create a charge or subscription.
      console.log("PaymentMethod:", paymentMethod);
      setError(null);
      setLoading(false);
      // Handle successful payment here
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <Button type="submit" disabled={!stripe || loading} className="mt-4">
        {loading ? "Processing..." : `Pay ${listing?.price || ""}`}
      </Button>
      {error && <div className="text-red-500 mt-4">{error}</div>}
    </form>
  );
};

export default CheckoutForm;
