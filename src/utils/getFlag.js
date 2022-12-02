export const getFlag = (country) => {
  const path = `${process.env.PUBLIC_URL}/flags/`;

  switch (country) {
    case 'USA':
      return path + 'united-states.svg';
    case 'EU':
      return path + 'european-union.svg';
    case 'AUS':
      return path + 'australia.svg';
    case 'ARG':
      return path + 'argentina.svg';
    case 'BRA':
      return path + 'brazil.svg';
    case 'IND':
      return path + 'india.svg';
    case 'CHN':
      return path + 'china.svg';
    case 'RUS':
      return path + 'russia.svg';
    case 'CHL':
      return path + 'chile.svg';
    case 'BOL':
      return path + 'bolivia.svg';
    case 'SGP':
      return path + 'singapore.svg';
    case 'HKG':
      return path + 'hong-kong.svg';
    case 'MEX':
      return path + 'mexico.svg';
    case 'CAN':
      return path + 'canada.svg';
    case 'SAU':
      return path + 'saudi-arabia.svg';
    case 'MYS':
      return path + 'malaysia.svg';
    case 'VNM':
      return path + 'vietnam.svg';
    case 'PHL':
      return path + 'philippines.svg';
    case 'EGY':
      return path + 'egypt.svg';
    case 'ZAF':
      return path + 'south-africa.svg';
    case 'ESP':
      return path + 'spain.svg';
    case 'JPN':
      return path + 'japan.svg';
    case 'KAZ':
      return path + 'kazakhstan.svg';
    case 'NZL':
      return path + 'new-zealand.svg';
    case 'SDN':
      return path + 'sudan.svg';
    case 'LBY':
      return path + 'libya.svg';
    case 'TUR':
      return path + 'turkey.svg';
    case 'PER':
      return path + 'peru.svg';
    case 'SVK':
      return path + 'slovakia.svg';
    case 'ROU':
      return path + 'romania.svg';
    case 'HRV':
      return path + 'croatia.svg';
    case 'POL':
      return path + 'republic-of-poland.svg';
    case 'DEU':
      return path + 'germany.svg';
    case 'BLR':
      return path + 'belarus.svg';
    case 'UKR':
      return path + 'ukraine.svg';
    case 'FRA':
      return path + 'france.svg';
    case 'SWE':
      return path + 'sweden.svg';
    case 'ITA':
      return path + 'italy.svg';
    case 'LUX':
      return path + 'luxembourg.svg';
    case 'SVN':
      return path + 'slovenia.svg';
    case 'COD':
      return path + 'democratic-republic-of-congo.svg';
    case 'DZA':
      return path + 'algeria.svg';
    case 'NAM':
      return path + 'namibia.svg';
    case 'GRL':
      return path + 'greenland.svg';
    case 'SRB':
      return path + 'serbia.svg';
    case 'AUT':
      return path + 'austria.svg';
    case 'HUN':
      return path + 'hungary.svg';
    case 'NOR':
      return path + 'norway.svg';
    case 'ETH':
      return path + 'ethiopia.svg';
    case 'KEN':
      return path + 'kenya.svg';
    case 'ARE':
      return path + 'united-arab-emirates.svg';
    case 'IRN':
      return path + 'iran.svg';
    case 'FIN':
      return path + 'finland.svg';
    case 'COL':
      return path + 'colombia.svg';
    case 'ZMB':
      return path + 'zambia.svg';
    case 'VAT':
      return path + 'vatican-city.svg';
    case 'THA':
      return path + 'thailand.svg';
    case 'EST':
      return path + 'estonia.svg';
    case 'NGA':
      return path + 'nigeria.svg';
    case 'MNG':
      return path + 'mongolia.svg';
    case 'BWA':
      return path + 'botswana.svg';
    case 'CYM':
      return path + 'cayman-islands.svg';
    default:
      break;
  }
};
