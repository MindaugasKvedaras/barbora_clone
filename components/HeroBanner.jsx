import React from 'react';
import Link from 'next/link';

import { urlFor } from '../lib/client';

const HeroBanner = ({ heroBanner }) => {
  return (
    <div className="hero-banner-container">
    <div className="solo-container">
      <p className="beats-solo">{heroBanner.smallText}</p>
    </div>
      <div>
        <h3>{heroBanner.midText}</h3>
        <h1>{heroBanner.largeText1}</h1>
        <div>
        <img src={urlFor(heroBanner.image)} alt="" className="hero-banner-image"/>
        <Link href={`/product/${heroBanner.product}`}>
          <button type="button">{heroBanner.buttonText}</button>
        </Link>
          {/* <div className="desc">
          <h5>Aprašymas</h5>
          <p>{heroBanner.desc}</p>
         </div> */}
        </div>
      </div>
    </div>
  )
}

export default HeroBanner;