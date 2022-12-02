import { HomeIcon } from '../../../images/HomeIcon';
import { HeaderMenu } from '../HeaderMenu';
import { Time } from './Time';

export const HeaderRight = ({ isOpenMenu, setIsOpenMenu }) => {
  return (
    <div className="header__right">
      <Time />
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
      <div
        className="header__home"
        onClick={(event) => {
          setIsOpenMenu(!isOpenMenu);
          event.stopPropagation();
        }}
      >
        <div className="header__home-link">
          <div className="header__button">
            <HomeIcon />
          </div>
        </div>
        {isOpenMenu && (
          <HeaderMenu isOpenMenu={isOpenMenu} setIsOpenMenu={setIsOpenMenu} />
        )}
      </div>
    </div>
  );
};
