import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

// Provedor de Rotas do react-router-dom
import { RouterProvider } from 'react-router-dom';

// Gerenciador de rotas
import MyRouter from './MyRouter.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
     {/* Faz o provedor utilizar as rotas que voce
    definiu no MyRouter */}
    <RouterProvider router={MyRouter}/>
  </StrictMode>,
)
