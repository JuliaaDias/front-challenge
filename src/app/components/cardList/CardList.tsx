import React, { useState, useEffect } from 'react';
import Card from '../card/Card';
import SearchBar from '../search/SearchBar';
import { fetchBffData } from '../../apiService';

type Dashboard = {
  id: number;
  name: string;
};

type Product = {
  id: number;
  title: string;
  subtitle: string;
  imagePath: string;
  description: string;
  dashboards: Dashboard[];
};

type BffData = {
  products: Product[];
};

const CardList: React.FC = () => {
  const [bffData, setBffData] = useState<BffData | null>(null);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchBffData();
        setBffData(data);
        setFilteredProducts(data.products); 
      } catch (error) {
        console.error('Erro ao carregar os dados do BFF:', error);
      }
    };

    loadData();
  }, []);

  const handleSearchResult = (filteredProducts: Product[]) => {
    setFilteredProducts(filteredProducts);
  };

  return (
    <div>
      {bffData && (
        <SearchBar products={bffData.products} onSearchResult={handleSearchResult} />
      )}
      <div className="card-list">
        {filteredProducts.map(product => (
          <Card
            key={product.id}
            title={product.title}
            subtitle={product.subtitle}
            image={product.imagePath}
            description={product.description}
            dashboards={product.dashboards}
          />
        ))}
      </div>
    </div>
  );
};

export default CardList;
