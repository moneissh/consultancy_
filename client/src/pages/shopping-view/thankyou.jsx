import React from "react";
import { useLocation } from "react-router-dom";

function ThankYouPage() {
  const location = useLocation();
  const { customerDetails, total, items, paymentId } = location.state || {};

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 sm:px-10">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-green-600 mb-4 text-center">
          🎉 Thank You for Your Purchase!
        </h1>
        <p className="text-lg text-center text-gray-700 mb-6">
          Your order has been successfully placed.
        </p>

        <div className="border-t border-gray-300 pt-6">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

          <div className="space-y-2 text-gray-800">
            <p><span className="font-medium">Email:</span> {customerDetails?.email}</p>
            <p><span className="font-medium">Phone:</span> {customerDetails?.phone}</p>
            <p><span className="font-medium">Address:</span> {customerDetails?.address}</p>
          </div>

          <div className="mt-6">
            <h3 className="font-semibold mb-2">Items Ordered:</h3>
            <ul className="divide-y divide-gray-200">
              {items?.map((item, index) => (
                <li key={index} className="flex justify-between py-2">
                  <span>{item?.name}</span>
                  <span>₹{(item?.salePrice > 0 ? item?.salePrice : item?.price) * item?.quantity}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6 flex justify-between font-semibold text-lg">
            <span>Total:</span>
            <span>₹{total}</span>
          </div>

          <div className="mt-4 text-sm text-gray-600">
            <span className="font-medium">Payment ID:</span> {paymentId}
          </div>
        </div>

        <div className="mt-8 text-center">
          <a
            href="/"
            className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-xl transition duration-300"
          >
            Continue Shopping
          </a>
        </div>
      </div>
    </div>
  );
}

export default ThankYouPage;
