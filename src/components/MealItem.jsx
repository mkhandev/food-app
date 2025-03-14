import { currencyFormatter } from "../utill/formatting";
import Button from "./UI/Button";

import CartContext from "../store/CartContext.jsx";

import { useContext } from "react";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export default function MealItem({ meal }) {
  const cartCtx = useContext(CartContext);

  function handelAddToCartMeal() {
    
    cartCtx.addItem(meal);
  }
  return (
    <li className="meal-item">
      <article>
        <img src={`${apiBaseUrl}/${meal.image}`} alt="meal.name" />
        <div>
          <h3>{meal.name}</h3>
          <p className="meal-item-price">
            {currencyFormatter.format(meal.price)}
          </p>
          <p className="meal-item-description">{meal.description}</p>
        </div>
        <p className="meal-item-actions">
          <Button onClick={handelAddToCartMeal}>Add to cart</Button>
        </p>
      </article>
    </li>
  );
}
