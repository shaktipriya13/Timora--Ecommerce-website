import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'//Allows client-side routing in React (without page refreshes).

//These are React Context Providers, which let you share state (like login status, search keyword, or cart data) across all components.
import { AuthProvider } from './context/auth.jsx'
import { SearchProvider } from './context/search.jsx'
import { CartProvider } from './context/cart.jsx'
import "antd/dist/reset.css";

// export const serverUrl = "https://timora-backend-un9e.onrender.com";
export const serverUrl = "https://timora-backend-un9e.onrender.com";

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <SearchProvider>
      <CartProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </CartProvider>
    </SearchProvider>
  </AuthProvider>
)
