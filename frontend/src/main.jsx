import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { CartProvider } from './Context/CartContext.jsx'; 
import { AuthProvider } from './Context/Authcontext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <AuthProvider>
    <CartProvider>
      <App />
    </CartProvider>
    </AuthProvider>
  </React.StrictMode>
);
