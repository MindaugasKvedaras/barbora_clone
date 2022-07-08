import React, { useState } from 'react';
import Head from 'next/head';


import { client } from '../lib/client';
import { Product, FooterBanner, HeroBanner, Categories } from '../components';


const Home = ({ products, bannerData }) => {

const [activeFilter, setActiveFilter] = useState("Populiarios");
const [filterProducts, setFilterProducts] = useState([]);


const categories = ["Akcijos", "Populiarios", "Duonos gaminiai ir konditerija", "Gėrimai", "Kūdikių prekės", "Mėsa, žuvis ir kulinarija", "Pieno produktai", "Vaisiai ir daržovės" ];

const filtered = products.filter(product => {
  return product.advertise != null;
})

const popularProducts = products.filter(product => {
  return product.popular === "taip";
})

const discountedProducts = products.filter(product => {
  return product.discount > 0;
})


const filteredFooterBanner = products.filter(product => {
  return product.discount < 30 && product.discount > 0;
})

const handleProductFilter = (category) => {
  setActiveFilter(category);

  setTimeout(() => {

      setFilterProducts(products.filter(product => {
        return product.category === category
      }))
      
  }, 500);

} 

return (
    <>
      <Head>
        <title>BARBORA</title>
      </Head>
      <div>
        {filtered.map(product => {
          return (
         <HeroBanner key={product._id} product={product}  />
          )
        })}
      </div>
      <div className="products-heading">
        <h2>Ieškok savo prekių</h2>
        <p>Barboroje apsipirkti apsimoka!</p>
      </div>
      <div className="products-filter">
        {categories.map((category, index) => (
          <div
            key={index}
            onClick={() => handleProductFilter(category)}
            className={`product-filter-item ${activeFilter === category ? 'item-active' : ''}`}
          >
            {category}
          </div>
        ))}
      </div>
      {activeFilter === "Populiarios" ? ( 
        <div className="products-container">
          {popularProducts.map((product) => ( <Product key={product._id} product={product} />))}
        </div>
       ) : activeFilter === "Akcijos" ? ( 
        <div className="products-container">
          {discountedProducts.map((product) => ( <Product key={product._id} product={product} />))}
        </div>
        ) : (
        <div className="products-container">
         {filterProducts.map((product) => <Product key={product._id} product={product} />)}
        </div>
       )} 
      <div className="footer-banners">
        {filteredFooterBanner.map(product => {
          return (
         <FooterBanner key={product._id} product={product}  />
          )
        })}
      </div>    
    </>
)
};

export const getServerSideProps = async () => {
    const query = '*[_type == "product"]';
    const products = await client.fetch(query);

    const bannerQuery = '*[_type == "banner"]';
    const bannerData = await client.fetch(bannerQuery);

    return {
      props: { products, bannerData }
    }
  }

export default Home;
