"use client";

import React from 'react';
import { useSearchParams } from 'next/navigation';
import Footer from '../components/footer/Footer';
import './style.css';
import '../reset.css'
const DashboardDetails: React.FC = () => {
  const searchParams = useSearchParams();
  const dashboard = searchParams.get('dashboard');
  const product = searchParams.get('product');

  return (
    <div className='dashboard-details'>
      <nav className="navbar">
        <img src='/images/ico-data.svg' alt="Logo" />
        <a href="/" className="inicio">início</a>
      </nav>
      <div className='details-content'>
        {dashboard && product ? (
          <p>Você acessou o dashboard <span className='dashName'>{dashboard}</span> do assunto <span className='prodTitle'>{product}</span></p>
        ) : (
          <p>Selecione um dashboard para ver os detalhes.</p>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default DashboardDetails;
