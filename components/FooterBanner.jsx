import React from 'react';
import Link from 'next/link';
import { BsArrowLeftShort, BsArrowRightShort } from 'react-icons/bs';


import { urlFor } from '../lib/client';

import { useStateContext } from '../context/StateContext';

const FooterBanner = ({ product, product: { image, name, slug, price, advertise, discount } }) => {
  
  const scrollRef = React.useRef(null);

  const scroll = (direction) => {
    const { current } = scrollRef;

    if(direction === 'left') {
      current.scrollLeft -= 300;
    } else {
      current.scrollLeft += 300;
    }
  }

  const { qty, onAdd } = useStateContext();

  const discountedPrice = (price * (1-(discount/100))).toFixed(2).replace(/\./g, ',');
  const ltPrice = price.toFixed(2).replace(/\./g, ',');


  const priceAfterDiscount = () => {
    if(discount === 0) {
      return price;
    } else {
      return discountedPrice;
    }
  }

  
  return (
    <Link href={`/product/${slug.current}`}>
    <div className="footer-banner-container"  ref={scrollRef}>
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
          <p><span className="price-old-product_banner">€{ltPrice}</span>€{priceAfterDiscount()}</p>
        </div>
            <button type="button" onClick={() => onAdd(product, qty)}>Į krepšelį</button>
      </div>
    </div>
    </Link>
  )
}

export default FooterBanner;