"use client";

import React, { useState, useEffect } from 'react';
import Spinner from './components/spinner/Spinner'; 
import NavBar from './components/nav/Navbar';
import Footer from './components/footer/Footer';
import Dashboard from './components/cardList/CardList';
import { fetchBffData } from './apiService';
import './reset.css'
import './style.css'

type Dashboards = {
  id: number;
  name: string;
  documentations: { id: number; name: string }[];
};

type Product = {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  imagePath: string;
  dashboards: Dashboards[];
};

type BffData = {
  title: string;
  subtitle: string;
  products: Product[];
};

const BffComponent: React.FC = () => {
  const [bffData, setBffData] = useState<BffData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchBffData();
        setBffData(data);
      } catch (error) {
        console.error('Erro ao carregar os dados do BFF:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  if (!bffData) {
    return <div>Erro ao carregar os dados.</div>;
  }

  return (
    <div className='page'>
      <NavBar />
      <div className='login'>
        <span>faça o seu login para acessar:</span>
        <button>Login</button>
      </div>
      <div className='introduction'>
        <h1>{bffData.title}</h1>
        <h2>{bffData.subtitle}</h2>
      </div>
      <Dashboard />
      <Footer />
    </div>
  );
};

export default BffComponent;
