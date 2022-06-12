import React from 'react';
import Link from 'next/link';

import { urlFor } from '../lib/client';

const Product = ( { product: { image, name, slug, price, discount, amount, units } }) => {

  const discountedPrice = price * (1-(discount/100));


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
    <>
    {discount === 0 ? (
    <div>
        <div className="product-card">
        <div className="product-card-image-price">
           <img 
            src={urlFor(image && image[0])} 
            width={350}
            height={250}
            className="product-image"
            />
          <p className="product-price-before-discount">€{price}</p>  
          <p className="product-price">€{priceAfterDiscount()}</p>
          <p className="product-price-per-unit">{pricePerUnits()}</p>
        </div>
          <div className="product-card_content">
            <p className="product-name">{name + ", " + amount + " " + units}</p>
            <Link href={`/product/${slug.current}`}>
              <button type="button" className="product-card_content-btn">Į krepšelį</button>
            </Link>
          </div>
        </div>
    </div>
    ) : (
      <div>
        <div className="product-card">
        <div className="product-card-discount-label">
          <p>-{discount}%</p>
        </div>
        <div className="product-card-image-price">
           <img 
            src={urlFor(image && image[0])} 
            width={350}
            height={250}
            className="product-image"
            />
          <p className="product-price-before-discount">€{price}</p>  
          <p className="product-price">€{priceAfterDiscount()}</p>
          <p className="product-price-per-unit">{pricePerUnits()}</p>
        </div>
          <div className="product-card_content">
            <p className="product-name">{name + ", " + amount + " " + units}</p>
            <Link href={`/product/${slug.current}`}>
              <button type="button" className="product-card_content-btn">Į krepšelį</button>
            </Link>
          </div>
        </div>
    </div>

    )}
    </>
  );
};

export default Product;