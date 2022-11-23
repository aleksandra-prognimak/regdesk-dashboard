import { Link } from 'react-router-dom';

export const HeaderLeft = () => (
  <div className="header__left">
    <div className="header__logo">
      <Link to="home" className="header__logo-link" />
    </div>
  </div>
);
