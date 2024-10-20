  import React from "react";
  import { Dialog, Transition } from "@headlessui/react";
  import { Fragment } from "react";

  const PaymentModel = ({ setIsOpen, isOpen, price }) => {
    const closeModal = () => {
      setIsOpen(false);
    };

    const launchRazorPay = () => {
      let options = {
        key: process.env.REACT_APP_RAZORPAY_KEY,
        amount: (price + 99) * 100, // Added convenience fee to the total amount
        currency: "INR",
        name: "Book My Show Clone",
        description: "Buy or Rent Movies Online",
        image: "https://i.ibb.co/zPBYW3H/imgbin-bookmyshow-office-android-ticket-png.png",
        handler: () => {
          setIsOpen(false);
          alert("Payment Successful!");
        },
        theme: { color: "#c4242d" },
      };

      let razorPay = new window.Razorpay(options);
      razorPay.open();
    };

    return (
      <>
        <Transition appear show={isOpen} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={closeModal}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-800/50" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="w-full max-w-3xl transform overflow-hidden rounded-3xl bg-gradient-to-br from-blue-500 to-purple-600 p-12 text-left align-middle shadow-xl transition-all">
                    <Dialog.Title
                      as="h3"
                      className="text-3xl font-bold leading-6 text-white text-center mb-4" // Increased font size and centered title
                    >
                      Please Make a Payment
                    </Dialog.Title>
                    <div className="mt-4">
                      <p className="text-base text-white text-center">
                        Hello! Please click on the button below to proceed with the payment for your movie tickets.
                      </p>
                      <p className="mt-4 text-base text-white text-center">
                        <strong>Payment Amount:</strong> ₹{price} <br />
                        <strong>Convenience Fee:</strong> ₹99 <br />
                        <strong>Total Amount:</strong> ₹{price + 99} <br />
                        <strong>Payment Method:</strong> Razorpay <br />
                        <strong>Secure Payment:</strong> Your payment information is secure and encrypted.
                      </p>
                    </div>

                    <div className="mt-6 flex justify-center gap-6">
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-red-600 px-8 py-4 text-lg font-medium text-white hover:bg-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                        onClick={launchRazorPay}
                      >
                        Pay ₹{price + 99}
                      </button>
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-gray-700 px-8 py-4 text-lg font-medium text-white hover:bg-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2"
                        onClick={closeModal}
                      >
                        Cancel Payment
                      </button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </>
    );
  };

  export default PaymentModel;