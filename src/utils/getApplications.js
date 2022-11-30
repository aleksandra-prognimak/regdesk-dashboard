import { data } from '../data/data';
import { getFlag } from './getFlag';

export const getApplications = (item) => {
  const countries = [];
  const dataApplicationsCountries = [];

  data.applications.map((item) => countries.push(item.country));

  for (const i of countries) {
    if (!dataApplicationsCountries.find((item) => item.country === i)) {
      dataApplicationsCountries.push({
        id: dataApplicationsCountries.length,
        country: i,
        applications: 1,
        icon: getFlag(i),
      });
    } else {
      dataApplicationsCountries.map((item) => item.country === i && item.applications++);
    }
  }

  const dataApplicationsFilter = dataApplicationsCountries.filter(item => item.applications > 3);

  const createdAt = data.applications.map((item) => item.createdAt.slice(0, 4));
  const updatedAt = data.applications.map((item) => item.updatedAt.slice(0, 4));
  const dataApplicationsCreatedAt = [];
  const dataApplicationsUpdatedAt = [];

  for (const i of createdAt) {
    if (!dataApplicationsCreatedAt.find((item) => item.createdAt.slice(0, 4) === i)) {
      dataApplicationsCreatedAt.push({
        id: dataApplicationsCreatedAt.length,
        createdAt: i,
        applications: 1,
      });
    } else {
      dataApplicationsCreatedAt.map(
        (item) => item.createdAt.slice(0, 4) === i && item.applications++,
      );
    }
  }

  for (const i of updatedAt) {
    if (!dataApplicationsUpdatedAt.find((item) => item.updatedAt.slice(0, 4) === i)) {
      dataApplicationsUpdatedAt.push({
        id: dataApplicationsUpdatedAt.length,
        updatedAt: i,
        applications: 1,
      });
    } else {
      dataApplicationsUpdatedAt.map(
        (item) => item.updatedAt.slice(0, 4) === i && item.applications++,
      );
    }
  }

  dataApplicationsCreatedAt.sort((a, b) => a.createdAt - b.createdAt);
  dataApplicationsUpdatedAt.sort((a, b) => a.updatedAt - b.updatedAt);

  let dataApplications = [];

  if (item.y === 'createdAt') {
    dataApplications = dataApplicationsCreatedAt;
  } else if (item.y === 'updatedAt') {
    dataApplications = dataApplicationsUpdatedAt;
  } else {
    dataApplications = dataApplicationsFilter;
  }

  return dataApplications;
};
