import React from 'react';
import Head from 'next/head';


import { client } from '../lib/client';
import { Product, FooterBanner, HeroBanner } from '../components';
import SearchProducts from '../components/SearchBar';


const Home = ({ products, bannerData }) => {

const filtered = products.filter(product => {
  return product.advertise != null;
})

const filteredFooterBanner = products.filter(product => {
  return product.discount < 30 && product.discount > 0;
})

return (
    <div>
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
        <h2>Populiariausios prekės</h2>
        <p>Barboroje apsipirkti apsimoka!</p>
      </div>

      <div className="products-container">
        {products?.map((product) => <Product key={product._id} product={product} />)}
      </div>

      <div>
        {filteredFooterBanner.map(product => {
          return (
         <FooterBanner key={product._id} product={product}  />
          )
        })}
      </div>    
    </div>
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
