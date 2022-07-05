import React, { useState } from 'react';
import Link from 'next/link';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';


import { urlFor } from '../lib/client';
import { useStateContext } from '../context/StateContext';


const Product = ( {product }) => {

  const { image, name, slug, amount, units, price, discount, tara } = product;
  const { decQtyFromCard, qty, incQty, onAdd, onRemove, onRemoveFromCard } = useStateContext();

  const discountedPrice = (price * (1-(discount/100))).toFixed(2).replace(/\./g, ',');
  const ltPrice = price.toFixed(2).replace(/\./g, ',');
  const ltTaraPrice = tara.toFixed(2).replace(/\./g, ',');

  const [visible, setVisible] = useState(false);

  const handleAddCart = () => {
    onAdd(product, qty)
    setVisible(true);
  }

  const notRemoveFromCard = () => {
    setVisible(false);
  }

  const handleAddSecondTime = () => {
    onAdd(product, qty)
    setVisible(false);
  }


  const handleRemoveFromCard = () => {
    onRemove(product)
    setVisible(false);
  }

  const priceAfterDiscount = () => {
    if(discount === 0) {
      return ltPrice
    } else {
      return discountedPrice
    }
  }

  const pricePerUnits = () => {
    if(amount > 1 & units === "vnt.") {
      return "€" + (price/amount).toFixed(2).replace(/\./g, ',') + "/" + units
    } else if (units === "g") {
      return "€" + (price/(amount/1000)).toFixed(2).replace(/\./g, ',') + "/kg"
    } else if (amount > 1 & units === "l") {
      return "€" + (price/amount).toFixed(2).replace(/\./g, ',') + "/" + units
    } else if (amount === 1) {
      return ltPrice + "/" + units
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
            <p className='product-card-tara'>€{ltTaraPrice} x Tara</p>
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
              <p><span className="yes" onClick={handleRemoveFromCard}>Taip</span><span className="no" onClick={notRemoveFromCard}>Ne</span></p>
            </div>
        }
        </div>
    </div>
  );
};

export default Product;