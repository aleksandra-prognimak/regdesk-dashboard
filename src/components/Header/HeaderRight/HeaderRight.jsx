import { HomeIcon } from '../../../images/HomeIcon';
import { HeaderMenu } from '../HeaderMenu';
import { Time } from './Time';
import { BellIcon } from '../../../images/BellIcon';
import { LangIcon } from '../../../images/LangIcon';
import { UserIcon } from '../../../images/UserIcon';

export const HeaderRight = ({ isOpenMenu, setIsOpenMenu }) => {
  return (
    <div className="header__right">
      <Time />
      <div className="header__bell">
        <div className="header__bell-mail">13</div>
        <BellIcon />
      </div>
      <div className="header__lang">
        <div className="header__lang-icon"><LangIcon /></div>
        <div className="header__lang-name">EN-GB</div>
      </div>
      <div className="header__user">
        <div className="header__user-icon"><UserIcon /></div>
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
          <HeaderMenu setIsOpenMenu={setIsOpenMenu} />
        )}
      </div>
    </div>
  );
};
