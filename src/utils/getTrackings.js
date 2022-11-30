import { data } from '../data/data';
import { getFlag } from './getFlag';

export const getTrackings = (item) => {
  const countries = [];
  const dataTrackingCountries = [];

  data.trackings.map((item) => countries.push(item.countryId));

  for (const i of countries) {
    if (!dataTrackingCountries.find((item) => item.country === i)) {
      dataTrackingCountries.push({
        id: dataTrackingCountries.length,
        country: i,
        trackings: 1,
        icon: getFlag(i),
      });
    } else {
      dataTrackingCountries.map(
        (item) => item.country === i && item.trackings++,
      );
    }
  }

  const dataTrackingFilter = dataTrackingCountries.filter(
    (item) => item.trackings > 3,
  );

  const createdAt = data.trackings.map((item) => item.createdAt.slice(0, 4));
  const updatedAt = data.trackings.map((item) => item.updatedAt.slice(0, 4));
  const dataTrackingCreatedAt = [];
  const dataTrackingUpdatedAt = [];

  for (const i of createdAt) {
    if (
      !dataTrackingCreatedAt.find((item) => item.createdAt.slice(0, 4) === i)
    ) {
      dataTrackingCreatedAt.push({
        id: dataTrackingCreatedAt.length,
        createdAt: i,
        trackings: 1,
      });
    } else {
      dataTrackingCreatedAt.map(
        (item) => item.createdAt.slice(0, 4) === i && item.trackings++,
      );
    }
  }

  for (const i of updatedAt) {
    if (
      !dataTrackingUpdatedAt.find((item) => item.updatedAt.slice(0, 4) === i)
    ) {
      dataTrackingUpdatedAt.push({
        id: dataTrackingUpdatedAt.length,
        updatedAt: i,
        trackings: 1,
      });
    } else {
      dataTrackingUpdatedAt.map(
        (item) => item.updatedAt.slice(0, 4) === i && item.trackings++,
      );
    }
  }

  dataTrackingCreatedAt.sort((a, b) => a.createdAt - b.createdAt);
  dataTrackingUpdatedAt.sort((a, b) => a.updatedAt - b.updatedAt);

  let dataTracking = [];

  if (item.y === 'createdAt') {
    dataTracking = dataTrackingCreatedAt;
  } else if (item.y === 'updatedAt') {
    dataTracking = dataTrackingUpdatedAt;
  } else {
    dataTracking = dataTrackingFilter;
  }

  return dataTracking;
};
