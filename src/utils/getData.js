import { getApplications } from './getApplications';
import { getChecklists } from './getChecklists';
import { getProducts } from './getProducts';
import { getTrackings } from './getTrackings';

export const getData = (item) => {
  switch (item.x) {
    case 'products':
      return getProducts(item);
    case 'checklists':
      return getChecklists(item);
    case 'trackings':
      return getTrackings(item);
    case 'applications':
      return getApplications(item);
    default:
      break;
  }
};
