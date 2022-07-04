import React from 'react';
import Link from 'next/link';
import { useStateContext } from '../context/StateContext';


import { urlFor } from '../lib/client';

const HeroBanner = ({ product: { image, name, slug, price, advertise, discount } }) => {
  
  const { qty, onAdd, setShowCart } = useStateContext();

  const discountedPrice = (price * (1-(discount/100))).toFixed(2);

  const priceAfterDiscount = () => {
    if(discount === 0) {
      return price;
    } else {
      return discountedPrice;
    }
  }

  const handleBuyNow = () => {
    onAdd(product, qty);

    setShowCart(true);
  }


  return (
    <div className="hero-banner-container">
      <div className="solo-container">
        <p className="beats-solo">{advertise}</p>
      </div>
      <Link href={`/product/${slug.current}`}>
      <div>
        <h3>{name}</h3>
        <h1>TIK {priceAfterDiscount()} €/kg</h1>
        <img 
        src={urlFor(image && image[0])} 
        alt="" 
        className="hero-banner-image"/>
       </div> 
       </Link> 
          <button type="button">Į krepšelį</button>
          {/* <div className="desc">
          <h5>Aprašymas</h5>
          <p>{heroBanner.desc}</p>
         </div> */}
    </div>
  )
}


export default HeroBanner;