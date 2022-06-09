import React from 'react';
import Link from 'next/link';

import { urlFor } from '../lib/client';

const Product = ( { product: { image, name, slug, price } }) => {
  return (

    <div>
        <div className="product-card">
          <img 
            src={urlFor(image && image[0])} 
            width={350}
            height={250}
            className="product-image"
          />
          <div className="product-card_content">
            <p className="product-name">{name}</p>
            <p className="product-price">{price}€</p>
            <Link href={`/product/${slug.current}`}>
              <button type="button" className="product-card_content-btn">Į krepšelį</button>
            </Link>
          </div>
        </div>
    </div>
  )
}

export default Product;