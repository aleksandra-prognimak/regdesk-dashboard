import React from 'react';

const ChartComp = ({ item }) => (
  <>
    <item.Component item={item} />
  </>
);

export const Chart = React.memo(ChartComp);
