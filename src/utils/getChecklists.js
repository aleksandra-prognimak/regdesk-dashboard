import { data } from '../data/data';
import { getFlag } from './getFlag';

export const getChecklists = (item) => {
  const countries = [];
  const dataChecklistsCountries = [];

  data.checklists.map((item) => countries.push(item.countryId));

  for (const i of countries) {
    if (!dataChecklistsCountries.find((item) => item.country === i)) {
      dataChecklistsCountries.push({
        id: dataChecklistsCountries.length,
        country: i,
        checklists: 1,
        icon: getFlag(i),
      });
    } else {
      dataChecklistsCountries.map(
        (item) => item.country === i && item.checklists++,
      );
    }
  }

  const dataChecklistsFilter = dataChecklistsCountries.filter(
    (item) => item.checklists > 10,
  );

  const createdAt = data.checklists.map((item) => item.createdAt.slice(0, 4));
  const updatedAt = data.checklists.map((item) => item.updatedAt.slice(0, 4));
  const dataChecklistsCreatedAt = [];
  const dataChecklistsUpdatedAt = [];

  for (const i of createdAt) {
    if (
      !dataChecklistsCreatedAt.find((item) => item.createdAt.slice(0, 4) === i)
    ) {
      dataChecklistsCreatedAt.push({
        id: dataChecklistsCreatedAt.length,
        createdAt: i,
        checklists: 1,
      });
    } else {
      dataChecklistsCreatedAt.map(
        (item) => item.createdAt.slice(0, 4) === i && item.checklists++,
      );
    }
  }

  for (const i of updatedAt) {
    if (
      !dataChecklistsUpdatedAt.find((item) => item.updatedAt.slice(0, 4) === i)
    ) {
      dataChecklistsUpdatedAt.push({
        id: dataChecklistsUpdatedAt.length,
        updatedAt: i,
        checklists: 1,
      });
    } else {
      dataChecklistsUpdatedAt.map(
        (item) => item.updatedAt.slice(0, 4) === i && item.checklists++,
      );
    }
  }

  dataChecklistsCreatedAt.sort((a, b) => a.createdAt - b.createdAt);
  dataChecklistsUpdatedAt.sort((a, b) => a.updatedAt - b.updatedAt);

  let dataChecklists = [];

  if (item.y === 'createdAt') {
    dataChecklists = dataChecklistsCreatedAt;
  } else if (item.y === 'updatedAt') {
    dataChecklists = dataChecklistsUpdatedAt;
  } else {
    dataChecklists = dataChecklistsFilter;
  }

  return dataChecklists;
};
