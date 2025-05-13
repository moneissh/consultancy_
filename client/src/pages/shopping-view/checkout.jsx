import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import Address from "@/components/shopping-view/address";
import UserCartItemsContent from "@/components/shopping-view/cart-items-content";
import img from "../../assets/account.jpg";
import { useNavigate } from "react-router-dom";

function ShoppingCheckout() {
  const { cartItems } = useSelector((state) => state.shopCart);
  const { user } = useSelector((state) => state.auth);
  const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null);
  const [isPaymentStart, setIsPaymentStart] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const totalCartAmount =
    cartItems?.items?.length > 0
      ? cartItems.items.reduce(
          (sum, item) =>
            sum +
            (item?.salePrice > 0 ? item?.salePrice : item?.price) *
              item?.quantity,
          0
        )
      : 0;

  const loadRazorpayScript = () =>
    new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });

  const handleRazorpayPayment = async () => {
    if (!cartItems?.items?.length) {
      toast({
        title: "Your cart is empty. Please add items to proceed",
        variant: "destructive",
      });
      return;
    }

    if (!currentSelectedAddress) {
      toast({
        title: "Please select an address to proceed.",
        variant: "destructive",
      });
      return;
    }

    setIsPaymentStart(true);
    const res = await loadRazorpayScript();

    if (!res) {
      toast({
        title: "Razorpay SDK failed to load.",
        variant: "destructive",
      });
      setIsPaymentStart(false);
      return;
    }

    const customerDetails = {
      name: user?.name, // Ensure user name is passed here
      email: user?.email,
      phone: currentSelectedAddress?.phone,
      address: currentSelectedAddress?.address,
    };

    const options = {
      key: "rzp_test_xJn1KfhqB0jUwu", // Replace with your actual Razorpay Key
      amount: totalCartAmount * 100,
      currency: "INR",
      name: "SUNTEXTILES",
      description: "Order Payment",
      handler: function (response) {
        toast({ title: "Payment Successful!", variant: "success" });

        navigate("/shop/thankyou", {
          state: {
            customerDetails,  // Send customerDetails with name, email, etc.
            total: totalCartAmount,
            items: cartItems.items,
            paymentId: response.razorpay_payment_id,
          },
        });
      },
      prefill: {
        name: customerDetails.name,
        email: customerDetails.email,
        contact: customerDetails.phone,
      },
      notes: {
        address: customerDetails.address,
      },
      theme: {
        color: "#1A202C",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
    setIsPaymentStart(false);
  };

  return (
    <div className="flex flex-col">
      <div className="relative h-[300px] w-full overflow-hidden">
        <img src={img} className="h-full w-full object-cover object-center" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5 p-5">
        <Address
          selectedId={currentSelectedAddress}
          setCurrentSelectedAddress={setCurrentSelectedAddress}
        />
        <div className="flex flex-col gap-4">
          {cartItems?.items?.length > 0 &&
            cartItems.items.map((item, index) => (
              <UserCartItemsContent key={index} cartItem={item} />
            ))}
          <div className="mt-8 space-y-4">
            <div className="flex justify-between">
              <span className="font-bold">Total</span>
              <span className="font-bold">₹{totalCartAmount}</span>
            </div>
          </div>
          <div className="mt-4 w-full">
            <Button
              onClick={handleRazorpayPayment}
              disabled={isPaymentStart}
              className="w-full"
            >
              {isPaymentStart
                ? "Processing Razorpay Payment..."
                : "Checkout with Razorpay"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCheckout;
