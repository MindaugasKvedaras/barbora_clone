import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { client } from '../lib/client';

const Context = createContext();

export const StateContext = ({ children }) => {
    const [showCart, setShowCart] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [subTotalPrice, setSubTotalPrice] = useState(0);
    const [totalQuantities, setTotalQuantities] = useState(0);
    const [taraPrice, setTaraPrice] = useState(0);
    const [qty, setQty] = useState(1);


    const onAdd = (product, quantity) => {
        const checkProductInCart = cartItems.find((item) => item._id === product._id);
        
        setTaraPrice((prevTaraPrice) => prevTaraPrice + product.tara * quantity)        
        setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * (1-(product.discount/100)).toFixed(2) * quantity);
        
        setSubTotalPrice((prevTotalPrice) => prevTotalPrice + (product.tara + product.price * (1-(product.discount/100)).toFixed(2)) * quantity);

        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);

        if(checkProductInCart) {
            const updatedCartItems = cartItems.map((cartProduct) => {
                if(cartProduct._id === product._id)
                return {
                    ...cartProduct,
                    quantity: cartProduct.quantity + quantity
                }

                return cartProduct 
            })

            setCartItems(updatedCartItems);

        } else {
            product.quantity = quantity;
            
            setCartItems([...cartItems, {...product }]);
        }

        toast.success(`${qty} ${product.name} pridėti į krepšelį`);
        setQty(1);
    }


    const onAddFromCard = (product, quantity) => {
        const checkProductInCart = cartItems.find((item) => item._id === product._id);

        setTaraPrice((prevTaraPrice) => prevTaraPrice + product.tara * quantity)        
        setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * (1-(product.discount/100)).toFixed(2));
        
        setSubTotalPrice((prevTotalPrice) => prevTotalPrice + (product.tara + product.price * (1-(product.discount/100)).toFixed(2) * quantity ));

        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + 1);


        if(checkProductInCart) {
            const updatedCartItems = cartItems.map((cartProduct) => {
                if(cartProduct._id === product._id)
                return {
                    ...cartProduct,
                    quantity: cartProduct.quantity + 1
                }
    

                return cartProduct 
            })

    

            setCartItems(updatedCartItems);

        } else {
            product.quantity = quantity;
            
            setCartItems([...cartItems, {...product }]);
        }

        toast.success(`${qty} ${product.name} pridėti į krepšelį`);
        setQty(1);
    }

    const onRemoveFromCard = (product, quantity) => {
        const checkProductInCart = cartItems.find((item) => item._id === product._id);
        
        setTaraPrice((prevTaraPrice) => prevTaraPrice + product.tara * quantity) 
        
        
        setTotalPrice((prevTotalPrice) => {
            if(totalPrice <= product.price * (1-(product.discount/100)).toFixed(2))
            return product.price * (1-(product.discount/100)).toFixed(2)
            return prevTotalPrice - product.price * (1-(product.discount/100)).toFixed(2);
        })
        

        setSubTotalPrice((prevTotalPrice) => prevTotalPrice - (product.tara + product.price * (1-(product.discount/100)).toFixed(2)));

        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - 1);
        

        if(checkProductInCart) {
            const updatedCartItems = cartItems.map((cartProduct) => {
                if(cartProduct._id === product._id)
                return {
                    ...cartProduct,
                    quantity: cartProduct.quantity - 1
                }

                return cartProduct 
            })

            setCartItems(updatedCartItems);

        } else {
            product.quantity = quantity;
            
            setCartItems([...cartItems, {...product }]);
        }

        setQty(1);
    }


    const onRemove = (product) => {
        const foundProduct = cartItems.find((item) => item._id === product._id);
        const newCartItems = cartItems.filter((item) => item._id !== product._id);

        setTaraPrice((prevTaraPrice) => prevTaraPrice - foundProduct.tara * foundProduct.quantity)
        setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price * (1-(foundProduct.discount/100)).toFixed(2) * foundProduct.quantity)
        setTotalQuantities(prevTotalQuantities => prevTotalQuantities - foundProduct.quantity);
        setSubTotalPrice((prevTotalPrice) => prevTotalPrice - (product.tara + product.price * (1-(product.discount/100)).toFixed(2)) * foundProduct.quantity);
        setCartItems(newCartItems);

    }

    const toggleCartItemQuantity = (id, value) => {
        const foundProduct = cartItems.find((item) => item._id === id)
        const index = cartItems.findIndex((product) => product._id === id)
        const newCartItems = cartItems.filter((item) => item._id !== id)

        if (value === 'inc') {
            newCartItems.splice(index, 0, { ...foundProduct, quantity: foundProduct.quantity + 1 });
            setCartItems(newCartItems);
            setTaraPrice((prevTaraPrice) => prevTaraPrice + foundProduct.tara)            
            setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price * (1-(foundProduct.discount/100)).toFixed(2))
            setSubTotalPrice((prevSubTotalPrice) => prevSubTotalPrice + foundProduct.tara + foundProduct.price * (1-(foundProduct.discount/100)).toFixed(2))
            setTotalQuantities(prevTotalQuantities => prevTotalQuantities + 1)
            setQty
        } else if (value === 'dec') {
            if(foundProduct.quantity > 1) {
                newCartItems.splice(index, 0, { ...foundProduct, quantity: foundProduct.quantity - 1 });
                setCartItems(newCartItems);  
                setTaraPrice((prevTaraPrice) => prevTaraPrice - foundProduct.tara)                          
                setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price * (1-(foundProduct.discount/100)).toFixed(2))
                setSubTotalPrice((prevSubTotalPrice) => prevSubTotalPrice - foundProduct.tara - foundProduct.price * (1-(foundProduct.discount/100)).toFixed(2))
                setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - 1)
            }
        }
    }

    const incQty = () => {
        setQty((prevQty) => prevQty + 1);
    }

    const decQty = () => {
        setQty((prevQty) => { 
            if(prevQty - 1 < 1) return 1;
            return prevQty - 1;
        });
    }

    const decQtyFromCard = () => {
        setQty((prevQty) => { 
            if(prevQty - 1 <= 0 ) return 0
            return prevQty - 1;
        });
    }


    return (
        <Context.Provider 
            value={{
                showCart,
                setShowCart,
                cartItems,
                totalPrice,
                totalQuantities,
                qty,
                incQty,
                decQty,
                onAdd,
                toggleCartItemQuantity,
                onRemove,
                setCartItems,
                setTotalPrice,
                setTotalQuantities,
                subTotalPrice,
                taraPrice,
                onAddFromCard,
                onRemoveFromCard,
                decQtyFromCard,
            }}
        
        >
            {children}
        </Context.Provider>
    )
}

export const getServerSideProps = async () => {
    const query = '*[_type == "product"]';
    const products = await client.fetch(query);

    const bannerQuery = '*[_type == "banner"]';
    const bannerData = await client.fetch(bannerQuery);

    return {
      props: { products, bannerData }
    }
  }


export const useStateContext = () => useContext(Context);