import React, { useState } from "react";
import styles from "../../styles/style";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";

const FAQPage = () => {
  return (
    <div>
      <Header />
      <div className={`mt-[50px] ${styles.custom_container}`}>
        <FAQ />
      </div>
      <Footer />
    </div>
  );
};

const FAQ = () => {
  const [activeTabe, setActiveTabe] = useState();

  const toggleTab = (tab) => {
    if (activeTabe === tab) {
      setActiveTabe(0);
    } else {
      setActiveTabe(tab);
    }
  };

  return (
    <div className="my-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">FAQ</h2>
      <div className="py-2 border-b border-gray-300 mb-4">
        <button
          className="flex items-center justify-between w-full"
          onClick={() => toggleTab(1)}
        >
          <span className="text-[18px]">What is your return policy?</span>

          {activeTabe === 1 ? (
            <svg
              className="h-6 w-6 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="h-6 w-6 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          )}
        </button>

        {activeTabe === 1 && (
          <div className="mt-4">
            <p className="text-base text-gray-500">
              If you're not satisfied with your purchase, we accept returns
              within 30 days of delivery. To initiate a return, please email us
              at support@myecommercestore.com with your order number and a brief
              explanation of why you're returning the item.
            </p>
          </div>
        )}
      </div>
      <div className="py-2 border-b border-gray-300 mb-4">
        <button
          className="flex items-center justify-between w-full"
          onClick={() => toggleTab(2)}
        >
          <span className="text-[18px]">How do I track my order?</span>

          {activeTabe === 2 ? (
            <svg
              className="h-6 w-6 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="h-6 w-6 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          )}
        </button>

        {activeTabe === 2 && (
          <div className="mt-4">
            <p className="text-base text-gray-500">
              You can track your order by clicking the tracking link in your
              shipping confirmation email, or by logging into your account on
              our website and viewing the order details.
            </p>
          </div>
        )}
      </div>
      <div className="py-2 border-b border-gray-300 mb-4">
        <button
          className="flex items-center justify-between w-full"
          onClick={() => toggleTab(3)}
        >
          <span className="text-[18px]">
            {" "}
            How do I contact customer support?
          </span>

          {activeTabe === 3 ? (
            <svg
              className="h-6 w-6 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="h-6 w-6 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          )}
        </button>

        {activeTabe === 3 && (
          <div className="mt-4">
            <p className="text-base text-gray-500">
              You can contact our customer support team by emailing us at
              support@myecommercestore.com, or by calling us at (555) 123-4567
              between the hours of 9am and 5pm EST, Monday through Friday.
            </p>
          </div>
        )}
      </div>
      <div className="py-2 border-b border-gray-300 mb-4">
        <button
          className="flex items-center justify-between w-full"
          onClick={() => toggleTab(4)}
        >
          <span className="text-[18px]"> Can I change or cancel my order?</span>

          {activeTabe === 4 ? (
            <svg
              className="h-6 w-6 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="h-6 w-6 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          )}
        </button>

        {activeTabe === 4 && (
          <div className="mt-4">
            <p className="text-base text-gray-500">
              Unfortunately, once an order has been placed, we are not able to
              make changes or cancellations. If you no longer want the items
              you've ordered, you can return them for a refund within 30 days of
              delivery.
            </p>
          </div>
        )}
      </div>
      <div className="py-2 border-b border-gray-300 mb-4">
        <button
          className="flex items-center justify-between w-full"
          onClick={() => toggleTab(5)}
        >
          <span className="text-[18px]">
            Do you offer international shipping?
          </span>

          {activeTabe === 5 ? (
            <svg
              className="h-6 w-6 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="h-6 w-6 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          )}
        </button>

        {activeTabe === 5 && (
          <div className="mt-4">
            <p className="text-base text-gray-500">
              Currently, we only offer shipping within the United States.
            </p>
          </div>
        )}
      </div>
      <div className="py-2 border-b border-gray-300 mb-4">
        <button
          className="flex items-center justify-between w-full"
          onClick={() => toggleTab(6)}
        >
          <span className="text-[18px]">
            What payment methods do you accept?
          </span>

          {activeTabe === 6 ? (
            <svg
              className="h-6 w-6 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="h-6 w-6 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          )}
        </button>

        {activeTabe === 6 && (
          <div className="mt-4">
            <p className="text-base text-gray-500">
              We accept visa,mastercard,paypal payment method also we have cash
              on delivery system.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FAQPage;
