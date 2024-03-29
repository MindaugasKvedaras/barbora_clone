import React, { useRef } from 'react';
import Link from 'next/link';
import { AiOutlineMinus, AiOutlinePlus, AiOutlineLeft, AiOutlineShopping } from 'react-icons/ai';
import { TiDeleteOutline } from 'react-icons/ti';
import toast from 'react-hot-toast';

import { useStateContext } from '../context/StateContext';
import { urlFor } from '../lib/client';
import getStripe from '../lib/getStripe';

const Cart = () => {
  const cartRef = useRef();
  const { taraPrice, subTotalPrice, totalPrice, totalQuantities, cartItems, setShowCart, toggleCartItemQuantity, onRemove } = useStateContext();

  const handleCheckout = async () => {
    const stripe = await getStripe();

    const response = await fetch('/api/stripe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cartItems),
    });

    if(response.statusCode === 500) return;
    
    const data = await response.json();

    toast.loading('Redirecting...');

    stripe.redirectToCheckout({ sessionId: data.id });
  }

  return (
    <div className="cart-wrapper" ref={cartRef}>
      <div className="cart-container">
        <button
        type="button"
        className="cart-heading"
        onClick={() => setShowCart(false)}>
          <AiOutlineLeft />
          <span className="heading">Jūsų krepšelis:</span>
          <span className="cart-num-items">prekių ({totalQuantities})</span>
        </button>

        {cartItems.length < 1 && (
          <div className="empty-cart">
            <AiOutlineShopping size={150} />
            <h3>Jūsų krepšelis tuščias</h3>
            <Link href="/">
              <button
                type="button"
                onClick={() => setShowCart(false)}
                className="btn"
              >
                Tęsti apsipirkimą
              </button>
            </Link>
          </div>
        )}

        <div className="product-container">
          {cartItems.length >= 1 && cartItems.map((item) => (
            <div className="product" key={item._id}>
              <img src={urlFor(item?.image[0])} className="cart-product-image" />
              <div className="item-desc">
                <div className="flex top">
                  <h5>{item.name + ", " + item.amount + item.units}</h5>
                  <h4>€{(item.price * (1-(item.discount/100))).toFixed(2).replace(/\./g, ',')}</h4>
                </div>
                {/* <div className="product-container_tara-price">
                  <p>{item.tara != 0 ? "+€" + item.tara + "vnt. už tarą": null}</p>
                </div> */}
                <div className="flex bottom">
                  <div>
                  <p className="quantity-desc">
                    <span className="minus" onClick={() => toggleCartItemQuantity(item._id, 'dec') }>
                    <AiOutlineMinus />
                    </span>
                    <span className="num" onClick="">{item.quantity} vnt.</span>
                    <span className="plus" onClick={() => toggleCartItemQuantity(item._id, 'inc') }><AiOutlinePlus /></span>
                  </p>
                  </div>
                  <button
                    type="button"
                    className="remove-item"
                    onClick={() => onRemove(item)}
                  >
                    <TiDeleteOutline />
                  </button>
                  <div className="hide">
                    <p>Pašalinti prekę</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {cartItems.length >= 1 && (
          <div className="cart-bottom">
            <div className="total">
              <h3>Mokėtina suma už prekes:</h3>
              <h3>€{totalPrice.toFixed(2).replace(/\./g, ',')}</h3>
            </div>
            {cartItems.find((item) => item.tara > 0) && (
            <>
            <div className="total-tara">
              <h4>Papildomas mokestis už tarą:</h4>
              <h4>+ €{taraPrice.toFixed(2).replace(/\./g, ',')} už {cartItems.map((item) => (
                <>{item.tara === 0 ? '' : item.quantity + " vnt."}</>
              ))}
              </h4>
            </div>
            <div className="total">
              <h3>Galutinė mokėtina suma:</h3>
              <h3>€{subTotalPrice.toFixed(2).replace(/\./g, ',')}</h3>
            </div>
            </>
        )}
            <div className="btn-container">
              <button type="button" className="btn" onClick={handleCheckout}>
                Apmokėti
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Cart