import React, { useState } from "react";
import "./style.css";

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

const SearchBar: React.FC<{
  products: Product[];
  onSearchResult: (filteredProducts: Product[]) => void;
}> = ({ products, onSearchResult }) => {
  const [query, setQuery] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);

    const filtered = filterProducts(event.target.value);
    onSearchResult(filtered);
  };

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    const filtered = filterProducts(query);
    onSearchResult(filtered);
  };

  const filterProducts = (query: string) => {
    if (!query) return products;

    const filtered = products.filter((product) =>
      product.dashboards.some((dashboard) =>
        dashboard.name.toLowerCase().includes(query.toLowerCase())
      )
    );

    return filtered.length > 0 ? filtered : products;
  };

  return (
    <div>
      <form className="search-bar" onSubmit={handleSearch}>
        <input
          type="text"
          className="search-bar__input"
          value={query}
          onChange={handleInputChange}
          placeholder="Informe o nome do dashboard que deseja"
        />
        <button type="submit" className="search-bar__button">
          Buscar
        </button>
      </form>
      <img src='/images/powerby.svg' alt="power by Gen IA" className="powerby__logo" />
    </div>
  );
};

export default SearchBar;
