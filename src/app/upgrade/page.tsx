"use client";
import { useEffect } from "react";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'stripe-pricing-table': any;
    }
  }
}


export default function UpgradePage() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://js.stripe.com/v3/pricing-table.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <main >
      <stripe-pricing-table pricing-table-id="prctbl_1RNeT6RxW5ti86OX1NMJ5oP6"
        publishable-key="pk_test_51RGPqcRxW5ti86OXPkiT1zYgk3gD2ARkBc9HBEYQtFx6j9GLe0j1wQWKNMjOkKZSPP2DbxFjtC1qhtaYkDfsVKhj00cjL4n0sA">
    </stripe-pricing-table>
    </main>
  );
}
