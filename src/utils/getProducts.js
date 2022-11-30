import { data } from '../data/data';
import { getFlag } from './getFlag';

export const getProducts = (item) => {
  const dataFilter = data.products.filter(
    (item) =>
      item.sku
      && item.sku.length > 0
      && item.sku[0].countries
      && item.sku[0].countries.length > 0,
  );

  const countries = [];
  const dataProducts = [];

  for (const i of dataFilter) {
    for (const j of i.sku[0].countries) {
      countries.push(j);
    }
  }

  for (const i of countries) {
    if (!dataProducts.find((item) => item.country === i)) {
      dataProducts.push({
        id: dataProducts.length,
        country: i,
        products: 1,
        icon: getFlag(i),
      });
    } else {
      dataProducts.map((item) => item.country === i && item.products++);
    }
  }

  const dataFilterProducts = dataProducts.filter((item) => item.products > 6);

  const createdAt = data.products.map((item) => item.createdAt.slice(0, 4));
  const updatedAt = data.products.map((item) => item.updatedAt.slice(0, 4));
  const dataProductsCreatedAt = [];
  const dataProductsUpdatedAt = [];

  for (const i of createdAt) {
    if (!dataProductsCreatedAt.find((item) => item.createdAt.slice(0, 4) === i)) {
      dataProductsCreatedAt.push({
        id: dataProductsCreatedAt.length,
        createdAt: i,
        products: 1,
      });
    } else {
      dataProductsCreatedAt.map(
        (item) => item.createdAt.slice(0, 4) === i && item.products++,
      );
    }
  }

  for (const i of updatedAt) {
    if (!dataProductsUpdatedAt.find((item) => item.updatedAt.slice(0, 4) === i)) {
      dataProductsUpdatedAt.push({
        id: dataProductsUpdatedAt.length,
        updatedAt: i,
        products: 1,
      });
    } else {
      dataProductsUpdatedAt.map(
        (item) => item.updatedAt.slice(0, 4) === i && item.products++,
      );
    }
  }

  dataProductsCreatedAt.sort((a, b) => a.createdAt - b.createdAt);
  dataProductsUpdatedAt.sort((a, b) => a.updatedAt - b.updatedAt);
  let newDataProducts = [];

  if (item.y === 'createdAt') {
    newDataProducts = dataProductsCreatedAt;
  } else if (item.y === 'updatedAt') {
    newDataProducts = dataProductsUpdatedAt;
  } else {
    newDataProducts = dataFilterProducts;
  }

  return newDataProducts;
};
