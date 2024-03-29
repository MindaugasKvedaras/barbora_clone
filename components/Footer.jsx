import React from 'react';
import { AiFillInstagram, AiFillLinkedin, AiFillFacebook, AiFillYoutube } from 'react-icons/ai';
import { SocialIcon } from 'react-social-icons';

const Footer = () => {

  const date = new Date();
  const currentYear = date.getFullYear();
  return (
    <div className="footer-container">
      <p>Ⓒ {currentYear}  UAB „Barbora“. Visos teisės saugomos</p>
      <div className="icons">
        <SocialIcon url="https://www.instagram.com/barbora.lt/"/>
        <SocialIcon url="https://www.linkedin.com/company/barbora/"/>
        <SocialIcon url="https://www.facebook.com/BarboraLietuvoje"/>
        <SocialIcon url="https://www.youtube.com/channel/UCmJSZ6m1bE0HBVABg0FMSAA"/>
      </div>
    </div>
  )
}

export default Footer;