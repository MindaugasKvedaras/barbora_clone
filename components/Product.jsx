import React, { useState } from 'react';
import Link from 'next/link';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';


import { urlFor } from '../lib/client';
import { useStateContext } from '../context/StateContext';


const Product = ( {product }) => {

  const { id, image, name, slug, amount, units, details, price, discount, tara, quantity } = product;
  const { decQtyFromCard, setQty, cartItems, productQty, decQty, qty, incQty, onAdd, onRemove, onAddFromCard, onRemoveFromCard } = useStateContext();
  const discountedPrice = (price * (1-(discount/100))).toFixed(2);

  const [visible, setVisible] = useState(false);

  const handleAddCart = () => {
    onAdd(product, qty)
    setVisible(true);
  }

  const handleAddSecondTime = () => {
    onAddFromCard(product, qty)
    setVisible(false);
  }


  const handleRemoveFromCard = () => {
    onRemoveFromCard(product)
    setVisible(false);
  }

  const visibleTrue = () => {
    setVisible(true);
  }

  const priceAfterDiscount = () => {
    if(discount === 0) {
      return price;
    } else {
      return discountedPrice;
    }
  }

  const pricePerUnits = () => {
    if(amount > 1 & units === "vnt.") {
      return "€" + (price/amount).toFixed(2) + "/" + units
    } else if (units === "g") {
      return "€" + (price/(amount/1000)).toFixed(2) + "/kg"
    } else if (amount > 1 & units === "l") {
      return "€" + (price/amount).toFixed(2) + "/" + units
    } else if (amount === 1) {
      return price + "/" + units
    }
  }


  return (
    <div>
        <div className="product-card" key={product._id}>
        {discount > 0 ? (
          <>
            <div className="product-card-discount-label">
              <p>-{discount}%</p>
            </div>
          </>
        ) : (
          null
        )}
        <Link href={`/product/${slug.current}`}>

        <div className="product-card-image-price">
           <img 
            src={urlFor(image && image[0])} 
            width={350}
            height={250}
            className="product-image"
            />
          <div>
          
          <p className="product-name">{name + ", " + amount + " " + units}</p>

          </div>
          
          {tara > 0 ? (
          <>
            <p className='product-card-tara'>€{tara} x Tara</p>
          </>
          ) : (
            null
          )}
          {discount > 0 ? (
            <>
              <p><span className="price-old-product_card">€{price}</span> <span className="product-price">€{priceAfterDiscount()}</span></p>
              
            </>
          ) : (
            <p className="product-price"> €{priceAfterDiscount()}</p>
          )}
          <p className="product-price-per-unit">{pricePerUnits()}</p>
        </div>
        </Link>
        {!visible ? 
          <div className="product-card_content">
              <button type="button" className="product-card_content-btn"  onClick={handleAddCart}>Į krepšelį</button>
          </div>
          :
          qty >= 1 ? 
          <>
            <div className="quantity-card">
              <p className="quantity-desc-card">
                  <span className="minus" onClick={decQtyFromCard}><AiOutlineMinus /></span>
                  <span className="num">{qty}</span>
                  <span className="plus" onClick={incQty}><AiOutlinePlus /></span>
              </p>
            </div>
            <div className="product-card_content">
              <button type="button" className="product-card_content-btn"  onClick={handleAddSecondTime}>Į krepšelį</button>
            </div>
          </>
            : 
            <div className="remove-from-cart">
              <p>Pašalinti prekę iš sąrašo?</p>
              <p><span className="yes" onClick={handleRemoveFromCard}>Taip</span><span className="no" onClick={handleAddCart}>Ne</span></p>
            </div>
        }
        </div>
    </div>
  );
};

export default Product;