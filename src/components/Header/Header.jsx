import { HeaderLeft } from './HeaderLeft';
import './Header.scss';
import { HeaderRight } from './HeaderRight';

export const Header = ({ isOpenMenu, setIsOpenMenu }) => {
  return (
    <header className="header" onClick={() => setIsOpenMenu(false)}>
      <HeaderLeft />
      <HeaderRight isOpenMenu={isOpenMenu} setIsOpenMenu={setIsOpenMenu} />
    </header>
  );
};
