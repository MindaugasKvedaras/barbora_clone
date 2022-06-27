import React from 'react';
import Link from 'next/link';

import { urlFor } from '../lib/client';

const HeroBanner = ({ product: { image, name, slug, price, advertise, discount } }) => {

  const discountedPrice = (price * (1-(discount/100))).toFixed(2);

  const priceAfterDiscount = () => {
    if(discount === 0) {
      return price;
    } else {
      return discountedPrice;
    }
  }

  return (
    <div className="hero-banner-container">
      <div className="solo-container">
        <p className="beats-solo">{advertise}</p>
      </div>
      <div>
        <h3>{name}</h3>
        <h1>TIK {priceAfterDiscount()} €/kg</h1>
        <img 
        src={urlFor(image && image[0])} 
        alt="" 
        className="hero-banner-image"/>
        <Link href={`/product/${slug.current}`}>
          <button type="button">Į krepšelį</button>
        </Link>
          {/* <div className="desc">
          <h5>Aprašymas</h5>
          <p>{heroBanner.desc}</p>
         </div> */}
      </div>
    </div>
  )
}


export default HeroBanner;