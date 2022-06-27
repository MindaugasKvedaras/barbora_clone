import React from 'react';
import Link from 'next/link';

import { urlFor } from '../lib/client';

const FooterBanner = ({ product: { image, name, slug, price, advertise, discount } }) => {
  
  const discountedPrice = (price * (1-(discount/100))).toFixed(2);

  const priceAfterDiscount = () => {
    if(discount === 0) {
      return price;
    } else {
      return discountedPrice;
    }
  }

  
  return (
    <div className="footer-banner-container">
      <div className="banner-desc">
        <div className="left">
          <p className="left-discount">-{discount}%</p>
          <h3>{advertise}</h3>
          {/* <h3>{largeText2}</h3>
          <p>{saleTime}</p> */}
        </div>
        <img 
          src={urlFor(image && image[0])}
          alt=""
          className="footer-banner-image"
        />

        <div className="right">
          {/* <p>{smalt}</p> */}
          <h3>{name}</h3>
          <p>€{priceAfterDiscount()}</p>
          <Link href={`/product/${slug.current}`}>
            <button type="button">Į krepšelį</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default FooterBanner;