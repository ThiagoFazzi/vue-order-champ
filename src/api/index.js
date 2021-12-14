import data from './data.json';

// eslint-disable-next-line import/prefer-default-export
export const Product = (() => {
  function initiateProduct() {
    const { data: { storefrontBySlug: product } } = data;
    return product;
  }

  return {
    getProduct() {
      return initiateProduct();
    },
  };
})();
