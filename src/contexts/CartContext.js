import React, {createContext, useState, useEffect} from 'react';

export const CartContext = createContext()

const CartProvider = ({children}) => {
  // cart state
  const [cart, setCart] = useState([]);

  // item amount state (total qty)
  const [itemAmount, setItemAmount] = useState(0);

  //total price state 
  const [total, setTotal] = useState(0);

  // update total price
  useEffect(() => {
    const total = cart.reduce((accumulator, currentItem) => {
      return accumulator + (currentItem.price * currentItem.amount)
    }, 0);
    setTotal(total);
  })

  // update item amount in shopping bag
  useEffect(() => {
    if(cart) {
      const amount = cart.reduce((accumulator, currentItem) => {
        return accumulator + currentItem.amount;
      }, 0)
      setItemAmount(amount);
    }
  },[cart])

  //add to cart
  const addToCart = (product, id) => {
    const newItem = {...product, amount: 1};
    
    // check if item is already in the cart
    const cartItem = cart.find(item => {
      return item.id === id;
    });
    //console.log(cartItem);

    // if cart item is already in the cart
    if(cartItem) {
      const newCart =  [...cart].map((item) => {
        if(item.id === id) {
          return {...item, amount: cartItem.amount + 1};
        } else {
          return item;
        }
      });
      setCart(newCart);
    } else {
      setCart([...cart, newItem]);
    }
   
  }

  // remove from cart 
  const removeFromCart = (id) => {
    const newCart = cart.filter(item => {
      return item.id !== id;
    })
    setCart(newCart);
  }

  // clear cart
  const clearCart = () => {
    setCart([]);
  }

  // increase amount
  const increaseAmount = (product, id) => {
    addToCart(product, id);
  }

  // decrease amount
  const decreaseAmount = (id) => {
    const cartItem = cart.find(item => {
      return item.id === id;
    });

    if(cartItem) {

      if (cartItem.amount <= 1) {
        removeFromCart(id);
        return;
      }

      const newCart = cart.map(item => {
        if(item.id === id) {
          return ({...item, amount:cartItem.amount - 1 })
        } else {
          return item;
        }
      });
      setCart(newCart);
    } 
  }

  return <CartContext.Provider value={{cart, addToCart, removeFromCart, clearCart, increaseAmount, decreaseAmount, itemAmount,total,}}>{children}</CartContext.Provider>;
};

export default CartProvider;
