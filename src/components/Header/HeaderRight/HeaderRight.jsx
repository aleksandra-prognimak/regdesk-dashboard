import { Link } from 'react-router-dom';

export const HeaderRight = () => {
  const date = new Date().toLocaleString();

  return (
    <div className="header__right">
      <div className="header__date">
        <div className="header__date-name">Serve time</div>
        <div className="header__date-time">{date}</div>
      </div>
      <div className="header__bell">
        <div className="header__bell-mail">13</div>
      </div>
      <div className="header__lang">
        <div className="header__lang-icon"></div>
        <div className="header__lang-name">EN-GB</div>
      </div>
      <div className="header__user">
        <div className="header__user-icon"></div>
        <div className="header__user-name">John Dou</div>
      </div>
      <div className="header__home">
        <Link to="/" className="header__home-link">
          <div className="header__button"></div>
        </Link>
      </div>
    </div>
  );
};
