import { HeaderLeft } from './HeaderLeft';
import './Header.scss';
import { HeaderRight } from './HeaderRight';

export const Header = () => (
  <header className="header">
    <HeaderLeft />
    <HeaderRight />
  </header>
);
