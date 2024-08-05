import React from 'react';
import './style.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer__content">
        <p className="footer__text">© 2024 XPTO S.A. CNPJ: xx.xxx.xxx/xxxx-xx</p>
        <p className="footer__subtext">termos de uso</p>
      </div>
    </footer>
  );
};

export default Footer;
