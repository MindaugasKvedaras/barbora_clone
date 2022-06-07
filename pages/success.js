import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { BsBagCheckFill } from 'react-icons/bs';

import { useStateContext } from '../context/StateContext';
import { runFireworks } from '../lib/utils';

const Success = () => {
  const { setCartItems, setTotalPrice, setTotalQuantities } = useStateContext();

  useEffect(() => {
    localStorage.clear();
    setCartItems([]);
    setTotalPrice(0);
    setTotalQuantities(0);
    runFireworks();
  }, []);

  return (
    <div className="success-wrapper">
        <div className="success">
            <p className="icon">
                <BsBagCheckFill />
            </p>
            <h2>Ačiū, užsakymas apmokėtas sėkmingai!</h2>
            <p className="email-msg">Jūsų nurodytu el. paštu išsiuntėme apmokėjimo kvitą!</p>
            <p className="description">
                Jeigu turite klausimų, rašykite į el.paštą
                <a className="email" href="mailto:uzsakymai@barbora.lt">
                    uzsakymai@barbora.lt
                </a>
            </p>
            <Link href="/">
                <button type="button" width="300px" className="btn">
                    Tęsti apsipirkimą
                </button>
            </Link>
        </div>
    </div>
  )
}

export default Success