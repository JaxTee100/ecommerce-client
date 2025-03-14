"use client";

import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import CheckoutSuspense from "./checkoutSkeleton";

function CheckoutPage() {
  const options = {
    clientId:
      "ATOfEaxLU_dvNtwXiOaez1qwRqtqeJl4XCAdGwe_IrdoRzm6y23yBRqkrBjg7PpkGZM4uBm4DthZl2sJ",
  };

  return (
    <PayPalScriptProvider options={options}>
      <CheckoutSuspense />
    </PayPalScriptProvider>
  );
}

export default CheckoutPage;