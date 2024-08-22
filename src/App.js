
import React, { useReducer } from 'react';
import './App.css';

// Define the initial state of the cart
const initialState = {
  cart: [],
};

// Define the reducer function
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      const existingItem = state.cart.find(item => item.id === action.payload.id);
      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + action.payload.quantity }
              : item
          ),
        };
      } else {
        return {
          ...state,
          cart: [...state.cart, { ...action.payload }],
        };
      }
    
    case 'UPDATE_ITEM_QUANTITY':
      return {
        ...state,
        cart: state.cart.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };
    
    case 'REMOVE_ITEM':
      return {
        ...state,
        cart: state.cart.filter(item => item.id !== action.payload.id),
      };
    
    default:
      return state;
  }
};

// The main component
const App = () => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  
  // Sample item list to add to the cart with image URLs
  const items = [
    { id: 1, name: 'Apple', price: 0.5, imageUrl: 'https://images.pexels.com/photos/209439/pexels-photo-209439.jpeg?auto=compress&cs=tinysrgb&w=600/200x200' },
    { id: 2, name: 'Banana', price: 0.3, imageUrl: 'https://images.pexels.com/photos/61127/pexels-photo-61127.jpeg?auto=compress&cs=tinysrgb&w=600/200x200' },
    { id: 3, name: 'Carrot', price: 0.2, imageUrl: 'https://images.pexels.com/photos/65174/pexels-photo-65174.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1/200x200' },
    { id: 4, name: 'Tomato', price: 0.4, imageUrl: 'https://images.pexels.com/photos/53588/tomatoes-vegetables-food-frisch-53588.jpeg?auto=compress&cs=tinysrgb&w=600/200x200' },
    { id: 5, name: 'Orange', price: 0.6, imageUrl: 'https://images.pexels.com/photos/51958/oranges-fruit-vitamins-healthy-eating-51958.jpeg?auto=compress&cs=tinysrgb&w=600/100x100' },
    { id: 6, name: 'Potato', price: 0.25, imageUrl: 'https://images.pexels.com/photos/144248/potatoes-vegetables-erdfrucht-bio-144248.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1/200x200' },
    { id: 7, name: 'Strawberry', price: 0.75, imageUrl: 'https://images.pexels.com/photos/36736/fruits-strawberries-fruit-red.jpg?auto=compress&cs=tinysrgb&w=600/200x200' },
    { id: 8, name: 'Cucumber', price: 0.35, imageUrl: 'https://images.pexels.com/photos/128420/pexels-photo-128420.jpeg?auto=compress&cs=tinysrgb&w=600/200x200' },
    { id: 9, name: 'Broccoli', price: 0.8, imageUrl: 'https://images.pexels.com/photos/47347/broccoli-vegetable-food-healthy-47347.jpeg?auto=compress&cs=tinysrgb&w=600/200x200' },
  ];

  // Add item to the cart
  const addItemToCart = (item, quantity) => {
    dispatch({
      type: 'ADD_ITEM',
      payload: { ...item, quantity },
    });
  };

  // Update item quantity in the cart
  const updateItemQuantity = (id, quantity) => {
    dispatch({
      type: 'UPDATE_ITEM_QUANTITY',
      payload: { id, quantity },
    });
  };

  // Remove item from the cart
  const removeItemFromCart = id => {
    dispatch({
      type: 'REMOVE_ITEM',
      payload: { id },
    });
  };

  return (
    <div className="App">
      <div className="grid">
        {items.map(item => (
          <div key={item.id} className="item">
            <img src={item.imageUrl} alt={item.name} />
            <span>{item.name} - ${item.price.toFixed(2)}</span>
            <div className="actions">
              <button onClick={() => addItemToCart(item, 1)}>Add to Cart</button>
            </div>
          </div>
        ))}
      </div>

      <div className="cart">
        <h2>Shopping Cart</h2>
        <ul>
          {state.cart.map(item => (
            <li key={item.id}>
              <img src={item.imageUrl} alt={item.name} />
              <span>{item.name} - ${item.price.toFixed(2)} x {item.quantity}</span>
              <div className="actions">
                <button onClick={() => updateItemQuantity(item.id, item.quantity + 1)}>+</button>
                <button onClick={() => updateItemQuantity(item.id, item.quantity - 1)} disabled={item.quantity === 1}>-</button>
                <button onClick={() => removeItemFromCart(item.id)}>Remove</button>
              </div>
            </li>
          ))}
        </ul>
        <h3>Total: ${state.cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}</h3>
      </div>
    </div>
  );
};

export default App;
