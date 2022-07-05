import React from 'react';
import { AiFillInstagram, AiFillLinkedin, AiFillFacebook, AiFillYoutube } from 'react-icons/ai';
import Link from  'next/link';

const Footer = () => {

  const date = new Date();
  const currentYear = date.getFullYear();
  return (
    <div className="footer-container">
      <p>Ⓒ {currentYear}  UAB „Barbora“. Visos teisės saugomos</p>
      <p className="icons">
        <a href="https://barbora.lt"><AiFillInstagram /></a>
        <AiFillLinkedin />
        <AiFillFacebook />
        <AiFillYoutube />
      </p>
    </div>
  )
}

export default Footer;