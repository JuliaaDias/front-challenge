import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import "./style.css";

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

const Card: React.FC<CardProps> = ({
  title,
  subtitle,
  image,
  description,
  dashboards,
}) => {
  const [disabledButtons, setDisabledButtons] = useState<string[]>([]);
  const router = useRouter();

  useEffect(() => {
    const storedDisabledButtons = localStorage.getItem("disabledButtons");
    if (storedDisabledButtons) {
      setDisabledButtons(JSON.parse(storedDisabledButtons));
    }
  }, []);

  const handleButtonClick = (dashboard: Dashboard) => {
    const updatedDisabledButtons = [...disabledButtons, dashboard.name];
    setDisabledButtons(updatedDisabledButtons);
    localStorage.setItem('disabledButtons', JSON.stringify(updatedDisabledButtons));

    router.push(
      `/dashboard-details?dashboard=${encodeURIComponent(
        dashboard.name
      )}&product=${encodeURIComponent(title)}`
    );
  };

  return (
    <div className="card">
      <img src={image} alt={title} className="card__image" />
      <div className="card__content">
        <h3 className="card__subtitle">{subtitle}</h3>
        <h2 className="card__title">{title}</h2>
        <p className="card__description">{description}</p>
        <div className="card__dashboards">
          {dashboards.map((dashboard) => (
            <button
              key={dashboard.id}
              className={`card__button ${disabledButtons.includes(dashboard.name) ? 'disable' : ''}`}
              onClick={() => handleButtonClick(dashboard)}
              disabled={disabledButtons.includes(dashboard.name)}
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
