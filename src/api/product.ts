import axios from 'axios';
import {baseUrl} from './config';

const headers = {
  Authorization: 'e0f35aefb4d77e8af7bbffd18a411878',
  StoreID: 7,
  UserAddressID: 201566,
};

export const fetchProducts = async () => {
  try {
    const url = baseUrl + '/users/products';
    const response = await axios.post(url, {}, {headers: headers});
    return response.data;
  } catch (error) {
    // Handle error
    console.error(error);
    throw error;
  }
};

export const fetchProductDetails = async (productId: number) => {
  try {
    const url = baseUrl + `/users/products/${productId}`;
    const response = await axios.get(url, {headers});
    return response.data;
  } catch (error) {
    // Handle error
    console.error(error);
    throw error;
  }
};
