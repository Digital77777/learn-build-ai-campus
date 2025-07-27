import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "@/components/marketplace/CheckoutForm";
import Navigation from "@/components/Navigation";
import { useLocation } from "react-router-dom";

const stripePromise = loadStripe("your_publishable_key");

const CheckoutPage = () => {
  const location = useLocation();
  const { listing } = location.state || {};

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>
        {listing && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold">{listing.title}</h2>
            <p className="text-lg font-semibold">{listing.price}</p>
          </div>
        )}
        <Elements stripe={stripePromise}>
          <CheckoutForm listing={listing} />
        </Elements>
      </div>
    </div>
  );
};

export default CheckoutPage;
