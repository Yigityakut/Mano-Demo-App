import {makeAutoObservable} from 'mobx';
import {Product} from '../types';
import {fetchProductDetails, fetchProducts} from '../api/product';
import Toast from 'react-native-toast-message';

class ProductStore {
  products: Product[] = [];
  selectedProduct: Product | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  setProducts(products: Product[]) {
    this.products = products;
  }

  setSelectedProduct(product: Product) {
    this.selectedProduct = product;
  }

  fetchProducts = async (): Promise<Product[]> => {
    const data = await fetchProducts();
    if (data.success) {
      this.setProducts(data.data.items);
      return data.data.items;
    } else {
      Toast.show({
        type: 'error',
        text1: data.message,
      });
    }
    return [];
  };

  fetchProductDetails = async (productId: number) => {
    const data = await fetchProductDetails(productId);
    if (data.success) {
      this.setSelectedProduct(data.data);
    } else {
      Toast.show({
        type: 'error',
        text1: data.message,
      });
    }
  };
}

const store = new ProductStore();
export default store;
