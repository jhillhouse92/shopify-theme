import { ADDED_TO_CART, REMOVE_FROM_CART } from '../actions/index';

//the initial state is an array of cart items
export default function(state = [], action) {
  switch (action.type) {
          
      case ADDED_TO_CART:
          return [ action.payload, ...state ];

      case REMOVE_FROM_CART: {
          //this removes a line_item object from the cart based on its id
          //it does NOT subtract quanity, if more than 1 exists it removes ALL
          let cart = state.filter( lineItem => lineItem.id !== action.payload.id);
          return cart;
      }
          
      default:
          return state;
  }
}
