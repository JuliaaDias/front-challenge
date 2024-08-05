"use client";

import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import './style.css';
import { fetchBffData } from '../../apiService';

type Dashboard = {
  id: number;
  name: string;
};

type Product = {
  id: number;
  title: string;
  dashboards: Dashboard[];
};

type BffData = {
  products: Product[];
};

const NavBar: React.FC = () => {
  const [bffData, setBffData] = useState<BffData | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  const handleButtonClick = (dashboard: Dashboard, productTitle: string) => {
    router.push(`/dashboard-details?dashboard=${encodeURIComponent(dashboard.name)}&product=${encodeURIComponent(productTitle)}`);
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchBffData();
        setBffData(data);
      } catch (error) {
        console.error('Erro ao carregar os dados do BFF:', error);
      }
    };

    loadData();
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="navbar">
      <img src='/images/ico-data.svg' alt="Logo" className="navbar__logo" />
      <a href="/" className="inicio">início</a>
      <button className="navbar__toggle" onClick={toggleMenu}>
        &#9776;
      </button>
      <ul className={`navbar__menu ${menuOpen ? 'navbar__menu--open' : ''}`}>
        {bffData?.products.map((product) => (
          <li key={product.id} className="navbar__item dropdown">
            <a href="#" className="navbar__link">
              {product.title}
            </a>
            <div className="dropdown-content">
              {product.dashboards.map((dashboard) => (
                <a 
                  key={dashboard.id} 
                  href="#" 
                  className="dropdown__link"
                  onClick={(e) => {
                    e.preventDefault();
                    handleButtonClick(dashboard, product.title);
                  }}
                >
                  {dashboard.name}
                </a>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
