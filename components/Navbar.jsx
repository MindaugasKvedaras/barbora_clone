import React from 'react';
import Link from  'next/link';
import Image from 'next/image';
import { AiOutlineShopping } from 'react-icons/ai';

import { Cart } from './';
import { useStateContext } from '../context/StateContext';
import logo from '../assets//barbora.png';

const Navbar = () => {
  const { showCart, setShowCart, totalQuantities } = useStateContext();
  return (
    <div className="navbar-container">
      <div className="logo">
        <Link href="/">
          <Image 
            src={logo}
            alt="logo"
            width="200p"
            height="40px"
          />
        </Link>
      </div>
      <button type="button" className="cart-icon" onClick={() => setShowCart(true)}>
        <AiOutlineShopping />
        <span className="cart-item-qty">{totalQuantities}</span>
      </button>

      {showCart && <Cart />}
    </div>
  )
}

export default Navbar;