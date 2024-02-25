export const formatPrice = (price: string) => {
  const _price = price.split('.');

  if (_price[1] === '0') {
    return _price[0];
  } else {
    return price;
  }
};
