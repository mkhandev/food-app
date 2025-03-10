import React, { useContext } from "react";
import Modal from "./UI/Modal";
import UserProgressContext from "../store/UserProgressContext";
import CartContext from "../store/CartContext";
import { currencyFormatter } from "../utill/formatting";
import Input from "./UI/Input";
import Button from "./UI/Button";
import useHttp from "../hooks/useHttp";
import Error from "./Error.jsx";

const requestConfig = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export default function Checkout() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const {
    data,
    isLoading: isSending,
    error,
    sendRequest,
    clearData,
  } = useHttp(`${apiBaseUrl}/orders`, requestConfig);

  const totalAmount = cartCtx.items.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  );

  console.log("====================");
  console.log(error);
  console.log("====================");

  const handelClose = () => {
    userProgressCtx.hideCheckout();
  };

  function handelFinish() {
    userProgressCtx.hideCheckout();
    cartCtx.clearCart();
    clearData();
  }

  const checkoutAction = async (event) => {
    event.preventDefault();

    const fd = new FormData(event.target);
    const customerData = Object.fromEntries(fd.entries());

    await sendRequest(
      JSON.stringify({
        order: {
          items: cartCtx.items,
          customer: customerData,
        },
      })
    );
  };

  let actions = (
    <>
      <Button type="button" textOnly onClick={handelClose}>
        Close
      </Button>
      <Button>Submit Order</Button>
    </>
  );

  if (isSending) {
    actions = <span>Sending order data...</span>;
  }

  if (data && !error) {
    return (
      <Modal
        open={userProgressCtx.progress === "checkout"}
        onClose={handelFinish}
      >
        <h2>Success!</h2>
        <p>Your order was submitted successfully.</p>
        <p>
          We will get back to you with more details via email within the next
          few minutes.
        </p>
        <p className="modal-actions">
          <Button onClick={handelFinish}>Okay</Button>
        </p>
      </Modal>
    );
  }

  return (
    <Modal open={userProgressCtx.progress === "checkout"} onClose={handelClose}>
      <form onSubmit={checkoutAction}>
        <h2>Checkout</h2>
        <p>Total Amount: {currencyFormatter.format(totalAmount)}</p>

        <Input label="Full Name" type="text" id="name" />
        <Input label="E-Mail Address" type="email" id="email" />
        <Input label="Street" type="text" id="street" />
        <div className="control-row">
          <Input label="Postal Code" type="text" id="postal-code" />
          <Input label="City" type="text" id="city" />
        </div>

        {error && <Error title="Failed to submit order" message={error} />}

        <p className="modal-actions">{actions}</p>
      </form>
    </Modal>
  );
}
