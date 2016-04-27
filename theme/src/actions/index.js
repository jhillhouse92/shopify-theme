import axios from 'axios';

//export const REGISTER = 'REGISTER';
export const ADDED_TO_CART = 'ADDED_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';


export function Register(data) {
  const request = axios({
      method: 'post',
      url: '/account',
      responseType: 'text',
      data: data
  });

  /*return {
    type: FETCH_POSTS,
    payload: request
  };*/
  return request;
}
    
/*
 * This action adds items to the cart of state
 * TO DO: integrate with Shopify cart
*/
export function addToCart(data) {
    
    return {
        type: ADDED_TO_CART,
        payload: data
    };
}
    
/*
 * This action adds items to the cart of state
 * TO DO: integrate with Shopify cart
*/
export function removeFromCart(data) {
    
    return {
        type: REMOVE_FROM_CART,
        payload: data
    };
}
