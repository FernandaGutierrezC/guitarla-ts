import { useState, useEffect, useMemo } from "react"
import { db } from "../data/db"
import type { Guitar, cartItem } from "../type"

export const useCart = () => {
    
    const initialCart = () : cartItem [] => {
        const localStorageCart = localStorage.getItem('cart')
        return localStorageCart ? JSON.parse(localStorageCart) : []
    }

        //const [auth, setAuth] = useState(false) //hook
        const [data] = useState(db)
        const [cart, setCart] = useState(initialCart)
        const Max_Items = 5
        const Min_Items = 1

        useEffect(() => {
            localStorage.setItem('cart', JSON.stringify(cart))
        }, [cart])
        
        //función para actualizar la cantidad de items
        function addToCart(item: Guitar){
            const itemExists=cart.findIndex(guitar=>guitar.id === item.id)
            if(itemExists >= 0){//existe en el carrito
                if(cart[itemExists].quantity >= Max_Items) return
                const updatedCart = [...cart]
                updatedCart[itemExists].quantity++
                setCart(updatedCart)
            } else { //agrega el elemento con valor de 1 si no existe
                const newItem : cartItem = {...item, quantity:1}
                setCart([...cart, newItem])
            }
        }

        function removeFromCart(id:Guitar['id']){
            setCart(prevCart=>prevCart.filter(guitar => guitar.id !== id))
        }

        function increaseQuantity(id:Guitar['id']){
            const uptdatedCart = cart.map(item =>{
                if(item.id === id && item.quantity < Max_Items){
                    return{
                        ...item,
                        quantity: item.quantity + 1
                    }
                }
                return item
            })
            setCart(uptdatedCart)
        }

        function decreaseQuantity(id:Guitar['id']){
            const uptdatedCart = cart.map(item =>{
                if(item.id === id && item.quantity > Min_Items){
                    return{
                        ...item,
                        quantity: item.quantity - 1
                    }
                }
                return item
            })
            setCart(uptdatedCart)
        }

        function clearCart(){
            setCart([])
        }

    //state derivado
    const isEmpty = useMemo(() => cart.length === 0, [cart])
    const cartTotal = useMemo(() => cart.reduce((total, item) => total + (item.quantity*item.price), 0), [cart])

    return{
        data,
        cart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        isEmpty,
        cartTotal
    }
}