import { createContext } from "react";

const CartContext = createContext({
    items: [],
    addItem: (item) =>{},
    removeItem: (id) =>{},
    clearCart: () =>{},
});

export function CartContextProvider({children}){

    return <CartContext.Provider>{children}</CartContext.Provider>
}

export default CartContext;