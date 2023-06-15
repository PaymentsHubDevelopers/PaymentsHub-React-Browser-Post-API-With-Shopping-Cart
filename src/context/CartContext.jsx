import { createContext, useState, useEffect } from 'react'

export const CartContext = createContext({
    items: [],
    getCartItemQuantity: () => {},
    addOneItemToCart: () => {},
    removeOneItemFromCart: () => {},
    deleteItemFromCart: () => {},
    getTotalCost: () => {},
    getNumberOfCartItems: () => {}
})

export function CartProvider({children}){
    const [cartItems, setCartItems] = useState(JSON.parse(localStorage.getItem('myCart')) || [])
    const [loading, setLoading] = useState(false)

    // persist the cart to local storage whenever the cartItems array changes
    useEffect(() => {
   	 const saveCartToLocalStorage = () => localStorage.setItem('myCart', JSON.stringify(cartItems))

   	 saveCartToLocalStorage()

    },[cartItems])

    // check the number of items of the specified id in the cart
    // if the item does not exist in the cart, return 0 as the number of items of the specified id in the cart
    // if the item exists in the cart, return the number of items of specified id in the cart
    // this function acts as a helper function to decide on the action to take when adding and removing items to the cart
    const getCartItemQuantity = (id) => {
   	 const itemQuantity = cartItems.find(item => item.id === id)?.quantity

   	 if(itemQuantity === undefined){
   		 return 0;
   	 }

   	 return itemQuantity;
    }

    const addOneItemToCart = (id, unitPrice, title, imageUrl) => {
   	 // check if the item already exists in the cart
   	 const itemQuantity = getCartItemQuantity(id)

   	 // if the item does not exist in the cart, add the item to the cart
   	 if(itemQuantity === 0){
   		 setCartItems([
       		 ...cartItems,
       		 {
           		 id,
           		 quantity: 1,
           		 unitPrice,
           		 title,
           		 imageUrl
       		 }
   		 ]) 	 
   	 } else{ // if the item exists in the cart, add one to the existing quantity
   		 // loop through the items. if an item's id is equal to the provided id, add one to the quantity, else, return the item
   		 setCartItems(
       		 cartItems.map((item) => (
           		 item.id === id ?
           		 { ...item, quantity: item.quantity + 1 } :
           		 item
       		 ))
   		 )
   	 }
    }

    const deleteItemFromCart = (id) => {
   	 setCartItems(
   		 cartItems => cartItems.filter(item => (
       		 item.id !== id
   		 ))
   	 )
    }

    const removeOneItemFromCart = (id) => {
   	 const itemQuantity = getCartItemQuantity(id)

   	 if(itemQuantity === 1){
   		 deleteItemFromCart(id)
   	 } else {
   		 setCartItems(
       		 cartItems.map((item) => (
           		 item.id === id ?
           		 { ...item, quantity: item.quantity - 1 } :
           		 item
       		 ))
   		 )
   	 }
    }

    const getTotalCost = () => {
   	 let totalCost = 0

   	 cartItems.map(item => totalCost += (item.quantity * item.unitPrice))

   	 return totalCost
    }

    const getNumberOfCartItems = () => {
   	 let numberOfCartItems = 0

   	 cartItems.map(item => numberOfCartItems+= item.quantity)

   	 return numberOfCartItems
    }

    const contextValue = {
   	 items: cartItems,
   	 setCartItems,
   	 loading,
   	 setLoading,
   	 getCartItemQuantity,
   	 addOneItemToCart,
   	 removeOneItemFromCart,
   	 deleteItemFromCart,
   	 getTotalCost,
   	 getNumberOfCartItems
    }
    return (
   	 <CartContext.Provider value={contextValue}>
   		 {children}
   	 </CartContext.Provider>
    )
}

export default CartProvider;