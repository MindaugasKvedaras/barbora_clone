import React, {useState, useEffect} from 'react';
import { useRef } from 'react';
import { useStateContext } from '../context/StateContext';
import { TextField, Autocomplete, Stack } from '@mui/material';


import { urlFor, client } from '../lib/client';
import { productQuery } from '../lib/data';
// import { ReactSearchAutocomplete } from "react-search-autocomplete";
import Product from './Product';
import { Card, Box, Flex, SearchIcon } from '@sanity/ui';
import ProductTable from './ProductTable';

const SearchProducts = ({products}) => {
  const [query, setQuery] = useState("");

  return (
    <div>
      <input 
        placeholder="ieskoti..."
        onChange={(e) => setQuery(e.target.value.toLowerCase())}
      />
      <ul>
        {products?.map((product) => 
        product.name.toLowerCase().includes(query)).map((product) => (
          <li key={product._id}>
            {product.name}
          </li>
        ))}
      </ul>
    </div>
  )

}
//   const [sanityProducts, setSanityProducts] = useState();

//   useEffect(() => {
//     if (searchTerm !== '') {
//       const query = searchQuery(searchTerm.toLowerCase());
//       client.fetch(query).then((data) => {
//         setSanityProducts(data);
//       })
//     } else {
//       return "Nieko"
//     }
//   }, [searchTerm]);

//   return (
//     <div>
//       {sanityProducts?.length !== 0 && <Card sanityProducts={sanityProducts} />}
//     </div>
//   )
  
// }   
  


export const getServerSideProps = async () => {
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);

  return {
    props: { products }
  }
}


export default SearchProducts;