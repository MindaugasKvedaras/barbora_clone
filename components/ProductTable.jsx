import React from 'react';
import { client } from '../lib/client';


const ProductTable = ({products}) => {
  return (
    <div>
        {products?.map((product) => {
            <p>{product.name}</p>
        })}
    </div>
  )
}

export const getServerSideProps = async () => {
    const query = '*[_type == "product"]';
    const products = await client.fetch(query);
  
    return {
      props: { products }
    }
  }

export default ProductTable;