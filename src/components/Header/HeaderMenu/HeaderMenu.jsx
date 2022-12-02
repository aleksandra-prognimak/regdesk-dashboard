import { HomeIcon } from '../../../images/HomeIcon';
import { ProductIcon } from '../../../images/ProductIcon';
import { DocumentsIcon } from '../../../images/DocumentsIcon';
import { ApplicationsIcon } from '../../../images/ApplicationsIcon';
import { TrackingIcon } from '../../../images/TrackingIcon';
import { DCTIcon } from '../../../images/DCTIcon';
import { MDRegIcon } from '../../../images/MDRegIcon';
import { PharmaRegIcon } from '../../../images/PharmaRegIcon';
import { CCPIcon } from '../../../images/CCPIcon';

export const HeaderMenu = ({ setIsOpenMenu }) => {
  return (
    <ul className="menu" onClick={(event) => event.stopPropagation()}>
      <li className="menu__item">
        <div className="menu__item-info">
          <div className="menu__item-icon">
            <HomeIcon />
          </div>
          <div className="menu__name">Dashboard</div>
        </div>
        <div className="menu__close" onClick={() => setIsOpenMenu(false)}></div>
      </li>
      <li className="menu__item">
        <div className="menu__item-info">
          <div className="menu__item-icon">
            <ProductIcon />
          </div>
          <div className="menu__name">Product</div>
        </div>
      </li>
      <li className="menu__item">
        <div className="menu__item-info">
          <div className="menu__item-icon"><DocumentsIcon /></div>
          <div className="menu__name">Documents</div>
        </div>
      </li>
      <li className="menu__item">
        <div className="menu__item-info">
          <div className="menu__item-icon"><ApplicationsIcon /></div>
          <div className="menu__name">Applications</div>
        </div>
      </li>
      <li className="menu__item">
        <div className="menu__item-info">
          <div className="menu__item-icon"><TrackingIcon /></div>
          <div className="menu__name">Tracking</div>
        </div>
      </li>
      <li className="menu__item">
        <div className="menu__item-info">
          <div className="menu__item-icon"><DCTIcon /></div>
          <div className="menu__name">DCT</div>
        </div>
      </li>
      <li className="menu__item">
        <div className="menu__item-info">
          <div className="menu__item-icon"><MDRegIcon /></div>
          <div className="menu__name">MD Reg</div>
        </div>
      </li>
      <li className="menu__item">
        <div className="menu__item-info">
          <div className="menu__item-icon"><PharmaRegIcon /></div>
          <div className="menu__name">Pharma Reg</div>
        </div>
      </li>
      <li className="menu__item">
        <div className="menu__item-info">
          <div className="menu__item-icon"><CCPIcon /></div>
          <div className="menu__name">CCP</div>
        </div>
      </li>
    </ul>
  );
};
