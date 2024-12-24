import { useContext, useEffect, useState } from "react";
import logoImg from "../assets/logo.png";
import CartContext from "../store/CartContext";
import Button from "./UI/Button";
import UserProgressContext from "../store/UserProgressContext";

export default function Header() {
  const [isAnimating, setIsAnimating] = useState(false);

  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const totalCartItems = cartCtx.items.reduce((totalItem, item) => {
    return totalItem + item.quantity;
  }, 0);

  function handelShowCart() {
    userProgressCtx.showCart();
  }

  useEffect(() => {
    if (totalCartItems > 0) {
      setIsAnimating(true);
      const timeout = setTimeout(() => setIsAnimating(false), 300);
      return () => clearTimeout(timeout);
    }
  }, [totalCartItems]);

  return (
    <header id="main-header">
      <div id="title">
        <img src={logoImg} alt="A restaurant" />
        <h1>Food App</h1>
      </div>
      <nav>
        <Button textOnly onClick={handelShowCart}>
          <div className={`cartTotalItems ${isAnimating ? "cart_bounce" : ""}`}>
            Cart ({totalCartItems})
          </div>
        </Button>
      </nav>
    </header>
  );
}
