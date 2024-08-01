import { useRouter } from 'next/navigation';
import React from 'react';
import './style.css'

type Dashboard = {
  id: number;
  name: string;
};

type CardProps = {
  title: string;
  subtitle: string;
  image: string;
  description: string;
  dashboards: Dashboard[];
};

const Card: React.FC<CardProps> = ({ title, subtitle, image, description, dashboards }) => {
  const router = useRouter();

  const handleButtonClick = (dashboard: Dashboard) => {
    router.push(`/dashboard-details?dashboard=${encodeURIComponent(dashboard.name)}&product=${encodeURIComponent(title)}`);
  };

  return (
    <div className="card">
      <img src={image} alt={title} className="card__image" />
      <div className="card__content">
        <h2 className="card__title">{title}</h2>
        <h3 className="card__subtitle">{subtitle}</h3>
        <p className="card__description">{description}</p>
        <div className="card__dashboards">
          {dashboards.map(dashboard => (
            <button
              key={dashboard.id}
              className="card__button"
              onClick={() => handleButtonClick(dashboard)}
            >
              {dashboard.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Card;
