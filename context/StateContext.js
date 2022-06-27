import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { client } from '../lib/client';

const Context = createContext();

export const StateContext = ({ children }) => {
    const [showCart, setShowCart] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalQuantities, setTotalQuantities] = useState(0);
    const [qty, setQty] = useState(1);
    // const [search, setSearch] = useState('');
    // const [sanityProducts, setSanityProducts] = useState([]);

    let foundProduct;
    let index;

    // const onSearch =  async (products) => {
          
    //     if(search)  {
    //      const searchedProducts = products.filter((product) => 
    //          product.name.toLowerCase().includes(search)
    //      );
         
    //      window.scrollTo({ top: 1200, left: 100, behavior: 'smooth' });

    //      setSearch('');
    //      setSanityProducts(searchedProducts);

    
    //     } 
    // }


    const onAdd = (product, quantity) => {
        const checkProductInCart = cartItems.find((item) => item._id === product._id);

        setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity);
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

    const onRemove = (product) => {
        foundProduct = cartItems.find((item) => item._id === product._id);
        const newCartItems = cartItems.filter((item) => item._id !== product._id);

        setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price * foundProduct.quantity)
        setTotalQuantities(prevTotalQuantities => prevTotalQuantities - foundProduct.quantity);
        setCartItems(newCartItems);
    }

    // const handleSearch = (product) => {
    //     productFromSanity = cartItems.find((item) => item._id === product._id);

    //     if(search) {
    //         const searchedProducts = cartItems.filter((item) => item.name.toLowerCase().includes(search));
    //     }

    //     setSearch(searchedProducts);

    // }



    const toggleCartItemQuantity = (id, value) => {
        foundProduct = cartItems.find((item) => item._id === id)
        index = cartItems.findIndex((product) => product._id === id)
        const newCartItems = cartItems.filter((item) => item._id !== id)

        if (value === 'inc') {
            newCartItems.splice(index, 0, { ...foundProduct, quantity: foundProduct.quantity + 1 });
            setCartItems(newCartItems);            
            setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price)
            setTotalQuantities(prevTotalQuantities => prevTotalQuantities + 1)
        } else if (value === 'dec') {
            if(foundProduct.quantity > 1) {
                newCartItems.splice(index, 0, { ...foundProduct, quantity: foundProduct.quantity - 1 });
                setCartItems(newCartItems);                
                setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price)
                setTotalQuantities(prevTotalQuantities => prevTotalQuantities - 1)
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